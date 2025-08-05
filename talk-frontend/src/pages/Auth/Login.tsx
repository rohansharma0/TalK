import {
    Box,
    Button,
    FormControl,
    TextField,
    Typography,
    Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { authService } from "../../services/authServices";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
    minHeight: "100%",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(4),
    },
    "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        zIndex: -1,
        inset: 0,
        backgroundImage:
            "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
        backgroundRepeat: "no-repeat",
        ...theme.applyStyles("dark", {
            backgroundImage:
                "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
        }),
    },
}));

type FormValues = {
    username: string;
    password: string;
};

export default function Login() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data: FormValues) => {
        try {
            const res = await authService.login(data.username, data.password);
            if (res && res.token) {
                login(res);
                navigate("/");
            }
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return (
        <SignInContainer
            direction="column"
            justifyContent="center"
            alignItems="center">
            <Box>
                <Typography
                    component="h1"
                    align="center"
                    variant="h4"
                    sx={{
                        fontWeight: "600",
                    }}>
                    Talk
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        gap: 2,
                    }}>
                    <FormControl>
                        <Controller
                            name="username"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Username is required." }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="username"
                                    fullWidth
                                    label="Username"
                                    variant="outlined"
                                    error={!!errors.username}
                                    helperText={errors.username?.message}
                                />
                            )}
                        />
                    </FormControl>

                    <FormControl>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters long",
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="password"
                                    type="password"
                                    label="Password"
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            )}
                        />
                    </FormControl>

                    <Button type="submit" fullWidth variant="contained">
                        Login
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => navigate("/auth/register")}>
                        Register
                    </Button>
                </Box>
            </Box>
        </SignInContainer>
    );
}

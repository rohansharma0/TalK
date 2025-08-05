import {
    Avatar,
    Box,
    Button,
    Grid,
    IconButton,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import NavBar from "./NavBar";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

type ProfileFormValues = {
    firstname: string;
    lastname: string;
    username: string;
};

const Profile = () => {
    const { user } = useAuth();
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormValues>({
        defaultValues: {
            firstname: user?.firstname ?? "",
            lastname: user?.lastname ?? "",
            username: user?.username ?? "",
        },
    });

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatarUrl(imageUrl);
        }
    };

    const onSubmit = (data: ProfileFormValues) => {
        console.log("Form Submitted:", data);
    };
    return (
        <React.Fragment>
            <Grid
                size={7}
                sx={{
                    height: "100vh",
                    outline: "1px solid #313131",
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                }}>
                <NavBar />
                <Toolbar
                    sx={{
                        width: "100%",
                        height: "100%",
                    }}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        display="flex"
                        flexDirection="column"
                        height="100%"
                        width="100%"
                        justifyContent="space-around"
                        alignItems="center">
                        <Box position="relative">
                            <Avatar
                                src={user?.avatar}
                                sx={{
                                    width: 200,
                                    height: 200,
                                    fontSize: "2rem",
                                    cursor: "pointer",
                                }}
                                onClick={handleAvatarClick}></Avatar>
                            {/* <IconButton
                            onClick={handleAvatarClick}
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                backgroundColor: "white",
                            }}>
                            <EditIcon fontSize="small" />
                        </IconButton> */}
                            {/* <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageChange}
                        /> */}
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="column"
                            gap="3rem"
                            width="100%">
                            <TextField
                                label="First Name"
                                fullWidth
                                {...register("firstname", {
                                    required: "First name is required",
                                })}
                                error={!!errors.firstname}
                                helperText={errors.firstname?.message}
                            />
                            <TextField
                                label="Last Name"
                                fullWidth
                                {...register("lastname", {
                                    required: "Last name is required",
                                })}
                                error={!!errors.lastname}
                                helperText={errors.lastname?.message}
                            />
                            <TextField
                                label="Username"
                                fullWidth
                                disabled
                                {...register("username", {
                                    required: "Username is required",
                                })}
                                error={!!errors.username}
                                helperText={errors.username?.message}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="success">
                                Update
                            </Button>
                        </Box>
                    </Box>
                </Toolbar>
            </Grid>
            <Grid size={17} height="100vh">
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    color="#353535ff">
                    <QuestionAnswerOutlinedIcon
                        sx={{
                            fontSize: "10rem",
                            margin: "1rem",
                        }}
                    />
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="end">
                        <LockOutlinedIcon
                            sx={{
                                fontSize: "1.5rem",
                                marginRight: "5px",
                            }}
                        />
                        <Typography fontSize="0.9rem" fontWeight="600">
                            Your messages are end to end encrypted
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        </React.Fragment>
    );
};

export default Profile;

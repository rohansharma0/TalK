import {
    AppBar,
    Divider,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useState, type MouseEvent } from "react";

const NavBar = ({ isActionEnable }: { isActionEnable: boolean }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        handleClose();
        logout();
        navigate("/");
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="static"
            sx={{
                bgcolor: "#161717",
                color: "#fff",
                boxShadow: "none",
            }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    color="#17ff4b"
                    fontWeight="900"
                    component="div"
                    sx={{ flexGrow: 1, alignSelf: "flex-center" }}>
                    TalK
                </Typography>
                {isActionEnable && (
                    <>
                        <Tooltip title="More">
                            <IconButton
                                size="large"
                                aria-label="chats-menu-button"
                                edge="end"
                                color="inherit"
                                onClick={handleClick}>
                                <MoreVertIcon />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="chats-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            slotProps={{
                                list: {
                                    "aria-labelledby": "chats-menu-items",
                                },
                            }}>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <GroupAddOutlinedIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>New group</ListItemText>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <LogoutOutlinedIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Log out</ListItemText>
                            </MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;

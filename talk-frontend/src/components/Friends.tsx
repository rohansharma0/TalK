import { Box, ButtonBase, Grid, Typography } from "@mui/material";
import React, { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userServices";
import Groups3OutlinedIcon from "@mui/icons-material/Groups3Outlined";
import NavBar from "./NavBar";
import { useDebounce } from "../hooks/useDebounce";
import type { IUser } from "../types/User";
import SearchBar from "./SearchBar";
import User from "./User";

const Friends = () => {
    const { user } = useAuth();
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);

    const { data: users } = useQuery<IUser[]>({
        queryKey: ["users", debouncedSearch],
        queryFn: () => userService.searchUsers(debouncedSearch),
        enabled: !!debouncedSearch,
    });

    const { data: friends } = useQuery<IUser[]>({
        queryKey: ["friends", debouncedSearch],
        queryFn: () => userService.getFriends(),
    });

    return (
        <React.Fragment>
            <Grid
                size={7}
                sx={{
                    height: "100vh",
                    outline: "1px solid #313131",
                    zIndex: 2,
                }}>
                <NavBar isActionEnable={false} />
                <SearchBar search={search} setSearch={setSearch} />
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    overflow="auto"
                    gap="0.5rem"
                    py="0.5rem">
                    {debouncedSearch ? (
                        <>
                            {users?.map((user: IUser) => {
                                return (
                                    <ButtonBase
                                        key={user._id}
                                        sx={{
                                            width: "100%",
                                        }}>
                                        <User userData={user} />
                                    </ButtonBase>
                                );
                            })}
                        </>
                    ) : (
                        <>
                            {friends?.map((user: IUser) => {
                                return (
                                    <ButtonBase
                                        key={user._id}
                                        sx={{
                                            width: "100%",
                                        }}>
                                        <User userData={user} isFriend={true} />
                                    </ButtonBase>
                                );
                            })}
                        </>
                    )}
                </Box>
            </Grid>
            <Grid size={17} height="100vh">
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    color="#353535ff">
                    <Groups3OutlinedIcon
                        sx={{
                            fontSize: "10rem",
                        }}
                    />
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="end">
                        <Typography fontSize="0.9rem" fontWeight="600">
                            Chat with all your friends
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        </React.Fragment>
    );
};

export default Friends;

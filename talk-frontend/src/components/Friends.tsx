import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userServices";
import Groups3OutlinedIcon from "@mui/icons-material/Groups3Outlined";
import NavBar from "./NavBar";
import { useDebounce } from "../hooks/useDebounce";
import type { IUser } from "../types/User";
import SearchBar from "./SearchBar";
import { friendService } from "../services/friendServices";
import Friend from "./Friend";
import SearchedUser from "./SearchedUser";

const Friends = () => {
    const { user } = useAuth();
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);
    const [friendList, setFriendList] = useState<IUser[]>([]);

    const { data: users } = useQuery<IUser[]>({
        queryKey: ["users", debouncedSearch],
        queryFn: () => userService.searchUsers(debouncedSearch),
        enabled: !!debouncedSearch,
    });

    const { data: friends } = useQuery<IUser[]>({
        queryKey: ["friends", debouncedSearch],
        queryFn: () => friendService.getFriends(),
    });

    useEffect(() => {
        if (friends) {
            setFriendList(friends);
        }
    }, [friends]);

    const handleRemove = async (userId: string) => {
        await friendService.removeFriend(userId);
        setFriendList((prev) => prev.filter((r) => r._id !== userId));
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
                <SearchBar search={search} setSearch={setSearch} />
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    overflow="auto"
                    gap="0.5rem"
                    py="0.5rem"
                    sx={{
                        flexGrow: "1",
                        overflowY: "auto",
                    }}>
                    {debouncedSearch ? (
                        <>
                            {users?.map((u: IUser) => {
                                if (u._id !== user?._id) {
                                    return (
                                        <Box
                                            key={u._id}
                                            sx={{
                                                width: "100%",
                                            }}>
                                            <SearchedUser user={u} />
                                        </Box>
                                    );
                                }
                            })}
                        </>
                    ) : (
                        <>
                            {friendList?.map((user: IUser) => {
                                return (
                                    <Box
                                        key={user._id}
                                        sx={{
                                            width: "100%",
                                        }}>
                                        <Friend
                                            friend={user}
                                            onRemove={handleRemove}
                                        />
                                    </Box>
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

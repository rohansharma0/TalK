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
import { requestService } from "../services/requestServices";
import type { IRequest } from "../types/Request";
import Request from "./Request";

type SearchUser = {
    user: IUser;
    type: "SEND" | "RECEIVE" | "FRIEND" | "NONE";
};

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

    const { data: requests } = useQuery<IRequest[]>({
        queryKey: ["requests"],
        queryFn: requestService.getRequests,
    });

    const [userList, setUserList] = useState<SearchUser[]>([]);

    useEffect(() => {
        if (!users) return;
        const searchUserList: SearchUser[] = users
            .filter((u) => u._id !== user?._id)
            .map((u) => {
                const isFriend = friends?.some((f) => f._id === u._id);
                const sentRequest = requests?.some(
                    (r) => r.user._id === u._id && r.status == "SEND"
                );
                const receivedRequest = requests?.some(
                    (r) => r.user._id === u._id && r.status == "RECEIVE"
                );
                let type: SearchUser["type"] = "NONE";
                if (isFriend) type = "FRIEND";
                else if (sentRequest) type = "SEND";
                else if (receivedRequest) type = "RECEIVE";
                return {
                    user: u,
                    type,
                };
            });
        setUserList(searchUserList);
    }, [users, friends, requests, user?._id]);

    useEffect(() => {
        if (friends) {
            setFriendList(friends);
        }
    }, [friends]);

    const handleRemove = async (userId: string) => {
        await friendService.removeFriend(userId);
        setFriendList((prev) => prev.filter((r) => r._id !== userId));
    };

    const handleFriendRemove = async (userId: string) => {
        await friendService.removeFriend(userId);
        setUserList((prev) =>
            prev.map((u) =>
                u.user._id === userId ? { ...u, type: "NONE" } : u
            )
        );
    };

    const handleRequestCancel = async (userId: string) => {
        try {
            await requestService.cancelRequest(userId);
            setUserList((prev) =>
                prev.map((u) =>
                    u.user._id === userId ? { ...u, type: "NONE" } : u
                )
            );
        } catch (err) {
            console.log(err);
        }
    };
    const handleRequestAccept = async (userId: string) => {
        try {
            await friendService.makeFriend(userId);
            setUserList((prev) =>
                prev.map((u) =>
                    u.user._id === userId ? { ...u, type: "FRIEND" } : u
                )
            );
        } catch (err) {
            console.log(err);
        }
    };

    const handleRequestSend = async (userId: string) => {
        try {
            await requestService.sendRequest(userId);
            setUserList((prev) =>
                prev.map((u) =>
                    u.user._id === userId ? { ...u, type: "SEND" } : u
                )
            );
        } catch (err) {
            console.error(err);
        }
    };

    const getAction = (u: SearchUser) => {
        switch (u.type) {
            case "SEND":
                return (
                    <Request
                        user={u.user}
                        status={u.type}
                        onAccept={handleRequestAccept}
                        onCancel={handleRequestCancel}
                    />
                );
            case "RECEIVE":
                return (
                    <Request
                        user={u.user}
                        status={u.type}
                        onAccept={handleRequestAccept}
                        onCancel={handleRequestCancel}
                    />
                );
            case "FRIEND":
                return <Friend friend={u.user} onRemove={handleFriendRemove} />;
            default:
                return (
                    <SearchedUser user={u.user} onRequest={handleRequestSend} />
                );
        }
    };

    return (
        <React.Fragment>
            <Grid
                size={{ xs: 11, md: 9, lg: 7 }}
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
                            {userList?.map((u: SearchUser) => {
                                return (
                                    <Box
                                        key={u.user._id}
                                        sx={{
                                            width: "100%",
                                        }}>
                                        {getAction(u)}
                                    </Box>
                                );
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
            <Grid size={{ xs: 13, md: 15, lg: 17 }} height="100vh">
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

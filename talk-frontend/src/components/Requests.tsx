import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import { useDebounce } from "../hooks/useDebounce";
import { requestService } from "../services/requestServices";
import type { IRequest } from "../types/Request";
import Request from "./Request";
import { friendService } from "../services/friendServices";

const Requests = () => {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);
    const [filteredRequests, setFilteredRequests] = useState<IRequest[]>([]);

    const { data: requests } = useQuery<IRequest[]>({
        queryKey: ["requests"],
        queryFn: requestService.getRequests,
    });

    const [requestList, setRequestList] = useState<IRequest[]>([]);

    useEffect(() => {
        if (requests) {
            setRequestList(requests.filter((req) => req.status === "RECEIVE"));
        }
    }, [requests]);

    useEffect(() => {
        const filtered =
            requestList?.filter((request) =>
                request?.user?.username
                    .toLowerCase()
                    .startsWith(debouncedSearch.toLowerCase())
            ) ?? [];
        setFilteredRequests(filtered);
    }, [debouncedSearch, requestList]);

    const handleCancel = async (userId: string) => {
        try {
            await requestService.cancelRequest(userId);
            setRequestList((prev) => prev.filter((r) => r.user._id !== userId));
        } catch (err) {
            console.log(err);
        }
    };
    const handleAccept = async (userId: string) => {
        try {
            await friendService.makeFriend(userId);
            setRequestList((prev) => prev.filter((r) => r.user._id !== userId));
        } catch (err) {
            console.log(err);
        }
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
                    {filteredRequests?.map((request: IRequest) => {
                        return (
                            <Box
                                key={request.user._id}
                                sx={{
                                    width: "100%",
                                }}>
                                <Request
                                    user={request.user}
                                    status={request.status}
                                    onCancel={handleCancel}
                                    onAccept={handleAccept}
                                />
                            </Box>
                        );
                    })}
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
                    <PersonAddAlt1OutlinedIcon
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
                            Send request to your friend for start a conversation
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        </React.Fragment>
    );
};

export default Requests;

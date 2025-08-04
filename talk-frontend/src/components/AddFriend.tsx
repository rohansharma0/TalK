import { Box, ButtonBase, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userServices";

import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import NavBar from "./NavBar";
import type { IUser } from "../types/User";
import SearchBar from "./SearchBar";
import User from "./User";
import { useDebounce } from "../hooks/useDebounce";

const AddFriend = () => {
    const { user } = useAuth();
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);
    const [filteredRequests, setFilteredRequests] = useState<IUser[]>([]);

    const { data: requests } = useQuery<IUser[]>({
        queryKey: ["requests"],
        queryFn: userService.getRequests,
    });

    useEffect(() => {
        const filtered =
            requests?.filter((user) =>
                user.username
                    .toLowerCase()
                    .includes(debouncedSearch.toLowerCase())
            ) ?? [];
        setFilteredRequests(filtered);
    }, [debouncedSearch, requests]);

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
                    {filteredRequests?.map((requests) => {
                        return (
                            <ButtonBase
                                key={requests._id}
                                sx={{
                                    width: "100%",
                                }}>
                                <User userData={requests} />
                            </ButtonBase>
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

export default AddFriend;

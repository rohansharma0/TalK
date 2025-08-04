import { Box, ButtonBase, Grid, Typography } from "@mui/material";
import React, { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userServices";
import type { IConversation } from "../types/Conversation";
import Conversation from "./Conversation";
import PersonalChat from "./PersonalChat";
import GroupChat from "./GroupChat";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";

const Chats = () => {
    const { user } = useAuth();

    const { data: conversations } = useQuery<IConversation[]>({
        queryKey: ["conversations"],
        queryFn: userService.getConversations,
    });

    const [selectedConversationIndex, setSelectedConversationIndex] = useState<
        number | null
    >(null);

    const selectedConversation: IConversation | null | undefined =
        selectedConversationIndex !== null
            ? conversations?.[selectedConversationIndex]
            : null;

    const [search, setSearch] = useState("");

    return (
        <React.Fragment>
            <Grid
                size={7}
                sx={{
                    height: "100vh",
                    outline: "1px solid #313131",
                    zIndex: 2,
                }}>
                <NavBar isActionEnable={true} />
                <SearchBar search={search} setSearch={setSearch} />
                {conversations?.map((conversation, index) => {
                    return (
                        <ButtonBase
                            key={conversation._id}
                            sx={{
                                width: "100%",
                                justifyContent: "flex-start",
                                padding: "1rem",
                            }}
                            onClick={() => setSelectedConversationIndex(index)}>
                            <Conversation
                                data={conversation}
                                userId={user?._id}
                            />
                        </ButtonBase>
                    );
                })}
            </Grid>
            <Grid size={17} height="100vh">
                {selectedConversation ? (
                    <>
                        {selectedConversation.isGroup ? (
                            <GroupChat />
                        ) : (
                            <PersonalChat data={selectedConversation} />
                        )}
                    </>
                ) : (
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
                )}
            </Grid>
        </React.Fragment>
    );
};

export default Chats;

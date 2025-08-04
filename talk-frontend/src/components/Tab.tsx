import { Grid } from "@mui/material";
import { userTab } from "../context/TabContext";
import Chats from "./Chats";
import Profile from "./Profile";
import Settings from "./Settings";
import type { ReactNode } from "react";
import AddFriend from "./AddFriend";
import Friends from "./Friends";

const Tab = () => {
    const { selectedTab } = userTab();

    const tabs = {
        chats: <Chats />,
        "add-friend": <AddFriend />,
        friends: <Friends />,
        settings: <Settings />,
        profile: <Profile />,
    };

    const TabContainer = ({ children }: { children: ReactNode }) => {
        return (
            <Grid container columns={24}>
                {children}
            </Grid>
        );
    };
    return <TabContainer>{tabs[selectedTab]}</TabContainer>;
};

export default Tab;

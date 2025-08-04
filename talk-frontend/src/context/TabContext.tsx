import { createContext, useContext, useState, type ReactNode } from "react";

type Tab = "chats" | "add-friend" | "friends" | "profile" | "settings";

interface ITabContext {
    selectedTab: Tab;
    setSelectedTab: (tab: Tab) => void;
}

const TabContext = createContext<ITabContext | undefined>(undefined);

export const TabProvider = ({ children }: { children: ReactNode }) => {
    const [selectedTab, setSelectedTab] = useState<Tab>("chats");

    return (
        <TabContext.Provider value={{ selectedTab, setSelectedTab }}>
            {children}
        </TabContext.Provider>
    );
};

export const userTab = () => {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error("userTab must be used within TabProvider");
    }
    return context;
};

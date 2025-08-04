import { AppBar, InputBase, Toolbar } from "@mui/material";

const SearchBar = ({
    search,
    setSearch,
}: {
    search: string;
    setSearch: any;
}) => {
    return (
        <AppBar
            position="static"
            sx={{
                bgcolor: "#161717",
                color: "#fff",
                boxShadow: "none",
                zIndex: 1,
            }}>
            <Toolbar sx={{ display: "flex", width: "100%" }}>
                <InputBase
                    placeholder="Search.."
                    fullWidth
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    sx={{
                        color: "#fff",
                        caretColor: "#17ff4b",
                        backgroundColor: "#1d1f1f",
                        borderRadius: "26px",
                        padding: "0.5rem",
                    }}
                    inputProps={{ "aria-label": "Search.." }}
                />
            </Toolbar>
        </AppBar>
    );
};

export default SearchBar;

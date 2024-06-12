import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

const Header = ({ darkMode, handleThemeChange }: Props) => {
    return (
        <AppBar position="sticky" sx={{ mb: 4 }}>
            <Toolbar>
                <Typography variant="h6">HaiKT Store</Typography>
                <Switch checked={darkMode} onChange={handleThemeChange} />
            </Toolbar>
        </AppBar>
    );
};

export default Header;

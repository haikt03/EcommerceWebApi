import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const ServerError = () => {
    const { state } = useLocation();

    return (
        <Container component={Paper}>
            {state?.error ? (
                <>
                    <Typography gutterBottom variant="h3" color="secondary">
                        {state.error.title}
                    </Typography>
                    <Divider />
                    <Typography variant="body1">
                        {state.error.detail || "Internal server error."}
                    </Typography>
                </>
            ) : (
                <Typography variant="h5" gutterBottom>
                    Server error
                </Typography>
            )}
            <Button component={Link} to="/catalog" fullWidth>
                Go back to the store
            </Button>
        </Container>
    );
};

export default ServerError;

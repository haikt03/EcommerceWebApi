import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <Container component={Paper} sx={{ height: 400 }}>
            <Typography gutterBottom variant="h3">
                Oops - we could not find what you are looking for.
            </Typography>
            <Divider />
            <Button component={Link} to="/catalog" fullWidth>
                Go back to the store
            </Button>
        </Container>
    );
};

export default NotFound;

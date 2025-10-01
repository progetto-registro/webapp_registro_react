import { Button, Stack, Typography, Box } from "@mui/material";
import { Link } from "react-router";

export function StartingPage() {

    return (
        <>
        <Typography variant="h3" textAlign="center" fontWeight="bold">
            Accedi a Registrum</Typography>

        <Box textAlign="center" mt={4} >
            <Stack direction="row" spacing={2} justifyContent="center">
                <Button variant="contained" fullWidth component={Link} to="/login">Login</Button>
                <Button variant="contained" fullWidth component={Link} to="/signup">Registrati</Button>
            </Stack>
        </Box>
        </>
    );
}

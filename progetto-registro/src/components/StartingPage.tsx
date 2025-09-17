import { Button, Stack } from "@mui/material";
import { Link } from "react-router";

export function StartingPage() {

    return (
        <Stack direction="row" spacing={2}>
            <Button variant="contained" component={Link} to="/login">Login</Button>
            <Button variant="contained" component={Link} to="/signup">Registrati</Button>
        </Stack>
    );
}

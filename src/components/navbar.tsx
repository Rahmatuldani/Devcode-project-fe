import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

function NavbarComponent() {
    return (
        <AppBar data-cy="header-background" position="static">
            <Container maxWidth="md">
                <Toolbar>
                    <Typography variant="h6" component={"div"} sx={{flexGrow: 1, fontWeight: 700}}>
                        <NavLink data-cy="header-title" to={"/"} style={{ color: 'inherit', textDecoration: 'none' }} end>
                            TO DO LIST APP
                        </NavLink>
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavbarComponent;
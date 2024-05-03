import React from "react";
import NavbarComponent from "./components/navbar";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <NavbarComponent/>
      <React.Suspense fallback={<>Loading ...</>}>
        <Container maxWidth={'md'} sx={{ paddingTop: '3rem' }}>
          <Outlet/>
        </Container>
      </React.Suspense>
    </>
  );
}

export default App;
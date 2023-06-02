import { Box } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout(props) {
  return (
    <Box pt="147px" overflow="auto">
      <Header />
      <Box minH="100vh">{props.children}</Box>
      <Footer />
    </Box>
  );
}

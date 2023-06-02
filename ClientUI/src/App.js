import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Box, Spinner, useToast } from "@chakra-ui/react";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createContext, useState } from "react";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Status from "./pages/Status";
import Admin from "./pages/Admin";
import Analytic from "./pages/Analytic";
import User from "./pages/User";
import Order from "./pages/Order";
import Product from "./pages/Product";
import Search from "./pages/Search";
export const GlobalState = createContext();

function App() {
  const [loading, setLoading] = useState(false);
  const onChangeLoading = (value) => {
    setLoading(value);
  };
  const toast = useToast();
  const handleShowToast = (title, description, status = "succes") => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 3000,
      isClosable: true,
      position: "top",
      variant: "subtle",
    });
  };
  return (
    <GlobalState.Provider value={{ loading, onChangeLoading, handleShowToast }}>
      <Box
        className="App"
        bgImage="url('/images/bg-login.jpg')"
        bgSize="cover"
        minW="100%"
        minH="100vh"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/search/:text" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/status" element={<Status />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/analytic" element={<Analytic />} />
          <Route path="/admin/user" element={<User />} />
          <Route path="/admin/order" element={<Order />} />
          <Route path="/admin/product" element={<Product />} />
        </Routes>
      </Box>
      {loading && (
        <Box
          zIndex="1000"
          w="100vw"
          h="100vh"
          position="fixed"
          top="0"
          bg="blackAlpha.500"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner
            w="200px"
            h="200px"
            thickness="20px"
            color="var(--chakra-colors-purple-500)"
            speed="0.65s"
            emptyColor="gray.200"
          />
        </Box>
      )}
    </GlobalState.Provider>
  );
}
export default App;

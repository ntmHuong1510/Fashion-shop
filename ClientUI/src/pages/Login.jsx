import { Box, Button, HStack, Link, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { CustomInput } from "../components/atoms/CustomInput";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { GlobalState } from "../App";
import loginService from "../service/auth.service";
import Cookies from "js-cookie";
import { IoArrowBackCircle } from "react-icons/io5";

export default function Login() {
  const [isHide, setIsHide] = useState(false);
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { handleShowToast } = useContext(GlobalState);

  const onToggle = () => {
    setIsHide(!isHide);
  };

  const handleChange = (key) => (value) => {
    const data = { ...login };
    data[key] = value;
    setLogin(data);
  };

  const handleLogin = async () => {
    if (!login.password || !login.username) {
      handleShowToast("Login", "Vui lòng nhập đủ thông tin!", "error");
      return;
    }
    const response = await loginService.login({
      username: login.username,
      password: login.password,
    });

    const { data, statusCode, message } = response.data;

    if (statusCode == 201) {
      handleShowToast("Login", message, "success");
      Cookies.set("uinfo", JSON.stringify(data));
      if (data?.role == 1) {
        window.location.href = "/admin/analytic";
      } else {
        window.location.href = "/";
      }
    } else {
      handleShowToast("Login", message, "error");
    }
  };

  return (
    <Box
      w="100vw"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box width="500px" bg="whiteAlpha.600" p="16px 32px" borderRadius="16px">
        <Text
          position="relative"
          mb="32px"
          fontSize="32px"
          fontWeight="bold"
          color="#2e2e2e"
        >
          Đăng nhập
          <Box
            cursor="pointer"
            position="absolute"
            left="0"
            top="50%"
            transform="translateY(-50%)"
            onClick={() => navigate(-1)}
          >
            <IoArrowBackCircle />
          </Box>
        </Text>
        <CustomInput
          placeholder="Tên đăng nhập"
          onChange={handleChange("username")}
        />
        <Box position="relative">
          <CustomInput
            type={!isHide ? "password" : "text"}
            placeholder="Mật khẩu"
            onChange={handleChange("password")}
          />
          <Box
            position="absolute"
            right="10px"
            top="50%"
            transform="translateY(-50%)"
            cursor="pointer"
            zIndex={10}
            onClick={onToggle}
          >
            {isHide ? (
              <AiFillEye fontSize="25px" fill="#2e2e2e" />
            ) : (
              <AiFillEyeInvisible fontSize="25px" fill="#2e2e2e" />
            )}
          </Box>
        </Box>
        <HStack justifyContent="space-between" mb="16px">
          <Link
            _hover={{ color: "purple", textDecoration: "underline" }}
            onClick={() => navigate("/register")}
          >
            Tạo tài khoản mới
          </Link>
          <Link
            _hover={{ color: "purple", textDecoration: "underline" }}
            onClick={() => navigate("/forgot-password")}
          >
            Quên mặt khẩu
          </Link>
        </HStack>
        <Button
          display="block"
          margin="auto"
          colorScheme="purple"
          onClick={handleLogin}
        >
          Đăng nhập
        </Button>
      </Box>
    </Box>
  );
}

import { Box, Button, HStack, Link, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { CustomInput } from "../components/atoms/CustomInput";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import userService from "../service/user.service";
import { GlobalState } from "../App";

export default function Register() {
  const [isHide, setIsHide] = useState(false);
  const [isHideConfirm, setIsHideConfirm] = useState(false);
  const navigate = useNavigate();
  const [infoRegister, setInfoRegister] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const { handleShowToast } = useContext(GlobalState);

  const handleChange = (key) => (value) => {
    const data = { ...infoRegister };
    data[key] = value;
    setInfoRegister(data);
  };

  const onToggle = () => {
    setIsHide(!isHide);
  };
  const onToggleConfirm = () => {
    setIsHideConfirm(!isHideConfirm);
  };

  const handleRegister = async () => {
    if (
      !infoRegister?.confirm ||
      !infoRegister.email ||
      !infoRegister?.password ||
      !infoRegister?.username
    ) {
      handleShowToast("Register", "Vui lòng nhập đủ thông tin!", "error");
      return;
    }

    if (infoRegister?.password !== infoRegister?.confirm) {
      handleShowToast("Register", "Nhập lại mật khẩu không khớp!", "error");
      return;
    }
    const response = await userService.createUser({
      username: infoRegister?.username,
      email: infoRegister?.email,
      password: infoRegister?.password,
    });

    const { message, statusCode } = response.data;

    if (statusCode == 201) {
      handleShowToast("Register", message, "success");
      navigate("/login");
    } else {
      handleShowToast("Register", message, "error");
    }
  };

  return (
    <Box
      bgImage="url('images/bg-login.jpg')"
      w="100vw"
      h="100vh"
      bgRepeat="no-repeat"
      bgSize="cover"
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
          Đăng ký
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
        <CustomInput placeholder="Email" onChange={handleChange("email")} />
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
        <Box position="relative">
          <CustomInput
            type={!isHideConfirm ? "password" : "text"}
            placeholder="Nhập lại mật khẩu"
            onChange={handleChange("confirm")}
          />
          <Box
            position="absolute"
            right="10px"
            top="50%"
            transform="translateY(-50%)"
            cursor="pointer"
            zIndex={10}
            onClick={onToggleConfirm}
          >
            {isHideConfirm ? (
              <AiFillEye fontSize="25px" fill="#2e2e2e" />
            ) : (
              <AiFillEyeInvisible fontSize="25px" fill="#2e2e2e" />
            )}
          </Box>
        </Box>
        <HStack justifyContent="space-between" mb="16px"></HStack>
        <Button
          display="block"
          margin="auto"
          colorScheme="purple"
          onClick={handleRegister}
        >
          Đăng ký
        </Button>
      </Box>
    </Box>
  );
}

import { Box, Button, HStack, Link, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { CustomInput } from "../components/atoms/CustomInput";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import authService from "../service/auth.service";
import { GlobalState } from "../App";

export default function ForgotPassword() {
  const [info, setInfo] = useState({
    username: "",
    email: "",
  });
  const [pass, setPass] = useState({
    password: "",
    confirm: "",
  });
  const navigate = useNavigate();
  const [changePass, setChangePass] = useState(false);
  const { handleShowToast } = useContext(GlobalState);
  const [isHide, setIsHide] = useState(false);
  const [isHideConfirm, setIsHideConfirm] = useState(false);

  const handleChange = (key) => (value) => {
    const data = { ...info };
    data[key] = value;
    setInfo(data);
  };

  const onToggle = () => {
    setIsHide(!isHide);
  };
  const onToggleConfirm = () => {
    setIsHideConfirm(!isHideConfirm);
  };

  const handleChangePass = (key) => (value) => {
    const data = { ...pass };
    data[key] = value;
    setPass(data);
  };

  const handleValidate = async () => {
    if (!info?.username || !info.email) {
      handleShowToast("Forgot", "Vui lòng nhập đủ thông tin!", "error");
      return;
    }
    const response = await authService.verifyForgot({ ...info });
    const { statusCode, message } = response.data;
    if (statusCode == 201) {
      handleShowToast("Forgot", message, "success");
      setChangePass(true);
    } else {
      handleShowToast("Forgot", message, "error");
    }
    console.log(response);
  };

  const handleUpdate = async () => {
    if (!pass?.password || !pass.confirm) {
      handleShowToast("Forgot", "Vui lòng nhập đủ thông tin!", "error");
      return;
    }
    if (pass?.password !== pass.confirm) {
      handleShowToast("Forgot", "Nhập lại mật khẩu không khớp!", "error");
      return;
    }
    const response = await authService.changePassword({
      ...info,
      password: pass.password,
    });
    const { statusCode, message } = response.data;
    if (statusCode == 201) {
      handleShowToast("Forgot", message, "success");
      setChangePass(true);
      navigate("/login");
    } else {
      handleShowToast("Forgot", message, "error");
    }
  };
  return (
    <Box
      bgImage="url('images/bg-login.jpg')"
      bgRepeat="no-repeat"
      bgSize="cover"
      display="flex"
      w="100vw"
      h="100vh"
      justifyContent="center"
      alignItems="center"
    >
      {!changePass ? (
        <Box
          width="500px"
          bg="whiteAlpha.600"
          p="16px 32px"
          borderRadius="16px"
        >
          <Text
            position="relative"
            mb="32px"
            fontSize="32px"
            fontWeight="bold"
            color="#2e2e2e"
          >
            Xác thực thông tin
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
            value={pass.username}
            onChange={handleChange("username")}
          />
          <CustomInput
            placeholder="Email đăng ký"
            value={pass.email}
            onChange={handleChange("email")}
          />
          <HStack justifyContent="space-between" mb="16px"></HStack>
          <Button
            display="block"
            margin="auto"
            colorScheme="purple"
            onClick={handleValidate}
          >
            Xác thực
          </Button>
        </Box>
      ) : (
        <Box
          width="500px"
          bg="whiteAlpha.600"
          p="16px 32px"
          borderRadius="16px"
        >
          <Text
            position="relative"
            mb="32px"
            fontSize="32px"
            fontWeight="bold"
            color="#2e2e2e"
          >
            Đổi mật khẩu
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
          <Box position="relative">
            <CustomInput
              type={!isHide ? "password" : "text"}
              placeholder="Mật khẩu mới"
              value={pass.password}
              onChange={handleChangePass("password")}
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
              value={pass.confirm}
              onChange={handleChangePass("confirm")}
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
            onClick={handleUpdate}
          >
            Cập nhật
          </Button>
        </Box>
      )}
    </Box>
  );
}

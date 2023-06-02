import { Box, Button, HStack, Img, Input, Text } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { logout, userInfo } from "../helpers/commonFunction";
import { CustomInput } from "./atoms/CustomInput";

const list = ["ÁO NAM", "QUẦN NAM", "PHỤ KIỆN", "GIÀY DÉP"];

export default function Header() {
  const navigate = useNavigate();
  const params = useParams();
  const [value, setValue] = useState(null);
  const [info, setInfo] = useState(null);
  const [searchString, setSearchString] = useState("");

  const handleChangeSearchName = (value) => {
    setSearchString(value);
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const onSearch = () => {
    navigate("/search/" + searchString);
  };

  useEffect(() => {
    const split = window.location.pathname?.split("/");
    const infoUser = userInfo();
    if (split[1] === "category") {
      setValue(split[2]);
    } else {
      setValue(null);
    }
    setInfo(infoUser);
  }, [params]);

  const goto = (value) => {
    navigate(`/category/${value}`);
  };

  return (
    <Box
      w="100%"
      position="fixed"
      top="0"
      zIndex={100}
      boxShadow="rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
    >
      <Box
        bg="white"
        p="16px 32px"
        w="100%"
        h="100px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {info ? (
          <Box display="flex" alignItems="center">
            <Text fontSize="18px" fontStyle="bold" mr="16px">
              Xin chào, {info?.user_name}
            </Text>
            <Button colorScheme="red" onClick={logout}>
              Đăng xuất
            </Button>
          </Box>
        ) : (
          <Button colorScheme="purple" onClick={handleLogin}>
            Đăng nhập
          </Button>
        )}

        <Box
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Img
            h="100%"
            w="auto"
            src="/images/nike-logo.png"
            cursor="pointer"
            onClick={() => navigate("/")}
          />
          <Box position="relative" w="400px" pl="20px">
            <CustomInput
              placeholder="Tìm kiếm sản phẩm bạn cần"
              onChange={handleChangeSearchName}
            />
            <Box
              position="absolute"
              right="10px"
              top="50%"
              transform="translateY(-50%)"
              cursor="pointer"
              onClick={onSearch}
              zIndex={10}
            >
              <SearchIcon fontSize="25px" fill="#805AD5" />
            </Box>
          </Box>
        </Box>
        <Button
          colorScheme="purple"
          width="auto"
          variant="outline"
          onClick={() => {
            navigate("/cart");
          }}
        >
          Giỏ hàng
        </Button>
      </Box>
      <HStack bg="white" justifyContent="center" borderTop="1px solid #2e2e2e">
        {list?.map((ele, idx) => {
          return (
            <Box
              key={idx}
              padding="10px 20px"
              cursor="pointer"
              fontWeight="medium"
              color={
                value == idx + 1 ? "var(--chakra-colors-purple-500)" : "#2e2e2e"
              }
              transition="0.3s"
              borderBottom={`2px solid ${
                value == idx + 1
                  ? "var(--chakra-colors-purple-500)"
                  : "transparent"
              }`}
              onClick={() => {
                goto(idx + 1);
              }}
              _hover={{
                color: "var(--chakra-colors-purple-500)",
                borderColor: "var(--chakra-colors-purple-500)",
              }}
            >
              {ele}
            </Box>
          );
        })}
      </HStack>
    </Box>
  );
}

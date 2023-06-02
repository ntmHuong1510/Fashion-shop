import { Box, Text, Icon, createIcon } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { CustomInput } from "./atoms/CustomInput";
import {
  FcComboChart,
  FcConferenceCall,
  FcStackOfPhotos,
  FcExport,
  FcShop,
  FcSearch,
} from "react-icons/fc";
import { FaUsers } from "react-icons/fa";
import { logout } from "../helpers/commonFunction";
import {
  CheckCircleIcon,
  EmailIcon,
  PhoneIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { MdReceipt } from "react-icons/md";
import { userInfo } from "../helpers/commonFunction";
export default function AdminLayout(props) {
  const navigate = useNavigate();
  const Facebook = createIcon({
    displayName: "Facebook",
    viewBox: "0 0 512 512",
    d: "M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z",
  });
  const Message = createIcon({
    displayName: "Message",
    viewBox: "0 0 512 512",
    d: "M256.55 8C116.52 8 8 110.34 8 248.57c0 72.3 29.71 134.78 78.07 177.94 8.35 7.51 6.63 11.86 8.05 58.23A19.92 19.92 0 0 0 122 502.31c52.91-23.3 53.59-25.14 62.56-22.7C337.85 521.8 504 423.7 504 248.57 504 110.34 396.59 8 256.55 8zm149.24 185.13l-73 115.57a37.37 37.37 0 0 1-53.91 9.93l-58.08-43.47a15 15 0 0 0-18 0l-78.37 59.44c-10.46 7.93-24.16-4.6-17.11-15.67l73-115.57a37.36 37.36 0 0 1 53.91-9.93l58.06 43.46a15 15 0 0 0 18 0l78.41-59.38c10.44-7.98 24.14 4.54 17.09 15.62z",
  });

  const Instagram = createIcon({
    displayName: "Instagram",
    viewBox: "0 0 512 512",
    d: "M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z",
  });
  const Twitter = createIcon({
    displayName: "Twitter",
    viewBox: "0 0 512 512",
    d: "M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z",
  });

  const location = useLocation();
  const [active, setActive] = useState();

  const loadTitle = () => {
    if (active === 0) return "Thống kê";
    if (active === 1) return "Người dùng";
    if (active === 2) return "Đơn hàng";
    if (active === 3) return "Sản phẩm";
  };

  useEffect(() => {
    const info = userInfo();
    if (info?.role != 1) window.location.href = "/";
  });

  useEffect(() => {
    if (location?.pathname.includes("analytic")) setActive(0);
    if (location?.pathname.includes("user")) setActive(1);
    if (location?.pathname.includes("order")) setActive(2);
    if (location?.pathname.includes("product")) setActive(3);
  }, [location?.pathname]);

  return (
    <Box>
      <Box
        bg="linear-gradient(to right, #E8CBC0, #dbe6f6, #636FA4)"
        boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          w="90%"
          m="auto"
        >
          <Box display="flex" m="5px">
            <Box m="0 15px">
              <CheckCircleIcon boxSize={6} mr="10px" /> Free Delivery
            </Box>
            <Box m="0 15px" display="flex">
              <Icon as={MdReceipt} boxSize={6} mr="10px" />{" "}
              <Box>Returns Policy</Box>
            </Box>
            <Box
              m="0 15px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box ml="15px">Follow Us</Box>
              <EmailIcon ml="15px" />
              <PhoneIcon ml="15px" />
              <Facebook ml="15px" />
              <Twitter ml="15px" />
              <Instagram ml="15px" />
              <Message ml="15px" />
            </Box>
          </Box>
          <Text fontSize="18px" fontStyle="bold" mr="16px">
            Xin chào, Admin
          </Text>
        </Box>
      </Box>
      <Box display="flex">
        <Box
          bg="linear-gradient(to right, #dbbde1, #d5c6f8)"
          height="calc(100vh - 37px)"
          w="300px"
          overflow="auto"
          padding="8px 16px"
          position="relative"
        >
          <Box
            w="100%"
            position="absolute"
            left="50%"
            top="50%"
            transform="translateY(-50%) translateX(-50%)"
          >
            <Box
              w="100%"
              padding="16px 32px"
              display="flex"
              transition="0.2s"
              bg={active === 0 && "#e2e2e2"}
              _hover={{ bg: "#e2e2e2", color: "black" }}
              onClick={() => navigate("/admin/analytic")}
              cursor="pointer"
            >
              <FcComboChart fontSize="30px" />
              <Text ml="30px" fontSize="20px" transition="0.2s">
                Thống kê
              </Text>
            </Box>
            <Box
              w="100%"
              padding="16px 32px"
              display="flex"
              transition="0.2s"
              bg={active === 1 && "#e2e2e2"}
              _hover={{ bg: "#e2e2e2", color: "black" }}
              onClick={() => navigate("/admin/user")}
              cursor="pointer"
            >
              <FcConferenceCall fontSize="30px" />
              <Text ml="30px" fontSize="20px" transition="0.2s">
                Người dùng
              </Text>
            </Box>
            <Box
              w="100%"
              padding="16px 32px"
              display="flex"
              transition="0.2s"
              bg={active === 2 && "#e2e2e2"}
              _hover={{ bg: "#e2e2e2", color: "black" }}
              onClick={() => navigate("/admin/order")}
              cursor="pointer"
            >
              <HamburgerIcon fontSize="30px" />
              <Text ml="30px" fontSize="20px" transition="0.2s">
                Đơn hàng
              </Text>
            </Box>
            <Box
              w="100%"
              padding="16px 32px"
              display="flex"
              transition="0.2s"
              _hover={{ bg: "#e2e2e2", color: "black" }}
              bg={active === 3 && "#e2e2e2"}
              onClick={() => navigate("/admin/product")}
              cursor="pointer"
            >
              <FcStackOfPhotos fontSize="30px" />
              <Text ml="30px" fontSize="20px" transition="0.2s">
                Sản phẩm
              </Text>
            </Box>
            <Box
              w="100%"
              padding="16px 32px"
              display="flex"
              transition="0.2s"
              _hover={{ bg: "#e2e2e2", color: "black" }}
              cursor="pointer"
              onClick={logout}
            >
              <FcExport fontSize="30px" />
              <Text ml="30px" fontSize="20px" transition="0.2s">
                Đăng xuất
              </Text>
            </Box>
          </Box>
        </Box>
        <Box w="calc(100vw - 300px)">
          <Box w="100%" h="120px" bg="whiteAlpha.300" padding="32px">
            <Box display="plex" w="90%" justifyContent="space-between" m="auto">
              <Box display="plex" justifyContent="center">
                <FcShop fontSize="56px" />
                <Text
                  fontSize="32px"
                  fontStyle="bold"
                  fontWeight="bold"
                  mx="20px"
                >
                  Fashion Shop
                </Text>
              </Box>
              <Box position="relative" w="400px" pl="20px">
                <CustomInput
                  placeholder="Tìm kiếm sản phẩm"
                  // onChange={handleChange("password")}
                />
                <Box
                  position="absolute"
                  right="10px"
                  top="50%"
                  transform="translateY(-50%)"
                  cursor="pointer"
                  zIndex={10}
                >
                  <FcSearch fontSize="35px" />
                </Box>
              </Box>
              <Text
                fontSize="32px"
                fontStyle="bold"
                fontWeight="bold"
                mr="32px"
              >
                {loadTitle()}
              </Text>
            </Box>
          </Box>
          {props.children}
        </Box>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
}

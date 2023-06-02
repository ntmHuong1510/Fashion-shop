import { Box, Img, Tag, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../helpers/commonFunction";

export default function Product(props) {
  const navigate = useNavigate();
  const { images = [], name, product_id, price, ...rest } = props;
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <Box
      width="300px"
      height="400px"
      position="relative"
      borderRadius="10px"
      overflow="hidden"
      cursor="pointer"
      margin="16px"
      boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
      onMouseEnter={handleToggle}
      onMouseLeave={handleToggle}
      onClick={() => {
        navigate(`/product/${product_id}`);
      }}
      {...rest}
    >
      <Img src={images[0]} display={toggle ? "block" : "none"} />
      <Img
        src={images[1] ? images[1] : images[0]}
        display={toggle ? "none" : "block"}
      />
      <Tag
        colorScheme="purple"
        position="absolute"
        top="0"
        right="0"
        borderBottomRightRadius="0"
        borderTopLeftRadius="0"
        zIndex={2}
      >
        {formatCurrency(price)}
      </Tag>
      <Box
        p="20px"
        position="absolute"
        bg="blackAlpha.400"
        top="0"
        w="100%"
        h="100%"
        opacity="0"
        display="flex"
        alignItems="center"
        transition="0.3s"
        _hover={{ opacity: 1 }}
      >
        <Text fontSize="18px" color="white" fontWeight="bold">
          {name}
        </Text>
      </Box>
    </Box>
  );
}

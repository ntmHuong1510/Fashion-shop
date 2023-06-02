import {
  Box,
  Container,
  SimpleGrid,
  Text,
  chakra,
  Link,
  Stack,
  Input,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  EmailIcon,
  PhoneIcon,
  LinkIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createIcon } from "@chakra-ui/react";

export default function Footer() {
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
  return (
    <Box
      w="100%"
      bg="linear-gradient(to right, #be93c5, #636FA4, #E8CBC0)"
      zIndex={50}
      mt="100px"
    >
      <Container as={Stack} maxW={"10xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 2fr 2fr 2fr" }}
          spacing={8}
        >
          <Stack align={"flex-start"} marginLeft="20px" marginRight="50px">
            <Text fontWeight="600" fontSize="25px" mb="2">
              {" "}
              DESCRIPTION{" "}
            </Text>{" "}
            <Text> Contact us via Facebook, Message, Instagram, etc </Text>{" "}
            <Link
              href={"https://h...content-available-to-author-only...u.vn/en/"}
              _hover={{ color: "white", fontSize: "15px" }}
            >
              {" "}
              <LinkIcon /> International University{" "}
            </Link>{" "}
            <Link href={"#"} _hover={{ color: "white", fontSize: "15px" }}>
              {" "}
              <EmailIcon /> Fashionshop @gmail.com{" "}
            </Link>{" "}
            <Link href={"#"} _hover={{ color: "white", fontSize: "15px" }}>
              {" "}
              <PhoneIcon /> 0123 - 456 - 789{" "}
            </Link>{" "}
          </Stack>{" "}
          <Stack align={"flex-start"} marginLeft="50px" marginRight="50px">
            <Text fontWeight="500" fontSize="25px" mb="2">
              {" "}
              COMPANY{" "}
            </Text>{" "}
            <Link href={"#"} _hover={{ color: "white", fontSize: "15px" }}>
              <ChevronRightIcon /> About us{" "}
            </Link>{" "}
            <Link href={"#"} _hover={{ color: "white", fontSize: "15px" }}>
              {" "}
              <ChevronRightIcon /> Blog{" "}
            </Link>{" "}
            <Link href={"#"} _hover={{ color: "white", fontSize: "15px" }}>
              {" "}
              <ChevronRightIcon /> Contact us{" "}
            </Link>{" "}
            <Link href={"#"} _hover={{ color: "white", fontSize: "15px" }}>
              {" "}
              <ChevronRightIcon /> Pricing{" "}
            </Link>{" "}
            <Link href={"#"} _hover={{ color: "white", fontSize: "15px" }}>
              {" "}
              <ChevronRightIcon /> Testimonials{" "}
            </Link>{" "}
          </Stack>{" "}
          <Stack align={"flex-start"} marginLeft="50px" marginRight="50px">
            <Text fontWeight="500" fontSize="25px" mb="2">
              {" "}
              SUPPORT{" "}
            </Text>{" "}
            <Link href={"#"} _hover={{ color: "white", fontSize: "15px" }}>
              {" "}
              <ChevronRightIcon /> Help Center{" "}
            </Link>{" "}
            <Link href={"#"} _hover={{ color: "white", fontSize: "15px" }}>
              {" "}
              <ChevronRightIcon /> Terms of Service{" "}
            </Link>{" "}
            <Link href={"#"} _hover={{ color: "white", fontSize: "15px" }}>
              {" "}
              <ChevronRightIcon /> Legal{" "}
            </Link>{" "}
            <Link href={"#"} _hover={{ color: "white", fontSize: "15px" }}>
              {" "}
              <ChevronRightIcon /> Privacy Policy{" "}
            </Link>{" "}
            <Link href={"#"} _hover={{ color: "white", fontSize: "15px" }}>
              {" "}
              <ChevronRightIcon /> Status{" "}
            </Link>{" "}
          </Stack>{" "}
          <Stack align={"flex-start"}>
            <Text fontWeight="500" fontSize="25px" mb="2">
              {" "}
              NEWSLETTER{" "}
            </Text>{" "}
            <Stack direction={"row"}>
              <Input
                padding={"5px"}
                placeholder={"Your email address"}
                border={"1px"}
                _focus={{
                  bg: "white",
                }}
                width={"200px "}
              />{" "}
              <IconButton
                padding={"5px"}
                icon={<EmailIcon margin={"3px"} />}
                border={"1px"}
                _hover={{
                  bg: "white",
                  fontSize: "20px",
                }}
              >
                {" "}
              </IconButton>{" "}
            </Stack>{" "}
            <Text
              fontWeight="500"
              fontSize="25px"
              mb="2"
              paddingBottom={"10px"}
            >
              FOLLOW US
            </Text>{" "}
            <Text> </Text>{" "}
            <Stack direction={"row"}>
              <IconButton
                padding={"5px"}
                icon={<Facebook margin={"5px"} />}
                border={"1px"}
                _hover={{
                  bg: "white",
                  fontSize: "20px",
                }}
              >
                {" "}
              </IconButton>{" "}
              <IconButton
                padding={"5px"}
                icon={<Message margin={"5px"} />}
                border={"1px"}
                _hover={{
                  bg: "white",
                  fontSize: "20px",
                }}
              >
                {" "}
              </IconButton>{" "}
              <IconButton
                padding={"5px"}
                icon={<Instagram margin={"5px"} />}
                border={"1px"}
                _hover={{
                  bg: "white",
                  fontSize: "20px",
                }}
              >
                {" "}
              </IconButton>{" "}
              <IconButton
                padding={"5px"}
                icon={<Twitter margin={"5px"} />}
                border={"1px"}
                _hover={{
                  bg: "white",
                  fontSize: "20px",
                }}
              >
                {" "}
              </IconButton>{" "}
            </Stack>{" "}
          </Stack>{" "}
        </SimpleGrid>{" "}
      </Container>
    </Box>
  );
}

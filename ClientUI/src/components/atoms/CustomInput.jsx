import { Box, Input } from "@chakra-ui/react";
import React from "react";

export function CustomInput(props) {
  const { placeholder, type, value, onChange = () => {}, errorMessage } = props;
  return (
    <Box w="100%" my="16px">
      <Input
        variant="outline"
        bg="whiteAlpha.800"
        _focus={{
          borderColor: "purple",
        }}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </Box>
  );
}

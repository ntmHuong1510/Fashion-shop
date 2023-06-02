import React, { useEffect } from "react";
import queryString from "query-string";
import Layout from "../components/Layout";
import { Box, Text } from "@chakra-ui/react";
import paymentService from "../service/payment.service";

export default function Status() {
  const params = queryString.parse(window.location.search);

  useEffect(() => {
    (async () => {
      await paymentService.updatePayment({
        orderId: params?.orderId,
        transId: params?.transId,
        orderType: params?.orderType,
        resultCode: params?.resultCode,
      });
    })();
  }, [params?.orderId, params?.orderType, params?.resultCode, params?.transId]);

  return (
    <Layout>
      <Box
        display="flex"
        transform="translateY(200px)"
        alignItems="center"
        justifyContent="center"
        w="200px"
        borderRadius="16px"
        h="200px"
        margin="auto"
        bg="whiteAlpha.700"
        padding="20px"
      >
        <Text fontSize="24px">
          {params?.resultCode == 0
            ? "Thanh toán thành công!"
            : "Thanh toán thất bại"}
        </Text>
      </Box>
    </Layout>
  );
}

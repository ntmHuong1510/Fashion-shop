import {
  Box,
  Button,
  FormLabel,
  HStack,
  Img,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Tfoot,
  Th,
  Thead,
  Tr,
  useNumberInput,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { CustomInput } from "../components/atoms/CustomInput";
import cartInfoService from "../service/cart.service";
import paymentService from "../service/payment.service";
import { formatCurrency } from "../helpers/commonFunction";
import { GlobalState } from "../App";
import { useNavigate } from "react-router-dom";
import cartService from "../service/cart.service";

export default function Cart() {
  const [dataCart, setDataCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { handleShowToast } = useContext(GlobalState);
  const navigate = useNavigate();
  const [orderInfo, setOrderInfo] = useState({
    name: "",
    phone: "",
    address: "",
    shiper: "",
    note: "",
    method: "captureWallet",
  });

  useEffect(() => {
    (async () => {
      const response = await cartInfoService.cartInfo();
      const { data, statusCode } = response.data;
      if (statusCode == 200) {
        setTotalPrice(data?.totalPrice);
        setDataCart(data?.orders);
      } else {
        handleShowToast("Cart", "Vui lòng đăng nhập!", "error");
        navigate("/");
      }
    })();
  }, []);

  const getData = async () => {
    const response = await cartInfoService.cartInfo();
    const { data, statusCode } = response.data;
    if (statusCode == 200) {
      setTotalPrice(data?.totalPrice);
      setDataCart(data?.orders);
    } else {
      window.location.href = "/";
    }
  };

  const onDeleteItem = async (id) => {
    const response = await cartInfoService.deleteItem({
      product_id: id,
    });
    const { statusCode, message } = response.data;

    if (statusCode == 200) {
      handleShowToast("Cart", message, "success");
      await getData();
    } else {
      handleShowToast("Cart", message, "error");
    }
  };

  const handleUpdateQuantity = async (id, value) => {
    const response = await cartInfoService.updateQuantity({
      product_id: id,
      quantity: value,
    });
    const { statusCode, message } = response.data;

    if (statusCode == 200) {
      handleShowToast("Cart", message, "success");
      await getData();
    } else {
      handleShowToast("Cart", message, "error");
    }
  };

  const handleChange = (key) => (value) => {
    const data = { ...orderInfo };
    data[key] = value;
    setOrderInfo(data);
  };

  const handlePayment = async () => {
    if (
      !orderInfo.name ||
      !orderInfo.phone ||
      !orderInfo.address ||
      !orderInfo.shiper
    ) {
      handleShowToast("Login", "Vui lòng nhập đủ thông tin!", "error");
      return;
    }
    try {
      const response = await paymentService.createPayment({
        amount: totalPrice,
        orderInfo: `PAYMENT-${new Date().getTime()}`,
        type: orderInfo?.method,
      });
      const { message } = response.data;
      window.location.href = message?.payUrl;
    } catch (error) {
      handleShowToast("Cart", String(error), "error");
    }
  };

  const handCreateOrder = async () => {
    if (
      !orderInfo.name ||
      !orderInfo.phone ||
      !orderInfo.address ||
      !orderInfo.shiper
    ) {
      handleShowToast("Login", "Vui lòng nhập đủ thông tin!", "error");
      return;
    }
    try {
      const response = await cartService.createOrderCart({
        phone: orderInfo.phone,
        address: orderInfo.address,
        shipper: orderInfo.shiper,
        ship_price: 30000,
        date: new Date().toISOString(),
        note: orderInfo?.note,
        name: orderInfo.name,
      });
      const { data } = response.data;
      const responsePayment = await paymentService.createPayment({
        amount: totalPrice,
        orderInfo: `PAYMENT-${new Date().getTime()}`,
        type: orderInfo?.method,
        momo_order_id: data?.momo_order_id,
      });
      const { message } = responsePayment.data;
      window.location.href = message?.payUrl;
    } catch (error) {
      handleShowToast("Cart", String(error), "error");
    }
  };

  return (
    <Layout>
      <Box
        bg="whiteAlpha.700"
        maxW="1500px"
        margin="auto"
        padding="32px"
        mt="100px"
        borderRadius="10px"
      >
        <TableContainer>
          <Table variant="simple">
            <TableCaption>
              <Text fontSize="18px">Thông tin đơn hàng</Text>
            </TableCaption>
            <Thead>
              <Tr>
                <Th fontSize="18px">Tên sản phẩm</Th>
                <Th textAlign="center" fontSize="18px">
                  Hình ảnh
                </Th>
                <Th textAlign="center" fontSize="18px">
                  Số lượng
                </Th>
                <Th textAlign="center" fontSize="18px">
                  Giá
                </Th>
                <Th textAlign="center" fontSize="18px"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataCart?.map((ele) => {
                return (
                  <Tr key={ele?.product_id}>
                    <Td>{ele?.name}</Td>
                    <Td>
                      <Img margin="auto" width="100px" src={ele?.thumnail} />
                    </Td>
                    <Td>
                      <Text textAlign="center">
                        <NumberInput
                          min={1}
                          defaultValue={ele?.quantity}
                          onChange={(value) => {
                            handleUpdateQuantity(ele?.product_id, value);
                          }}
                          bg="whiteAlpha.700"
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Text>
                    </Td>
                    <Td>
                      <Text textAlign="center">
                        {formatCurrency(ele?.price * ele?.quantity)}
                      </Text>
                    </Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          onDeleteItem(ele?.product_id);
                        }}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th></Th>
                <Th>
                  <Text fontSize="18px">
                    Tổng cộng: {formatCurrency(totalPrice || 0)}
                  </Text>
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
        <Box>
          <FormLabel>Họ và tên người nhận</FormLabel>
          <CustomInput
            value={orderInfo?.name}
            onChange={handleChange("name")}
          />
          <FormLabel>Số điện thoại người nhận</FormLabel>
          <CustomInput
            type="phone"
            value={orderInfo?.phone}
            onChange={handleChange("phone")}
          />
          <FormLabel>Địa chỉ nhận hàng</FormLabel>
          <CustomInput
            value={orderInfo?.address}
            onChange={handleChange("address")}
          />
          <FormLabel>Đơn vị vận chuyển</FormLabel>
          <Select
            value={orderInfo?.shiper}
            placeholder="vui lòng chọn"
            bg="whiteAlpha.700"
            my="16px"
            onChange={(e) => {
              handleChange("shiper")(e.target.value);
            }}
          >
            <option value="Ninja Van">Ninja Van</option>
            <option value="GHTK">Giao hàng tiết kiệm</option>
            <option value="VNPost">VNPost</option>
          </Select>
          <FormLabel>Ghi chú</FormLabel>
          <Textarea
            bg="whiteAlpha.700"
            resize={false}
            my="16px"
            value={orderInfo?.note}
            onChange={(e) => {
              handleChange("note")(e.target.value);
            }}
          />
          <FormLabel>Phương thức thanh toán</FormLabel>
          <RadioGroup
            value={orderInfo?.method}
            onChange={handleChange("method")}
          >
            <Stack direction="row" spacing="30px">
              <Radio value="captureWallet">Ví Momo</Radio>
              <Radio value="payWithATM">Thẻ ngân hàng nội địa</Radio>
              <Radio value="payWithCC">Thẻ visa</Radio>
            </Stack>
          </RadioGroup>
          <Button
            variant="outline"
            colorScheme="purple"
            onClick={handCreateOrder}
          >
            Tiến hành thanh toán
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}

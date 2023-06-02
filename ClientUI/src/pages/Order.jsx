import {
  Box,
  Button,
  Icon,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, CircleIcon } from "@chakra-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../helpers/commonFunction";
import AdminLayout from "../components/AdminLayout";
import historyService from "../service/history.service";
import { MdDocumentScanner } from "react-icons/md";
import { GlobalState } from "../App";

export default function Order() {
  const [orderList, setOrderList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataCart, setDataCart] = useState([]);
  const { onChangeLoading } = useContext(GlobalState);

  useEffect(() => {
    (async () => {
      onChangeLoading(true);
      const response = await historyService.getOrders();
      const { data } = response;
      setOrderList(data?.data);
      onChangeLoading(false);
    })();
  }, []);

  const handleOpen = (id) => {
    setDataCart(orderList.find((ele) => ele?.order_id == id).order_items);
    onOpen();
  };

  return (
    <AdminLayout>
      <Box
        bg="whiteAlpha.500"
        maxW="auto"
        margin="32px"
        padding="32px"
        mt="100px"
        h="calc(100vh - 300px)"
        overflow="auto"
        borderRadius="10px"
      >
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontSize="18px">Mã đơn hàng</Th>
                <Th fontSize="18px">Mã thanh toán Momo</Th>
                <Th fontSize="18px">Người nhận</Th>
                <Th fontSize="18px">Ngày đặt hàng</Th>
                <Th fontSize="18px">Số điện thoại</Th>
                <Th fontSize="18px">Địa chỉ giao hàng</Th>
                <Th fontSize="18px">Tổng giá trị</Th>
                <Th fontSize="18px">Trạng thái</Th>
                <Th fontSize="18px"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {orderList?.map((ele) => {
                return (
                  <Tr
                    key={ele?.order_id}
                    bg={
                      ele?.resultCode === 0
                        ? "green.300"
                        : ele?.resultCode == null
                        ? "orange.300"
                        : "red.300"
                    }
                  >
                    <Td>{ele?.order_id}</Td>
                    <Td>{ele?.momo_order_id}</Td>
                    <Td>{ele?.name}</Td>
                    <Td>{ele?.date}</Td>
                    <Td>{ele?.phone}</Td>
                    <Td>{ele?.address}</Td>
                    <Td>{formatCurrency(ele?.order_items?.totalPrice)}</Td>
                    <Td>
                      {ele?.resultCode === 0
                        ? "Thanh toán thành công!"
                        : ele?.resultCode == null
                        ? "Chưa thanh toán"
                        : "Thanh toán thất bại"}
                    </Td>
                    <Td>
                      <Box display="flex" alignItems="center">
                        <Box ml="15px">
                          <Icon
                            as={MdDocumentScanner}
                            fill="black"
                            boxSize={6}
                            mr="10px"
                            cursor="pointer"
                            onClick={() => handleOpen(ele?.order_id)}
                          />
                        </Box>
                      </Box>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thông tin đơn hàng</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="simple">
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
                  {dataCart?.orders?.map((ele) => {
                    return (
                      <Tr key={ele?.product_id}>
                        <Td>{ele?.name}</Td>
                        <Td>
                          <Img
                            margin="auto"
                            width="100px"
                            src={ele?.thumnail}
                          />
                        </Td>
                        <Td>{ele?.quantity}</Td>
                        <Td>
                          <Text textAlign="center">
                            {formatCurrency(ele?.price * ele?.quantity)}
                          </Text>
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
                        Tổng cộng: {formatCurrency(dataCart?.totalPrice || 0)}
                      </Text>
                    </Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </AdminLayout>
  );
}

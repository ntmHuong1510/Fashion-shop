import {
  Box,
  Button,
  Img,
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
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../helpers/commonFunction";
import AdminLayout from "../components/AdminLayout";
import { GlobalState } from "../App";
import { FcEmptyTrash, FcEditImage } from "react-icons/fc";
import productService from "../service/product.service";
export default function Product() {
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 4,
  });
  const { onChangeLoading } = useContext(GlobalState);
  const totalPage = useRef(0);

  useEffect(() => {
    (async () => {
      onChangeLoading(true);
      const response = await productService.getProductList({
        ...pagination,
      });
      const { statusCode, data } = response?.data;
      if (statusCode === 200) {
        const result = data?.dataArray?.map((ele) => {
          return {
            ...ele,
            image_url: JSON.parse(ele.image_url.replace(/'/g, '"')),
          };
        });
        setProductList(productList.concat(result));
        totalPage.current = data.totalPage;
      }
      onChangeLoading(false);
    })();
  }, [pagination]);

  const handleChangePagination = () => {
    setPagination({ ...pagination, currentPage: pagination.currentPage + 1 });
  };

  return (
    <AdminLayout>
      <Box
        bg="whiteAlpha.500"
        maxW="1500px"
        margin="auto"
        padding="32px"
        h="calc(100vh - 300px)"
        overflow="auto"
        mt="100px"
        borderRadius="10px"
      >
        <TableContainer>
          <Table variant="simple">
            <TableCaption>
              <Text fontSize="18px">Danh sách các sản phẩm</Text>
            </TableCaption>
            <Thead>
              <Tr>
                <Th fontSize="18px">Mã sản phẩm</Th>
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
              {productList?.map((ele) => {
                return (
                  <Tr key={ele?.product_id}>
                    <Td>{ele?.product_id}</Td>
                    <Td>{ele?.name}</Td>
                    <Td>
                      <Img
                        margin="auto"
                        width="100px"
                        src={ele?.image_url[0]}
                      ></Img>
                    </Td>
                    <Td>
                      <Text textAlign="center">36</Text>
                    </Td>
                    <Td>
                      <Text textAlign="center">
                        {formatCurrency(ele?.price)}
                      </Text>
                    </Td>
                    <Td>
                      {/* <Box display="flex">
                        <Box ml="15px">
                          <Img
                            w="52px"
                            src="https://cdn.icon-icons.com/icons2/2621/PNG/512/gui_edit_icon_157165.png"
                          />
                        </Box>
                        <Box ml="15px">
                          <Img
                            w="52px"
                            src="https://cdn.icon-icons.com/icons2/10/PNG/256/remove_delete_exit_close_1545.png"
                          />
                        </Box>
                      </Box> */}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th>
                  <Button
                    colorScheme="purple"
                    variant="solid"
                    mt="32px"
                    onClick={handleChangePagination}
                  >
                    Xem thêm
                  </Button>
                </Th>
                <Th></Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </AdminLayout>
  );
}

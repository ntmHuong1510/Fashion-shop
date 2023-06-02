import {
  Box,
  Img,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import userService from "../service/user.service";
import { GlobalState } from "../App";

export default function User() {
  const [listUser, setListUser] = useState([]);
  const { onChangeLoading } = useContext(GlobalState);
  const { handleShowToast } = useContext(GlobalState);
  useEffect(() => {
    (async () => {
      onChangeLoading(true);
      const response = await userService.getUser();
      const { data } = response;
      console.log(data?.data);
      setListUser(data?.data || []);
      onChangeLoading(false);
    })();
  }, []);

  // const onDeleteItem = async (id) => {
  //   const response = await userService.deleteUser({
  //     user_id: id,
  //   });
  //   console.log("hiihii");
  //   // const { statusCode, message } = response.data;

  //   // if (statusCode == 200) {
  //   //   handleShowToast("User", message, "success");
  //   // } else {
  //   //   handleShowToast("User", message, "error");
  //   // }
  // };

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
              <Text fontSize="18px">Danh sách người dùng</Text>
            </TableCaption>
            <Thead>
              <Tr>
                <Th fontSize="18px">Mã người dùng</Th>
                <Th fontSize="18px">Tên đăng nhập</Th>
                <Th textAlign="center" fontSize="18px">
                  Email
                </Th>
                <Th textAlign="center" fontSize="18px">
                  Phân quyền
                </Th>
                <Th textAlign="center" fontSize="18px"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {listUser?.map((ele) => {
                return (
                  <Tr key={ele?.user_id}>
                    <Td>{ele?.user_id}</Td>
                    <Td>{ele?.user_name}</Td>
                    <Td>{ele?.email}</Td>
                    <Td>{ele?.role == 1 ? "Admin" : "Người dùng"}</Td>
                    <Td>
                      <Box display="flex">
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
                      </Box>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </AdminLayout>
  );
}

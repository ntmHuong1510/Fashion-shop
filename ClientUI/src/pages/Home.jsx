import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import Product from "../components/Product";
import Layout from "../components/Layout";
import productService from "../service/product.service";
import { GlobalState } from "../App";

export default function Home() {
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 16,
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
    <Layout>
      <Box
        w="100%"
        h="500px"
        bgImg="url('images/homebanner.png')"
        bgRepeat="no-repeat"
        bgSize="cover"
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      />
      <Grid
        h="auto"
        maxW="1500px"
        w="100%"
        margin="auto"
        templateColumns="repeat(4, 1fr)"
        gap={16}>
        {productList?.map((ele) => {
          return (
            <GridItem key={ele?.product_id}>
              <Product
                images={ele?.image_url}
                name={ele?.name}
                product_id={ele?.product_id}
                price={ele?.price}
              />
            </GridItem>
          );
        })}
      </Grid>
      {pagination.currentPage !== totalPage.current && (
        <Button
          colorScheme="purple"
          variant="solid"
          mt="32px"
          onClick={handleChangePagination}>
          Xem thêm
        </Button>
      )}
    </Layout>
  );
}

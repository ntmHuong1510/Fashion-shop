import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import Product from "../components/Product";
import Layout from "../components/Layout";
import productService from "../service/product.service";
import { GlobalState } from "../App";
import { useParams } from "react-router-dom";

export default function Category() {
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 16,
  });
  const totalPage = useRef(0);
  const params = useParams();
  const { onChangeLoading } = useContext(GlobalState);

  useEffect(() => {
    (async () => {
      onChangeLoading(true);
      const response = await productService.getProductList({
        ...pagination,
        cateId: params?.id,
      });
      const { statusCode, data } = response?.data;
      if (statusCode === 200) {
        const result = data?.dataArray?.map((ele) => {
          return {
            ...ele,
            image_url: JSON.parse(ele.image_url.replace(/'/g, '"')),
          };
        });
        setProductList(result);
        totalPage.current = data.totalPage;
      }
      onChangeLoading(false);
    })();
  }, [pagination, params?.id]);

  useEffect(() => {
    (async () => {
      onChangeLoading(true);
      const response = await productService.getProductList({
        ...pagination,
        cateId: params?.id,
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
      }
      onChangeLoading(false);
    })();
  }, [pagination]);

  const handleChangePagination = () => {
    setPagination({ ...pagination, currentPage: pagination.currentPage + 1 });
  };

  return (
    <Layout>
      <Grid
        h="auto"
        maxW="1500px"
        w="100%"
        margin="auto"
        templateColumns="repeat(4, 1fr)"
        mt="32px"
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

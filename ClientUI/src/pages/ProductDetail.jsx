import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Box, Button, Img, Text } from "@chakra-ui/react";
import Slider from "react-slick";
import Product from "../components/Product";
import productService from "../service/product.service";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalState } from "../App";
import { formatCurrency } from "../helpers/commonFunction";
import cartService from "../service/cart.service";
// import commentService from "../service/comment.service";
export default function ProductDetail() {
  const [product, setProduct] = useState();
  const [relateProduct, setRelateProduct] = useState();
  // const [comments, setComments] = useState();
  // const [isShow, setIsShow] = useState(false);
  const { onChangeLoading, handleShowToast } = useContext(GlobalState);
  const params = useParams();
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    swipe: true,
  };
  const settings2 = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    swipe: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    (async () => {
      onChangeLoading(true);
      const response = await productService.getProductByID({
        product_id: params?.id,
      });
      const { statusCode, data } = response?.data;
      if (statusCode === 200) {
        const responseRelate = await productService.getProductList({
          currentPage: 2,
          cateId: data?.cate_id,
          limit: 20,
        });
        const { data: dataRelate } = responseRelate;
        const relatedData = dataRelate.data;
        const result = relatedData?.dataArray?.map((ele) => {
          return {
            ...ele,
            image_url: JSON.parse(ele.image_url.replace(/'/g, '"')),
          };
        });
        // const resComment = await commentService.getProductComments({
        //   product_id: params?.id,
        // });

        // const { statusCode: statusCodeCmt, data: dataCmt } = resComment?.data;
        // if (statusCodeCmt === 200) {
        //   setIsShow(!isShow);
        //   const commentList = dataCmt?.map((ele) => {
        //     const dataqueryUserName = commentService.getUserNameForAComment({
        //       user_id: ele.user_id,
        //     });
        //     console.log(dataqueryUserName.value, "hgihihi");
        //     return {
        //       user_name: dataqueryUserName, //user_name
        //       content: ele.content,
        //     };
        //   });
        //   console.log(dataCmt[0].user_id);
        //   //
        // }
        setRelateProduct(result);
        setProduct({
          ...data,
          image_url: JSON.parse(data.image_url.replace(/'/g, '"')),
        });
      }
      onChangeLoading(false);
    })();
  }, [params?.id]);

  const handleAddToCard =
    (isImediately = false) =>
    async () => {
      const response = await cartService.addToCart({
        product_id: params?.id,
        quantity: 1,
      });
      const { statusCode, message } = response.data;

      if (statusCode == 200) {
        handleShowToast("Product", message, "success");
        isImediately && navigate("/cart");
      } else {
        handleShowToast("Product", message, "error");
      }
    };

  return (
    <Layout>
      <Box
        maxW="1500px"
        margin="auto"
        pt="100px"
        display="flex"
        justifyContent="space-between"
      >
        <Box w="35%" height="fit-content" borderRadius="10px">
          <Slider {...settings}>
            {product?.image_url?.map((ele, idx) => {
              return (
                <Box borderRadius="10px" overflow="hidden">
                  <Img key={idx} src={ele} />
                </Box>
              );
            })}
          </Slider>
        </Box>
        <Box w="50%">
          <Text fontSize="40px" textAlign="left">
            {product?.name}
          </Text>
          <Box display="flex" alignItems="flex-end">
            <Text fontSize="32px" mr="16px" fontWeight="medium">
              {formatCurrency(product?.price)}
            </Text>
            <Text fontSize="16px" textDecoration="line-through" color="gray">
              {formatCurrency(product?.price + 100000)}
            </Text>
          </Box>
          <Box mt="32px">
            <Button
              colorScheme="purple"
              mr="32px"
              onClick={handleAddToCard(true)}
            >
              Mua ngay
            </Button>
            <Button
              colorScheme="purple"
              variant="outline"
              onClick={handleAddToCard()}
            >
              Thêm vào giỏ hàng
            </Button>
          </Box>
          {/* <Text
            textAlign="left"
            fontSize="24px"
            mt="50px"
            mb="20px"
            fontWeight="bold"
          >
            Danh Sách các bình luận
          </Text> */}

          <Text
            textAlign="left"
            fontSize="24px"
            mt="120px"
            mb="20px"
            fontWeight="bold"
          >
            Sản phẩm tương tự
          </Text>
          <Box>
            <Slider {...settings2}>
              {relateProduct?.map((ele) => {
                return (
                  <Box key={ele?.product_id}>
                    <Product
                      images={ele?.image_url}
                      name={ele?.name}
                      product_id={ele?.product_id}
                      price={ele?.price}
                      width="200px"
                      height="250px"
                    />
                  </Box>
                );
              })}
            </Slider>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

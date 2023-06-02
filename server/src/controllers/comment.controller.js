const commonUtils = require("../utils/common.util");
const jwt = require("jsonwebtoken");
const jwtSecret = "process.env.JWT_SERECT";
const comment = require("../services/comment.service");

async function getComment(req, res, next) {
  try {
    const { product_id } = req?.query;
    if (!product_id) {
      res
        .status(200)
        .json(
          commonUtils.formatResponse(
            "Thiếu id sản phẩm mà bạn muốn xem bình luận!!!",
            401
          )
        );
    } else {
      const listcomments = await comment.getCommentsOfProduct(product_id);
      listcomments?.length > 0
        ? res
            .status(200)
            .json(
              commonUtils.formatResponse(
                "Tìm kiếm bình luận thành công",
                200,
                listcomments
              )
            )
        : res
            .status(200)
            .json(
              commonUtils.formatResponse(
                "Không có bình luận nào cho sản phẩm này!",
                204,
                listcomments
              )
            );
    }
  } catch (error) {
    console.error(`Error while auth`, err.message);
    next(err);
  }
}

// async function addComment(req, res, next) {
//   try {
//     const commentInfor = req?.body;
//     if (!commentInfor.product_id || !commentInfor.user_id) {
//       res
//         .status(200)
//         .json(
//           commonUtils.formatResponse(
//             "Thiếu product id || user id --> Không thể tạo bình luận",
//             401
//           )
//         );
//     } else {
//       console.log(
//         commentInfor.product_id,
//         typeof commentInfor.user_id,
//         typeof commentInfor.rating,
//         typeof commentInfor.content
//       );
//       await comment.createComment(
//         commentInfor.product_id,
//         commentInfor.user_id,
//         commentInfor.rating,
//         commentInfor.content
//       );

//       res
//         .status(200)
//         .json(commonUtils.formatResponse("Add comment successfuly!!!", 200));
//     }
//   } catch (error) {
//     console.error(`Error while auth`, err.message);
//     next(err);
//   }
// }

// async function getComments(req, res, next) {
//   try {
//     const commentList = await comment.getAllComments();
//     var reqMess =
//       commentList?.length > 0
//         ? "Xuất tất cả bình luận thành công"
//         : "Chưa có bình luận nào trên hệ thống^^!";
//     res
//       .status(200)
//       .json(commonUtils.formatResponse(reqMess, 200, listcomments));
//   } catch (error) {
//     console.error(`Error while auth`, err?.message);
//     next(err);
//   }
// }

// async function deleteComment(req, res, next) {
//   try {
//     const reqData = req?.body;
//     if (!reqData?.comment_id) {
//       res
//         .status(200)
//         .json(
//           commonUtils.formatResponse(
//             "Oops. Thiếu id bình luận mà admin cute muốn xóa rùi^^",
//             401
//           )
//         );
//     }
//     await comment.deleteComment(reqData?.comment_id);
//     res.status(200).json(commonUtils.formatResponse("Delete success!!!", 200));
//   } catch (error) {
//     console.error(`Error while auth`, err.message);
//     next(err);
//   }
// }
module.exports = {
  getComment,
  // addComment,
  // getComments,
  // deleteComment,
};

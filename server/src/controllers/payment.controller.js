const commonUtils = require("../utils/common.util");
const payment = require("../services/payment.service");
const crypto = require("crypto");
const https = require("https");

async function createPayment(req, res, next) {
  const dataReq = req.body;
  if (
    !dataReq?.amount ||
    !dataReq?.orderInfo ||
    !dataReq?.type ||
    !dataReq?.momo_order_id
  ) {
    return res
      .status(200)
      .json(
        commonUtils.formatResponse(
          "Missing param amount or orderInfo!",
          404,
          null
        )
      );
  }
  const partnerCode = "MOMO";
  const accessKey = "F8BBA842ECF85";
  const secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  const requestId = partnerCode + new Date().getTime();
  const orderId = requestId;
  const orderInfo = dataReq?.orderInfo;
  const redirectUrl = "http://localhost:3001/status";
  const ipnUrl = "http://localhost:3000/payment/ipn-momo";
  // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
  const amount = dataReq?.amount;
  const requestType = dataReq.type || "captureWallet";
  const extraData = ""; //pass empty value if your merchant does not have stores

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  const rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  //puts raw signature
  console.log("--------------------RAW SIGNATURE----------------");
  console.log(rawSignature);
  //signature
  const signature = crypto
    .createHmac("sha256", secretkey)
    .update(rawSignature)
    .digest("hex");
  console.log("--------------------SIGNATURE----------------");
  console.log(signature);

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: "en",
  });
  const options = {
    hostname: "test-payment.momo.vn",
    port: 443,
    path: "/v2/gateway/api/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };
  const reqMomo = https.request(options, (request) => {
    request.setEncoding("utf8");
    request.on("data", (body) => {
      const result = JSON.parse(body);
      payment.updateOrder({
        momo_order_id: dataReq?.momo_order_id,
        orderId: result?.orderId,
      });
      res.status(200).json({ message: result });
    });
    request.on("end", () => {
      console.log("No more data in response.");
    });
  });
  reqMomo.on("error", (e) => {
    console.log(`problem with reqMomouest: ${e.message}`);
  });
  reqMomo.write(requestBody);
}

async function ipnMomo(req, res, next) {
  const { orderId, transId, orderType, resultCode } = req.body;
  console.log(orderId, transId, orderType, resultCode);
  // try {
  await payment.updateStatusOrder({
    orderId,
    transId,
    orderType,
    resultCode,
  });
  return res.status(204).json();
  // } catch {
  //   res.status(500);
  // }
}

module.exports = {
  createPayment,
  ipnMomo,
};

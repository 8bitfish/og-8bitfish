const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
exports.handler = async function (event, context) {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const pinata_api_key = process.env.PINATA_API_KEY;
  const pinata_secret_api_key = process.env.PINATA_SECRET_API_KEY;
  let location = event.queryStringParameters.location;
  let tokenId = event.queryStringParameters.tokenId;
  console.log(location);
  console.log(tokenId);
  let data = new FormData();
  data.append(`${tokenId}`, location); //# goes to local?

  const uploadToIPFS = await axios.post(url, data, {
    maxBodyLength: "Infinity", //this is needed to prevent axios from erroring out with large files
    headers: {
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key,
      pinata_secret_api_key,
    },
  });
  // .then(fs.unlinkSync(location));

  return {
    statusCode: 200,
    body: JSON.stringify({
      image: `https://gateway.pinata.cloud/ipfs/${uploadToIPFS.data.IpfsHash}`,
    }),
  };
};

const { URL } = require('url');
const crypto = require('crypto');

// check if url is valid
function isValidUrl(urlString) {
  let url;
  try { 
    url = new URL(urlString); 
  } catch(e) { 
    return false; 
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

// randomize
function createRandomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const randomArray = new Uint8Array(length);
  crypto.getRandomValues(randomArray);
  randomArray.forEach((number) => {
    result += chars[number % chars.length];
  });
  return result;
}

module.exports = {
  isValidUrl,
  createRandomString
}

const url = require("url");

const strUrl =
  "http://allysoftsolutions.com:8520/path1/path2" + "/index.html?n=20&c=rajkot";

const myUrl = url.parse(strUrl);

console.log(myUrl.host);
console.log(myUrl.hostname);
console.log(myUrl.path);
console.log(myUrl.pathname);
console.log(myUrl.protocol);
console.log(myUrl.query);

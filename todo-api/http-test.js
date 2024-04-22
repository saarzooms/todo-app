var http = require("http");
const server = http.createServer();

http.createServer((request, response) => {
  if (request.url == "/org") console.log(request.url);
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello World");
});
//   .listen(8081);
server.listen(8081);

console.log("Server running at http://127.0.0.1:8081/");

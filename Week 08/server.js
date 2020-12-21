const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  let body = [];
  req
    .on("error", () => {
      console.log(err);
    })
    .on("data", (chunk) => {
      //转为编码后的字符串的格式
      body.push(chunk.toString());
    })
    .on("end", () => {
      console.log(body);
      body = body.join("");
      //console.log("body:", body);
      //单独设置时，返回的报文，不包含transfer-encoding 字段
      //res.statusCode = 200;
      //res.setHeader("Content-Type", "text/html");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(" hello http\n");
    });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

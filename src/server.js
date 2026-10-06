import * as http from "node:http";

const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const statusCode = 200;
  res.writeHead(
    statusCode,
    {
      "Content-Type": "text/html; charset=UTF-8"
    }
  );
  res.end("<h1>Hello World!</h1>");
});


server.listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);

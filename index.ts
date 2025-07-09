import http, { IncomingMessage, ServerResponse } from "http";

const PORT: number = 5055; // port number terserah, 4 digit

const dbStudent: any[] = [
  {
    id: 1,
    name: "Hajra",
    email: "hajra@mail.com",
  },
  {
    id: 2,
    name: "Arco",
    email: "arco@mail.com",
  },
];

// Define API config
const server = http.createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    //
    console.log("READ REQUEST", request.method, request.url);
    // conditional statement
    if (request.method === "GET") {
      if (request.url === "/") {
        response.write("<h1>Intro API</h1>");
        response.end();
      } else if (request.url?.includes("/student")) {
        const query = request.url.split("?")[1]; // ["/student", "email=hajra@mail.com"]
        if (query) {
          const filterEmail = dbStudent.filter((val: any) => {
            return val.email === query.split("=")[1]; // ["email", "hajra@mail.com"]
          });
          response.write(JSON.stringify(filterEmail));
        } else {
          response.write(JSON.stringify(dbStudent));
        }
        response.end();
      } else if (request.url === "/profile") {
        //
      } else {
        //
      }
    }
  }
);

// Run server
server.listen(PORT, () => {
  console.log(`API is RUNNING at http://localhost:${PORT}`);
});

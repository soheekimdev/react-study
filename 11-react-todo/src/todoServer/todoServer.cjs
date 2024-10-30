const http = require("http");

let todos = [
  { id: 1, content: "밥먹기" },
  { id: 2, content: "공부하기" },
];

const server = http.createServer((req, res) => {
  console.log(req.method + " 요청이 들어왔어요!");

  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method === "OPTIONS") {
    res.end("요청을 보내시오");
  }

  if (req.method === "POST") {
    let data;
    req.on("data", (chunk) => {
      data = chunk.toString();
    });
    req.on("end", () => {
      todos.push({ id: Number(new Date()), content: data });
      console.log(todos);
      res.end("Todo가 추가되었어요!");
    });
  }

  if (req.method === "GET") {
    res.end(JSON.stringify(todos));
  }

  if (req.method === "DELETE") {
    let data;
    req.on("data", (chunk) => {
      data = chunk.toString();
    });
    req.on("end", () => {
      todos = todos.filter((el) => el.id !== JSON.parse(data).id);
      console.log(todos);
      res.end("Todo가 삭제됐어요!");
    });
  }

  if (req.method === "PUT") {
    let data;
    req.on("data", (chunk) => {
      data = chunk.toString();
    });
    req.on("end", () => {
      const { id, newContent } = JSON.parse(data);
      todos = todos.map((el) => {
        if (el.id === id) {
          return { id, content: newContent };
        } else {
          return el;
        }
      });
      console.log(todos);
      res.end("Todo가 수정됐어요!");
    });
  }
});

server.listen(4000, () => {
  console.log("서버가 열렸어요!");
});

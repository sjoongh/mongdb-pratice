//  Express 모듈 불러오기
const express = require("express");
const http = require("http");   //  노드 기본 http 모듈

//  express 생성
const app = express();

//  설정, 속성을 집어넣을 때
//  set(키, 값)
//  get(키)

//  환경 변수에 PORT 가 설정되어 있으면 그 값을 사용
//  설정이 안되어 있으면 3000
app.set('port', process.env.PORT || 3000);

//  로거 추가
//  npm install morgan
//  로거 불러오기
const logger = require("morgan");   //  로거 불러오기
//  로거를 express에 추가: 마들웨어 추가
app.use(logger("dev"));

//  정적 웹의 제공
//  미들웨어 express.static 미들웨어 함수를 등록 
app.use(express.static(__dirname + "/public"));

// GET 메서드 요청의 처리
// app.get(url, callback)
app.get("/", (req, resp) => {
    // http 모듈의 응답 처리메서드
    console.log("[GET] /");
    resp.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    resp.write("Express Welcomes You!");
    resp.end();
})

app.get("/welcome", (req, resp) => {
    // express의 추가 응답 처리 메서드
    console.log("[GET] /welcome");
    resp.status(200)
    .header("Content-Type", "text/html;charset=UTF-8")
    .send("Welcome!");
})

// GET 요청 파라미터의 처리
app.get("/request", (req, resp) => {
    console.log("[GET] / request");
    console.log(req.query); // req.query -> url 파라미터 객체
    console.log("[QUERY] name:"+req.query.name);

    let paramName = req.query.name;
    if (paramName === undefined ||
        paramName.length == 0) { // name 파라미터가 전달되지 않으면
            resp.status(404)    // NotFound
            .contentType("text/html;charset=utf-8")
            .send("Name 정보를 확인할 수 없어요.");
        } 
    else {
            // 파라미터 정상 전달
            resp.status(200) // 성공
            .contestType("text/html;charset=utf-8")
            .send("Name:"+paramName);
        }
})
//  서버 start
http.createServer(app).listen(app.get("port"), () => {
    console.log("Web Server is running on port:" + app.get("port"));
})
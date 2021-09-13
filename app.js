//  Express 모듈 불러오기
const express = require("express");
const http = require("http");   //  노드 기본 http 모듈

//  express 생성
const app = express();

//  설정, 속성을 집어넣을 때
//  set(키, 값)
//  get(키)

// etag를 사용하지 않음
app.set("etag", false);

//  환경 변수에 PORT 가 설정되어 있으면 그 값을 사용
//  설정이 안되어 있으면 3000
app.set('port', process.env.PORT || 3000);

//  로거 추가
//  npm install morgan
//  로거 불러오기
// morgan : 로깅에 도움을 주는 미들웨어, 로깅이란 무슨일이 어디에서 일어났는지를 기록함
const logger = require("morgan");   //  로거 불러오기
//  로거를 express에 추가: 마들웨어 추가
// npm run dev로 실행중일때 logger도 같이 사용함
app.use(logger("dev"));

//  정적 웹의 제공
//  미들웨어 express.static 미들웨어 함수를 등록 
app.use(express.static(__dirname + "/public"));

// View엔진 설정
app.set("view engine", "ejs"); // 뷰엔진으로 ejs 사용 선언
app.set("views", __dirname + "/views"); // 템플릿의 위치

// GET 메서드 요청의 처리
// app.get(url, callback)
// req : 요청객체, res : 응답객체 --> 이름은 마음대로 지어도됨
// req.속성 or res.속성 을 통해 어떤 요청객체를 받아올지 어떤 응답객체를 보내줄지 정할 수 있음
// --> req.params : 파라미터에 데이터를 가져옴, 
// --> res.redirect() : 페이지를 이동 시킴
// --> res.send() : 클라이언트에 응답을 보냄(디버깅시 많이 사용)
// --> req.query : 쿼리스트링 파라미터에 전부를 가져옴
app.get("/", (req, resp) => {
    // http 모듈의 응답 처리메서드
    // console.log("[GET] /");
    // resp.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    // resp.write("Express Welcomes You!");
    // resp.end();
    // 정상적 : 200, contenttype은 text로 utf-8설정, render는 home으로 다시 전송
    resp.status(200)
        .contentType("text/html;charset=utf-8")
        .render("home");
})

app.get("/welcome", (req, resp) => {
    // express의 추가 응답 처리 메서드
    console.log("[GET] /welcome");
    resp.status(200)
    .header("Content-Type", "text/html;charset=utf-8")
    .send("Welcome!");
})

//  GET 요청 파라미터의 처리
app.get("/request", (req, resp) => {
    console.log("[GET] /request");
    console.log(req.query); //  req.query -> url 파라미터 객체
    console.log("[QUERY] name:" + req.query.name);

    let paramName = req.query.name;
    if (paramName === undefined ||
        paramName.length == 0) {    //  name 파라미터가 전달되지 않으면
        resp.status(404)    //  Not Found
            .contentType("text/html;charset=utf-8")
            .send("Name 정보를 확인할 수 없어요.");
    } else {
        //  파라미터 정상 전달
        resp.status(200)    //  성공
            .contentType("text/html;charset=utf-8")
            .send("Name:" + paramName);
    }
})

// URL 파라미터 처리(Fancy URL, Pretty URL)
// URL 경로의 일부로 데이터 전송 방식
app.get("/urlparam/:name", (req, resp) => {
    // url 파라미터는 params 객체로 얻어온다.
    let userName = req.params.name;
    resp.writeHead(200, { "Content-Type": "text/html;charset=UTF-8"})
    resp.write("<h1>name:" + userName + "</h1>")
    resp.write("<p>URL 파라미터를 전달 받았습니다.</p>")
    resp.send();
})

// 뷰엔진 활용
app.get("/render", (req, resp) => {
    // 응답객체의 render 메소드 활용
    resp.contentType("text/html;charset=utf-8")
    .render("render");
})
//  서버 start
http.createServer(app).listen(app.get("port"), () => {
    console.log("Web Server is running on port:" + app.get("port"));
})
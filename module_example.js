// 내장 객체
/*
console
process
exports
 */

// process 객체
console.log(process.version,    // node 버전
    process.platform,           // 운영체제 종류
    process.arch);              // 프로세서 아키텍처
console.log(process.versions);  // 종속된 프로그램의 버전들
console.log(process.env);       // 환경 정보

// Global 변수
console.log(__dirname); // 현재 모듈의 디렉터리
console.log(__filename); // 현재 모듈의 파일명

// 모듈로부터 개별 객체 불러오기 
// 1. import로 불러올 수도 있음, export와 export default
// 2. require
// 모듈을 불러올때는 .js는 붙이면x
// const add = require("./modules/test_module1").add;
// const square = require("./modules/test_module1").square;
// 전개 연산을 이용한 require
// require은 module.exports를 리턴한다
// exports는 module.exports을 참조함, module.exports의 짧은 코드일뿐임 --> 둘이 똑같은 기능과 동작을 함
const { add, square } = require("./modules/test_module1");
const area = require("./modules/test_module2");
// exports는 해당 module1에서 사용할 객체를 지정해주고 사용해야함(개별 모듈 이므로)
console.log(add(10, 20)); // 불러온 객체 사용
console.log(square(30));
// module2의 module.exports는 해당 모듈의 이름만 지정해주면 안에 있는 객체를 접근해서 사용가능(하나의 모듈이므로)
console.log(area.square(40));
console.log(area.rectangle(10, 20));
console.log(area.circle(30));

// 전체 모듈도 전개연산을 통해 받아올 수 있음
// 어떠한 모듈도 받아올때 전개연산자를 쓰기위해서는 객체명이 {}안에 있어야함
// 전개연산을 사용하지 않을때는 그래서 앞에 사용자가 설정하는 변수명 = require(경로).객체명으로
// 객체명이 .에서 미리사용됨
const { square, rectangle, circle } = require("./modules/test_module2");
console.log(square(50));
console.log(rectangle(50, 20));
console.log(circle(40));


// nodejs환경에서 mongodb를 사용하기 위해 필요한 패키지를 npm으로 다운로드
// npm install mongodb
// mongdb의 패키지를 nodejs에 적용하기 위해 모듈을 불러옴
// nodejs를 통해 js언어를 터미널에서 실행가능
const MongoClient = require('mongodb').MongoClient; // 로드
// 27017은 몽고디비 전용 포트, 개인용 IP로 접속, 다른 서버IP로 접속설정해도 무관
const url = "mongodb://localhost:27017";    //  접속 url
// 접속할 database이름 설정
const dbName = "mydb";

//  클라이언트 생성
const client = new MongoClient(url, { useNewUrlParser: true });

//  접속 테스트
function testConnect() {
    client.connect((err, client) => {
        //  콜백
        /*
        if (err) {
            console.error(err);
        } else {
            console.log(client);
            client.close();
        }
        */
        client.connect()
        .then(client => {
            //  성공시
            console.log(client);
            client.close();
        })
        .catch(reason => {
            console.error(reason);
        })
    });
}
// testConnect();

//  한개 문서 insert
//  INSERT INTO mydb.friends VALUE(...);
//  db.friends.insert({ 문서 })
function testInsertOne(name) {
    client.connect()
    .then(client => {
        //  DB 선택
        const db = client.db("mydb");
        //  컬렉션 선택 후 쿼리 수행
        // console.log(db.collection("mydb"));
        // filed와 value에 하나의 값 삽입, collection이름은 friends
        // filed와 value의 이름이 같다면 name만 적어도 무관
        // 결과는 JSON형식
        db.collection("friends").insertOne({ name: name })
        .then(result => {
            console.log(result);
            console.log("새로 삽입된 문서의 ID:", result.insertedId);
            client.close()
        });
    })
    // 예외 발생시 잡아줌
    .catch(reason => {
        console.log(reason);
    })
}
// testInsertOne("홍길동");

//  다수 문서 삽입
//  INSERT INTO friends VALUE(...), (...), (...)
//  db.friends.insertMany([ { 문서 }, { 문서 }, ...])
function testInsertMany(names) {
    // 배열로 다수의 값 삽입
    console.log(names, "는 배열?", Array.isArray(names));
    if (Array.isArray(names)) { //  names가 배열
        client.connect()
        .then(client => {
            const db = client.db("mydb");
            // names에 있는 요소들 map으로 돌려서 각각의 요소를 { filed: value }형식으로 만듬 --> data
            let data = names.map(item => {
                return {name: item};
            }); //  문서의 배열 생성
            console.log("삽입될 문서 목록:", data);
            // data값 전부 삽입
            db.collection("friends").insertMany(data)
            //  insertMany는 문서의 배열이 필요
            .then(result => {
                console.log(result.insertedCount, "개 삽입");
                client.close();
            })
        })

    } else {
        //  배열이 아니면
        testInsertOne(names);
    }
}
// testInsertMany(["고길동", "둘리", "도우너"]);
// testInsertMany("징길산");

// 삭제
// DELETE FROM friends [WHERE ...]
// db.friends.delete, db.friends.deleteMany({ 조건 객체 })
function testDeleteAll() {
    client.connect()
    .then(client => {
        const db = client.db("mydb");
        db.collection("friends").deleteMany({}) // 조건 객체
        .then(result => {
            console.log(result.deletedCount, "개 레코드 삭제");
            client.close();
        })
    })
}
// testDeleteAll();

function testInsertOneDoc(doc) {
    client.connect()
    .then(client => {
        const db = client.db("mydb");
        db.collection("friends")
        .insertOne(doc)
        .then(result => {
            console.log(result.insertedCount);
            client.close();
        })
        .catch(reason => {
            console.error(reason);
        })
    })
}
// testInsertOneDoc({ name: "임꺽정", job: "도적" });

function testInsertManyDocs(docs) {
    client.connect()
    .then(client => {
        const db = client.db("mydb");
        if (Array.isArray(docs)) {
            //  여러 개의 문서
            db.collection('friends').insertMany(docs)
            .then(result => {
                console.log(result.insertedCount, "개 삽입");
                client.close();
            })
            .catch(reason => {
                console.error(reason);
            })
        } else {
            //  1개 문서
            testInsertOneDoc(docs);
        }
    })
}
// testInsertManyDocs(
//     [{ name: '고길동', gender: '남성', species: '인간', age: 50},
//     { name: '둘리', gender: '남성', species: '공룡', age: 100000000},
//     { name: '도우너', gender: '남성', species: '외계인', age: 15},
//     { name: '또치', gender: '여성', species: '조류', age: 15},
//     { name: '영희', gender: '여성', species: '인간', age: 12}]);

// 함수 내보내기: 다른 모듈에서 사용할 수 있게
exports.testInsertOneDoc = testInsertOneDoc;
exports.testInsertManyDocs = testInsertManyDocs;
exports.testDeleteAll = testDeleteAll;

function testUpdateByJob(name, job) {
    // name이 일치하는 문서, job의 필드를 업데이트
    client.connect()
    .then(client => {
        const db = client.db("mydb");
        db.collection("friends").updateMany(
            { name: name}, // 조건객체
            {
                $set: { job: job } // $set 연산자 필수
            }
        ).then(result => {
            console.log(result.modifiedCount, "개 업데이트,",
                        result.upsertedCount, "개 업서트");
        }).then(() => {
            client.close();
        })
    })
}
testUpdateByJob("고길동", "직장인");
// const MongoClient = require("mongdb").MongoClient;
// 둘이 같은 동작
//const { MongoClient } = require("mongodb");
// 객체 구조 할당 방식
// const { testInsertOneDoc, 
//     testInsertManyDocs, 
//     testDeleteAll } = require("./mongodb-01-crud");
const { MongoClient } = require("mongodb");
const { default: cluster } = require("cluster");

const url = "mongodb://localhost:27017"; // 접속 URL

const client = new MongoClient(url, { useNewUrlParser: true });

// 문서 한 개 가져오기
function testFindOne() {
    client.connect()
    .then(client => {
        const db = client.db("mydb");

        db.collection("friends").findOne()
        .then(result => {
            console.log(result);
            client.close();
        })
    })
}
// testFindOne();


// 문서 전체 가져오기
function testFindAll() {
    // 클라이언트 연결
    client.connect()
    .then(client => {
        // db선택
        const db = client.db("mydb");
        // toArray()로 배열을 변경하면 Promise의 도움을 받을 수 있다
        db.collection("friends").find().toArray()
        .then(result => {
            for (let doc of result) {
                console.log(doc);
            }
        }).then(() => {
            client.close();
        })
        .catch(reason => {
            console.error(err);
        })
    })
}
// 결과는 JSON형식
// testFindAll();

//  조건 검색
//  SELECT * FROM friends WHERE name='___'
//  조건 객체 { name: '값' } : =
function testFindByName(name) {
    client.connect()
    .then(client => {
        const db = client.db("mydb");
        // db.friends의 collection에서 
        db.collection("friends").find(
            /* 조건 객체 */
            { name: name }
        ).toArray()
        .then(result => {
            for (let doc of result) { 
                console.log(doc);
            }
        }).then(() => {
            client.close();
        }).catch(reason => {
            console.error(reason);
        })
    })
}
// testFindByName("고길동");

//  조건 조합 검색
//  SELECT * FROM ... WHERE cond1 and(or) cond2
function testFindCombinedWhere() {
    client.connect()
    .then(client => {
        const db = client.db("mydb");
        db.collection("friends").find(
            /* gender: 여성 and species: 인간 */
            /*
            {
                $and: [
                    { gender: "여성" },
                    { species: "인간"}
                ]
            }
            */
            /* species: 인간 or age > 15 */
            {
                $or: [
                    { species: "인간"},
                    { age: { $gt: 50 }}
                ]
            }
        ).toArray().then(result => {
            for (let doc of result) {
                console.log(doc);
            }
        }).then(() => {
            client.close();
        })
    })
}
// testFindCombinedWhere()

//  projection
function testFindProduction() {
    client.connect() 
    .then(client => {
        const db = client.db("mydb");
        db.collection("friends").find({} /* 검색조건 */)
            // .project({ name:1, age: 1})  //  표시할 필드 선택 1: 표시, 0: 표시 안함
            .project({_id: 0})  //  특정 필드만 표시하지 않을 때
            // .skip(2)    //  2 문서 건너뛰기
            // .limit(2)   //  2 문서 표시
            .toArray().then(docs => {
                for (let doc of docs) {
                    console.log(doc);
                }
            }).then(() => {
                client.close();
            }).catch(reason => {
                console.error(reason);
            })
    })
}
testFindProduction();
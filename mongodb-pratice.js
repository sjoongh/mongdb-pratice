// mydb �����ͺ��̽� ����

use mydb



// ���� �����ͺ��̽� Ȯ��

db



// db�� �����ϴ� collections ��  posts�� ����

// title�� FirstPost�� ������ ����

db.posts.insert({��title��: ��Fist Post��})

ㅅ

// ��ť��Ʈ �˻�

// 1�� ���� �˻� : findOne()

db.posts.findOne();



// JSON ��ü �����

let post = { ��title��: ��Second Post��

}

db.posts.save(post);

// save : ��ť��Ʈ�� _id�ʵ尡 ������

// insert(����)



// ���� �Ѱ��� ����

post = db.posts.findOne();

post

// _id�� �����Ǿ� �ִ�

// ��Ű���� ������ ���� �ʴ�

post.createdAt = new Date();

// save : ��ť��Ʈ�� _id �ʵ尡 ������

// update(����)

db.posts.save(post)

// ���� ������ ����(Update)

/*

db.�÷��Ǹ�.update(

	{ ���� ������ ���� },

	{ $set: 

		{ ������Ʈ�� ���� }

}

);

*/

db.posts.update(

	{ ��title��: ��First Post�� },

	{ $set:

	{ createdAt: new Date(),

  updatedAt: new Date() }

}

)



// ��ü�� ���� : .remove

post = db.posts.findOne()

db.posts.remove(post)



// �˻� ���� ��ü�� �̿��� ����

db.posts.remove({title : /Second/})



// ���� ������ insert - insertMany

db.posts.insertMany([

	{ title: ��Fifth Post��, 

by: ��bit��,

likes: 50 },

	{ title: ��Sixth Post��,

by: ��hong��,

likes: 50 }

])



// ������ �˻�

// findOne : ������ �����ϴ� ���� �� �Ѱ��� ��ȯ

// find() : ������ �����ϴ� ������ Ŀ���� ��ȯ

// .pretty() �޼��� : BSON�� ���� ���� ���



// �˻� ���� ������

// ����: { key: value }

db.posts.find({ ��by��: ��bit�� }) // by = bit



// ũ��: $gt { key: { $gt: value } }

db.posts.find({ ��hit��: { $gt: 50 } } ) // hit > 50

// ũ�ų� ����: $gte

// �۴�: $lt

// �۰ų� ����: $lte

// ���� �ʴ�: $ne



// ������ ����

// and����

/*

	{

	  $and: [

		{ ���� ��ü 1 },

		{ ���� ��ü 2 }

]

}

*/



// by�� hong�̰� likes <= 30

db.posts.find({

	{

$and: [

			{  by: ��hond�� },

			{ likes: { $lte: 30 } }

]

}

)



// or ����

/*

	{

	 $or: [

		{ ���� ��ü 1 },

		{ ���� ��ü 2 }

]

}

*/

// by�� hond �̰ų� likes > 10

db.posts.find({

	$or : [

		{ by: ��hond�� },

		{ likes: { $gt: 10 } }

]

});



// Projection

// find, findOne�� �ι�° ���� ��ü�� ��� �ʵ带 ����

// ����� ������ �� �ִ�

// 1: �����, 0: ������� ����

// ��� ������ �߿���, _id ������� �ʰ�

// title, likes ���� ���

db.posts.find({}, { title: 1, likes: 1, _id: 0 })



// ��� ����

// .limit : �޾ƿ� ������ ����

// .skip : �ǳʶ� ������ ���� ����

db.posts.find().limit(2).skip(2)



// ������ ����

// ���Ľ� ������ �Ǵ� ������ �����ϴٸ�

// �Է¼������ ���ĵȴ�

// .sort : ���� ���� ��ü

//	1: ��������, -1: ��������



// likes�� �������� ����

db.posts.find().sort({likes: -1})


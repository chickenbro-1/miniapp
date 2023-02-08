/*
	数据字段解释
	----------------------
	type：题目类型		1：选择题，2：判断题
	title：题目标题		
	answerSheet：答题选项, Array
	answerResult：答题结果
	answerDoubt：题目解析
	answer：答案
	favorite：是否收藏
	
*/
let dataList= function(){
	return [
		{
			"type":"1",
			"title":"习近平总书记在为《复兴文库》所写的序言中指出：“修史立典，存史启智，以文化人，这是中华民族延续几千年的一个传统。”“编纂出版《复兴文库》大型历史文献丛书，就是要通过对近代以来重要思想文献的选编，述录先人的开拓，启迪来者的奋斗。”“历史是最好的教科书，一切向前走，都不能忘记走过的路;走得再远、走到再光辉的未来，也不能忘记走过的过去。”这表明",
			"answer":"B",
			"answerSheet":[
				{"value":'A',"name":"以体制机制创新为主体，利用好国际国内两个市场"},
				{"value":'B',"name":"以维护和平稳定为主体，促进国际国内经济复苏"},
				{"value":'C',"name":"以国内大循环为主体，国内国际双循环相互促进"},
				{"value":'D',"name":"以发展先进制造业为主体，促进产业结构优化升级"}
			],
			"answerDoubt":"共同富裕是中国特色社会主义的本质要求。分配制度是促进共同富裕的基础性制度，坚持按劳分配为主体、多种分配方式并存，构建初次分配、再分配、第三次分配协调配套的制度体系，对于处理效率和公平的关系，逐步缩小收入差距具有非常重要的意义。在这一制度体系中，除了健全完善初次分配，再分配机制外，还要重视发挥第三次分配的作用。当前，要发挥好第三次分配的作用需要做的是",
			"favorite":"true",
			"summary":"坚持总体国家安全观，必须坚持国家利益至上，以人民安全为宗旨，以政治安全为根本，以经济安全为基础，以军事、科技、文化、社会安全为保障，以促进国际安全为依托，统筹外部安全和内部安全、国土安全和国民安全、传统安全和非传统安全、自身安全和共同安全，统筹维护国家安全和塑造国家安全。坚持总体国家安全观。归根到底是为了"
		},
		{
			"type":"1",
			"title":"社会形态是关于社会运动的具体形式、发展阶段和不同质态的范畴，是同生产力发展一定阶段相适应的经济基础与上层建筑的统一体。人类社会历史划分为原始社会、奴隶社会、封建社会、资本主义社会和共产主义社会(社会主义社会是其第一阶段)五种社会形态，其依据是",
			"answer":"D",
			"answerSheet":[
				{"value":'A',"name":"生产工具的质量和数量"},
				{"value":'B',"name":"统治集团的阶级和政治属性"},
				{"value":'C',"name":"经济基础特别是生产关系的性质"},
				{"value":'D',"name":"人们社会交往和分工的范围和水平"}
			],
			"answerDoubt":"MySQL是一个关系型数据库管理系统，属于后端开发的知识点",
			"summary":"坚持总体国家安全观，必须坚持国家利益至上，以人民安全为宗旨，以政治安全为根本，以经济安全为基础，以军事、科技、文化、社会安全为保障，以促进国际安全为依托，统筹外部安全和内部安全、国土安全和国民安全、传统安全和非传统安全、自身安全和共同安全，统筹维护国家安全和塑造国家安全。坚持总体国家安全观。归根到底是为了"
		},
		{
			"type":"2",
			"title":"以下那一项不属于作者的联系方式",
			"answer":["A","C","D"],
			"answerSheet":[
				{"value":'A',"name":"QQ：2395183536"},
				{"value":'B',"name":"邮箱：2395183536@qq.com"},
				{"value":'C',"name":"电话：1888888888"},
				{"value":'D',"name":"MySQL"}
			],
			"answerDoubt":"我的电话不是 18888888888",
			"summary":"坚持总体国家安全观，必须坚持国家利益至上，以人民安全为宗旨，以政治安全为根本，以经济安全为基础，以军事、科技、文化、社会安全为保障，以促进国际安全为依托，统筹外部安全和内部安全、国土安全和国民安全、传统安全和非传统安全、自身安全和共同安全，统筹维护国家安全和塑造国家安全。坚持总体国家安全观。归根到底是为了"
		},
		{
			"type":"2",
			"title":"以下那一项不属于作者的联系方式",
			"answer":["B","C"],
			"answerSheet":[
				{"value":'A',"name":"QQ：2395183536"},
				{"value":'B',"name":"邮箱：2395183536@qq.com"},
				{"value":'C',"name":"电话：1888888888"},
				{"value":'D',"name":"MySQL"}
			],
			"answerDoubt":"我的电话不是 18888888888"
		}
	]
};

let getDataList = function(){
	let list = [];
	let size = 5;
	// if(size<200){
	// 	size+=200;
	// }
	let dataList1 = dataList();
	for(let i=5;i<size;i++){
		dataList1.push({
			"type":"2",
			"title":`这是随机生成的第 ${i} 题，请您猜一猜答案。`,
			"answer":`${Math.random() > 0.5 ? 'A':'B'}`,
			"answerSheet":[
				{"value":'A',"name":"是"},
				{"value":'B',"name":"否"},
				{"value":'C',"name":"??"},
				{"value":'D',"name":"????"}
			],
			"answerDoubt":`这是随机生成的第 ${i} 题，题目解析内容。`,
		});
	}
	return new Promise((reslove)=>{
		reslove(dataList1)
	})
}

export default {
	getDataList
}
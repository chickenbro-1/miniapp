<template>
	<view class="page">
		<u-navbar title="真题训练" @rightClick="rightClick" :autoBack="true" bgColor="#F5F5F5"> </u-navbar>
		<view :style="{'margin-top':height+'px'}"> </view>
		<view style="padding: 30rpx 200rpx 0 200rpx">
			<u-subsection :list="mode" :current="curNow" mode="button" @change="sectionChange"></u-subsection>
		</view>
		<view class="box_0">
			<u-grid :border="false" col="2" >
			    <u-grid-item v-for="(listItem,listIndex) in list" :key="listIndex" @click="show = true,msg(listItem.paperName)">
			                <view class="box_1 flex-row justify-between">
								<view class="box_2"></view>
								<text class="grid-text">{{listItem.paperName}}</text>
								<view style="padding:15rpx 0 0 40rpx;">
									<u--image :src="accomplish" width="50rpx" height="50rpx" v-if="listItem.flag"></u--image>
									<u--image :src="unStudy" width="50rpx" height="50rpx" v-if="!listItem.flag"></u--image>
								</view>
							</view>
			            </u-grid-item>
			        </u-grid>
		</view>
		<u-modal :show="show" :title="title" :content='content' asyncClose="true" showCancelButton="true" buttonReverse="true" @confirm="confirm(name)" @cancel="cancel"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				unStudy:'/static/unStudy.png',
				accomplish:'/static/accomplish.png',
				//用户确定刷题模式 默认 1:刷题模式(每题做完显示当前题目答案与解析) 2.考试模式(33道真题做完后显示成绩,答案与解析)
				curNow:0,
				mode:["刷题模式","考试模式"],
				//试卷名称
				name:'',
				//提示进入考试
				show : false,
				//弹窗内容
				content : '',
				//弹窗标题
				title : '注意',
				//导航栏+状态栏高度获取
				height:getApp().globalData.statusBarHeight+getApp().globalData.navigationBarHeight,
				//真题列表
				list:[]
			};
		},
		onLoad() {
			this.list =  [
				{	//试卷名称
					paperName:"2023年真题",
					//试卷ID 举例
					paperId:1,
					//该试卷是否完成
					flag:false
				},
				{
					paperName:"2022年真题",
					paperId:2,
				},
				{
					paperName:"2021年真题",
					paperId:3
				},
				{
					paperName:"2020年真题",
					paperId:12
				},
				{
					paperName:"2019年真题",
					paperId:4
				},
				{
					paperName:"2018年真题",
					paperId:5
				},
				{
					paperName:"2017年真题",
					paperId:6
				},
				{
					paperName:"2016年真题",
					paperId:7
				},
				{
					paperName:"2015年真题",
					paperId:8
				},
				{
					paperName:"2014年真题",
					paperId:9
				},
				{
					paperName:"2013年真题",
					paperId:10
				},
				{
					paperName:"2012年真题",
					paperId:11
				}
				
				]
		},
		methods:{
			sectionChange(index){
				this.curNow = index;
				
			},
			confirm(name){
				uni.navigateTo({
					url: `/pages/answerSheet/index?name=${name}`
					
				})
				this.show = false
			},
			cancel(){
				this.show = false
				
			},
			msg(name){
				this.name = name
				this.content = name+'是否要进入考试?'
			}
		}
	}
</script>

<style lang="scss">
.page{
	position: relative;
	width: 100%;
	height: 1550rpx;
	overflow: hidden;
	background-color: #F5F5F5 ;
	.box_0{
		display: flex;
		padding: 0 40rpx 40rpx 40rpx;
		.box_1{
		display: flex;
		margin-top: 25rpx;
		padding: 30rpx 50rpx 30rpx 0rpx;
		background-color: #FFFFFF ;
		border-radius:35rpx;
		box-shadow: -1px 2px 2px 0px rgba(228, 228, 228, 1);
		.box_2{
			margin-right: 20rpx;
			background-color: rgba(103, 132, 232, 1);
			border-radius: 0px 3px 3px 0px;
			width: 10.869565217391305rpx;
			height: 75rpx;
		}
		.grid-text{
			
			padding: 20rpx 0 20rpx 0rpx;
			
			box-sizing: border-box;
		}
		}
		
	}
}
</style>

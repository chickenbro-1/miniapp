<template>
	<view class="page">
		<u-navbar title="真题训练" @rightClick="rightClick" :autoBack="true" bgColor="#F5F5F5"> </u-navbar>
		<view :style="{'margin-top':height+'px'}"> </view>
		<view class="box_0">
			<u-grid :border="false" col="2" >
			    <u-grid-item v-for="(listItem,listIndex) in list" :key="listIndex" @click="show = true,msg(listItem.year)">
			                <view class="box_1 flex-row justify-between">
								<view class="box_2"></view>
								<text class="grid-text">{{listItem.year}}</text>
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
				name:'',
				show : false,
				content : '',
				title : '注意',
				height:getApp().globalData.statusBarHeight+getApp().globalData.navigationBarHeight,
				list: [
					{
					year:"2023年真题"
				},
				{
					year:"2022年真题"
				},
				{
					year:"2021年真题"
				},
				{
					year:"2020年真题"
				},
				{
					year:"2019年真题"
				},
				{
					year:"2018年真题"
				},
				{
					year:"2017年真题"
				},
				{
					year:"2016年真题"
				},
				{
					year:"2015年真题"
				},
				{
					year:"2014年真题"
				},
				{
					year:"2013年真题"
				},
				{
					year:"2012年真题"
				}
				
				]
			};
		},
		methods:{
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
		padding: 30rpx 60rpx 30rpx 0rpx;
		background-color: #FFFFFF ;
		border-radius:35rpx;
		box-shadow: -1px 2px 2px 0px rgba(228, 228, 228, 1);
		.box_2{
			margin-right: 40rpx;
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

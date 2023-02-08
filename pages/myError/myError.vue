<template>
	<view class="page">
		 <u-navbar title="错题复习" @rightClick="rightClick" :autoBack="true" bgColor="#F5F5F5" > </u-navbar>
		 <view class="content" :style="{'margin-top':height+'px'}">
			  <u-tabs :list="queationBank" lineWidth="20" lineHeight="7" lineColor="#3E8BF8" :activeStyle="{ color: '#303133', fontWeight: 'bold', transform: 'scale(1.05)'}"
			      :inactiveStyle="{ color: '#606266', transform: 'scale(1)' }"
			      itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"></u-tabs>
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queationBank: [{
							name: '肖1000'
						}, {
							name: '优题库',
						}, {
							name: '腿姐',
						}, {
							name: '米鹏'
						}, {
							name: '王吉'
						}, {
							name: '杨亚娟'
						}],
				height:getApp().globalData.statusBarHeight+getApp().globalData.navigationBarHeight
			};
		},
		methods:{
			
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
	.content{

		
		// font-size: 29rpx;
		// font-family: Noto Sans SC;
	}
}
</style>

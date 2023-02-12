<template>
	
	<view class="page">
		<!-- 透明导航栏 -->
		<!-- <nav-bar type="transparent" :scrollTop="scrollTop" transparentFixedFontColor="#000" title="考试结算"></nav-bar> -->
		<u-navbar title="考试结算"  @rightClick="rightClick" :autoBack="true" bgColor="#F3F3FA" > </u-navbar>
		<view :style="{'margin-top':height+'px'}">
		<view class="process">
			<!-- <u--image  src="/static/success.png" width="400rpx" height="400rpx" ></u--image> -->
			<arprogress :percent="percent" bgColor="#F3F3FA">
				<view class="text-group">
					<text>正确率</text>
					<text style="padding-left: 15rpx;">{{percent}}%</text>
				</view>
			</arprogress>
		</view>
		<view class="box_0 flex-col">
			<u-divider text="答题卡"></u-divider>
			<u-grid :border="false" style="padding-bottom: 20rpx;">
				<u-grid-item v-for="(baseListItem,baseListIndex) in dataList" :key="baseListIndex" >
					<u-icon :customStyle="{paddingTop:20+'rpx'}" :name="judgeItems(baseListItem) ? 'checkmark': 'close'" :size="22" :color="judgeItems(baseListItem) ? '#4AEBCA': '#F33B3D'" ></u-icon>
					<text class="grid-text">{{baseListIndex + 1}}</text>
					
				</u-grid-item>
			</u-grid>
			
			
		</view>
			
			    
		</view>
	</view>
</template>


<script>
	import arprogress from '../../components/ar-circle-progress/index.vue'
	export default {
		components:{
					arprogress
		},
		onLoad() {
			let that = this;
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('data', function(data) {
				that.dataList = data["msg"]
				console.log(data["msg"])
			})
			let [success,error,total] = [0,0,0];
			this.dataList.forEach((item)=>{
				if(item.answerResult){
					if(this.$options.methods.judgeItems(item)){
						success++;
					}else{
						error++;
					}
				}
				total = success + error;
				
			})
			this.percent = Math.round(success / total * 10000) / 100
		},
		data() {
			return {
				percent:40,
				height: getApp().globalData.statusBarHeight + getApp().globalData.navigationBarHeight,
				dataList: [],
			};
		},
		methods:{
			//判断答题是否正确模块
			judgeItems(item){
				
				if(typeof(item.answerResult) == 'string'){
					return item.answerResult && (item.answer == item.answerResult);
				}else if(typeof(item.answerResult) == 'object'){
					if(item.answerResult.length != item.answer.length){
						return false;
					}else{
						var aR = Object.values(item.answerResult);
						var a = Object.values(item.answer);
						for(var i of a){
							console.log(aR.indexOf(i))
							if(aR.indexOf(i)== -1){
								return false;
							}
						}
						return true;
					}
				}
				
			},
			
		}

	}
</script>

<style lang="scss">
.page {
	position: relative;
	width: 100%;
	height: 1650rpx;
	overflow: hidden;
	background-color: #F3F3FA;
	// background-image: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.00) 0%, #F5F5F5 66%, #F5F5F5 100%), radial-gradient(circle at 0% 17%, rgba(212, 222, 251, 0.50) 0%, rgba(255, 255, 255, 0.50) 100%), radial-gradient(circle at 1e+02% 17%, #FDEFEF 0%, #FDEFEF 6%, #FFFEFE 100%);
	.process{
		display: flex;
		flex-direction: column;
		align-items: center;
		.text-group{
			display: flex;
			flex-direction: column;
		}
	}
	.box_0{
		margin: 30rpx;
		padding: 10rpx;
		box-shadow: -1px 2px 2px 0px rgba(228, 228, 228, 1);
		background-color: rgba(255, 255, 255, 1);
		border-radius: 16px;
	}
}
</style>

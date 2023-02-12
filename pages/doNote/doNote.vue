<template>
	<view class="page">
			<u-navbar title="记录笔记" @rightClick="rightClick" :autoBack="true" bgColor="#F5F5F5" > </u-navbar>
			<view :style="{'margin-top':height+'px'}">
				<view style="padding-top: 30rpx;">
					<u--textarea v-model="noteContent" placeholder="请输入您的笔记" height="200"  count></u--textarea>
					
				</view>
				<view style="padding: 20rpx 200rpx 0 200rpx;">
					<u-button type="primary" text="保存" shape="circle" @tap.stop="savingNote(noteContent)"></u-button>
				</view>
			</view>
		</view>
	
</template>

<script>
	export default {
		onLoad() {
			let that = this;
			const eventChannel = this.getOpenerEventChannel();
			    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			    eventChannel.on('acceptDataFromOpenerPage', function(data) {
					
			        //对发送过来的数据进行处理
			      that.noteContent = data["msg"];
			    })
			
		},
		data() {
			return {
				noteContent:'',
				height:getApp().globalData.statusBarHeight+getApp().globalData.navigationBarHeight,
			};
		},
		methods:{
			savingNote(noteContent){
				
				var msg = noteContent + '';
				const eventChannel = this.getOpenerEventChannel();
				eventChannel.emit('someEvent', {note: msg});
				uni.navigateBack({
					url:'/pages/answerSheet/index'
				})
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
}
</style>

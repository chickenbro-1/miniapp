<template>
	<view class="page flex-col">
		
		<view class="box_0"></view>
		<view :style="{'height':'48px'}"></view>
		<nav-bar type="transparent" :scrollTop="scrollTop" transparentFixedFontColor="#000" title=" "></nav-bar>
		<view class="group_1 flex-col">
			<view class="box_2 flex-row justify-between">
				<view class="image-text_1 flex-row justify-between">
					<image class="icon_1" referrerpolicy="no-referrer"
						src="/static/lanhu_shouye/SketchPng957ae0e272023bd64c80f7beba0098f348a7756f088297dae413c2d7af273aeb.png" />
					<text class="text-group_1">{{golden_bill}}</text>
					<u-icon name="arrow-right"></u-icon>
				</view>
				<button class="button_1 flex-col" @click="beVip">
					<view class="box_3 flex-row">
						<view class="image-text_2 flex-row justify-between">
							<image class="icon_2" referrerpolicy="no-referrer"
								src="/static/lanhu_shouye/SketchPng4d53e781cbee6bb0ba408fe1013c70baf6cbb53eb1a685567cef739494058092.png" />
							<text class="text-group_2">解锁会员</text>
						</view>
					</view>
				</button>
				<view class="image-text_3 flex-row justify-between">
					<!-- 默认灰色头像 -->
					<image class="single-avatar_1" referrerpolicy="no-referrer" src="/static/lanhu_shouye/0.png"
						@click="authLogin">
					</image>
					<view class="group_2 flex-col">
						<!-- 昵称 -->
						<text class="text-group_3 overflow-ellipsis">{{nickname}}</text>
					</view>
				</view>
			</view>
			<view class="box_4 flex-col">
				<text class="text_3">{{onlineUserCount}}人正在刷题</text>
				<view class="text-wrapper_1 flex-row">
					<text class="text_4">{{countDownDay}}</text>
					<text class="text_5">天</text>
					<text class="text_6">{{accuracy}}</text>
					<text class="text_7">%</text>
					<text class="text_8">{{dayOfPersistence}}</text>
					<text class="text_9">天</text>
				</view>
				<view class="text-wrapper_2 flex-row justify-between">
					<text class="text_10">倒计时</text>
					<text class="text_11">正确率</text>
					<text class="text_12">坚持天数</text>
				</view>
			</view>
			
			<view class="box_5">
				<u-swiper :list="swiper_list" previousMargin="20" nextMargin="20" circular radius="20" bgColor="#F5F5F7">
				</u-swiper>
			
			</view>
			<view class="box_6 flex-col">
				<view class="text-group_6 flex-row">
					<view class="text-group_8 flex-col" @click="myError">
						<image class="icon_7" src="../../static/lanhu_shouye/error.png"></image>
						<rich-text class="text_13">我的错题</rich-text>
					</view>
					<view class="text-group_8 flex-col" @click="myCollection">
						<image class="icon_7" src="../../static/lanhu_shouye/collect.png"></image>
						<rich-text class="text_13">我的收藏</rich-text>
					</view>
					<view class="text-group_8 flex-col" @click="myNotes">
						<image class="icon_7" src="../../static/lanhu_shouye/notes.png"></image>
						<rich-text class="text_13">我的笔记</rich-text>
					</view>
				</view>
			</view>
			
			<view class="grid_1 flex-row">
				<view class="list-items_1 flex-col" v-for="(item, index) in loopData0" :key="index" @click="goPages(item.goPagesUrl)">
					  <view class="tag_1 flex-col">
						<text class="text_15">NEW</text>
					  </view>
				          <view class="image-text_7 flex-row justify-between">
				            <image class="label_3" referrerpolicy="no-referrer" :src="item.lanhuimage0" />
				            <view class="text-group_7 flex-col">
				              <text class="text_16">{{item.lanhutext0}}</text>
				              <text class="text_17">{{item.lanhutext1}}</text>
				            </view>
				          </view>
				        </view>
			</view>
		</view>
		<view class="auth_wrap" :class="isAuth?'show':''">
			<view class="mask"></view>
			<view class="auth_content">
				<view class="auth_top">
					<view class="ptitle">获取您的昵称、头像、手机号</view>
					<view class="txt">获取用户头像、昵称、手机号信息，主要用于完善个人资料，向用户提供更好使用体验</view>
					<view class="close" @tap="closePopup">
						<image src="/static/login/close_x.png" mode=""></image>
					</view>
				</view>
				<view class="auth_ul">
					<view class="auth_li">
						<view class="tit">头像</view>
						<view class="rit">
							<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
								<image class="avatar" :src="avatarUrl"></image>
							</button>
						</view>
					</view>
					<view class="auth_li">
						<view class="tit">昵称</view>
						<view class="rit">
							<input type="nickname" class="weui-input" placeholder="请输入昵称" @blur="onNickname" />
						</view>
					</view>
				</view>
				<view class="confirm_btn" @tap.stop="WxgetUserProfile">保存</view>
			</view>
		</view>
	</view>
</template>
<script>
	import { pathToBase64 } from '@/pages/common/image.js' //引入图片转base64js
	import navBar from "@/uni_modules/zhouWei-navBar/components/zhouWei-navBar/zhouWei-navBar.vue";
	export default {
		components: {
			navBar
		},
		data() {
			return {
				effect3dSwitch:true,
				onlineUserCount :42,
				countDownDay:'000',
				accuracy : 90,
				dayOfPersistence : 333,
				// 授权,控制授权弹框显示与隐藏
				isAuth: false, 
				avatarUrl: '', //头像
				nickname: '微信用户oxr', //昵称
				isFrist: '', //判断是否是第一次授权
				
				golden_bill: 99999, //金币最大99999
				loopData0: [{
						lanhuimage0: '/static/lanhu_shouye/1.png',
						lanhutext0: '真题训练',
						lanhutext1:'123人正在刷题',
						goPagesUrl: 'pages/pastExam/pastExam'
					},
					{
						lanhuimage0: '/static/lanhu_shouye/2.png',
						lanhutext0: '强化题目',
						lanhutext1:'324人正在刷题',
						goPagesUrl: ''
					},
					{
						lanhuimage0: '/static/lanhu_shouye/3.png',
						lanhutext0: '考点背诵',
						lanhutext1:'2341人正在刷题',
						goPagesUrl: ''
					},
					{
						lanhuimage0: '/static/lanhu_shouye/4.png',
						lanhutext0: '精选错题',
						lanhutext1:'5432人正在刷题',
						goPagesUrl: ''
					},
					{
						lanhuimage0: '/static/lanhu_shouye/5.png',
						lanhutext0: '冲刺模拟',
						lanhutext1:'2341人正在刷题',
						goPagesUrl: ''
					},
					{
						lanhuimage0: '/static/lanhu_shouye/6.png',
						lanhutext0: '时政刷题',
						lanhutext1:'8654人正在刷题',
						goPagesUrl: ''
					}
				],
				swiper_list:[
					'/static/lanhu_shouye/swiper01.png',
					'/static/lanhu_shouye/swiper02.png',
					'/static/lanhu_shouye/swiper03.png',
					'/static/lanhu_shouye/swiper04.png',
					
				],
				constants: {}
			};
		},
		// onload有问题 待解决!!
		onLoad(){
			
			//用于判断是否是首次授权，有值说明不是首次授权，没有值说明是首次授权
			let AlertLogin = uni.getStorageSync('AlertLogin');
			if (AlertLogin) {
				console.log('登录过一次')
				this.isFrist = 2
			} else {
				console.log('未登陆过');
				this.isFrist = 1
			}
		},
		onReady() {
			//计算倒计时
			this.countDownDay = this.computedTime("2023/12/23,23:59:59").toString();
		},

		methods: {
			// 跳转刷题页面
			goPages(URL){
				var a = URL
				uni.$u.route(a);
				
				
			},
			myError(){
				uni.navigateTo({
					url:'/pages/myError/myError'
				})
			},
			myCollection(){
				console.log(22)
				uni.navigateTo({
					url:'/pages/myCollection/myCollection'
				})
			},
			myNotes(){
				uni.navigateTo({
					url:'/pages/myNotes/myNotes'
				})
			},
			beVip() {
				console.log(1)
				
			},
			computedTime(params) {
				let futureT=new Date(params);    //开始时间
				let nowT=new Date();    //结束时间
				let mistime=futureT.getTime()-nowT.getTime(); //时间差秒
				//计算出相差天数
				let days=Math.floor(mistime/(24*3600*1000));
				//计算出小时数
				let leave1=mistime%(24*3600*1000); //计算天数后剩余的毫秒数
				let hours=Math.floor(leave1/(3600*1000));
				//计算相差分钟数
				let leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
				let minutes=Math.floor(leave2/(60*1000));
				//计算相差秒数
				let leave3=leave2%(60*1000) ;     //计算分钟数后剩余的毫秒数
				let seconds=Math.round(leave3/1000);
				if(days <= 99 && days > 9){
					var dayString = '0'+days.toString();
				}else if(days <= 9){
					var dayString = '00'+days.toString();
				}else if(days>99){
					var dayString = days.toString();
				}
				return dayString;
			},

			authLogin() {
				//首次授权，出现授权弹框，以后退出后再登录则直接登录上去，不再出现授权弹框
				if (this.isFrist == 1) {
					this.isAuth = true;
				} else {
					this.isAuth = false;
					this.WxgetUserProfile();
				}
			},
			//关闭授权弹框
			closePopup() {
				this.isAuth = false;
			},
			//监听昵称变化
			onNickname(e) {
				this.nickname = e.detail.value;
			},
			//获取头像变化的值
			onChooseAvatar(e) {
				let _this = this;
				//将微信返的临时图片转为base64格式图
				pathToBase64(e.detail.avatarUrl).then(base64 => {
					console.log(base64)
					this.avatarUrl = base64;
				}).catch(error => {
					console.error(error)
				})
			},
			//微信登录接口
			WxgetUserProfile() {
				let _this = this;
				if (this.isFrist == 1) {
					// 授权授权时提示输入昵称
					if (!this.nickname) {
						this.$message.info('请输入昵称');
						return
					}
				}
				uni.showLoading({
					title: '登录中...'
				});
				let code = '';
				
				uni.getUserProfile({
					desc: '用于完善会员资料',
					success: infoRes => {
						//请求后台授权登录接口
						//自己的代码逻辑
					},
					fail: err => {
						uni.hideLoading();
					}
				})
			}


		},

	};
</script>
<style lang='scss'>
	@import '../common/common.scss';
	@import './assets/style/index.rpx.scss';
</style>

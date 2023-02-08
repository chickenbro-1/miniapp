<template>
	<view class="page">
		<view class="">
			<view class="header">
				<image src="/static/logo.png"></image>
			</view>
			<button class="bottom" @click="authLogin">
				<image class="" src="/static/login/weixin.png" mode="aspectFit">
				</image>
				微信授权登录
			</button>
		</view>
		<!-- //授权弹框 -->
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
	import {
		pathToBase64
	} from '@/pages/common/image.js' //引入图片转base64js
	export default {
		data() {
			return {
				isAuth: false, //控制授权弹框显示与隐藏
				avatarUrl: '', //头像
				nickname: '', //昵称
				isFrist: '', //判断是否是第一次授权
			};
		},
		onLoad() {
			//用于判断是否是首次授权，有值说明不是首次授权，没有值说明是首次授权
			let AlertLogin = uni.getStorageSync('AlertLogin');
			if (AlertLogin) {
				console.log('登录过一次')
				this.isFrist = 2
			} else {
				console.log('首次登录');
				this.isFrist = 1
			}
		},
		methods: {
			authLogin() {
				//首次授权，出现授权弹框，以后退出后再登录则直接登录上去，不再出现授权弹框
				if (this.isFrist == 1) {
					this.isAuth = true;
				} else {
					this.isAuth = false;
					this.wxGetUserProfile();
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
				wx.login({
					success: res => {
						console.log(res, 'resccccc')
						code = res.code;
					}
				})
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
		}
	};
</script>

<style lang="scss" scoped>
	page,
	body,
	.page {
		min-height: 100vh;
		background: #fff;
	}

	//授权弹框 start
	.auth_wrap {
		position: fixed;
		width: 100%;
		bottom: -120%;
		transition: all 0.35s linear;

		&.show {
			bottom: 0;
			transition: all 0.35s linear;

			.mask {
				display: block;
			}
		}

		.mask {
			width: 100%;
			height: 100vh;
			position: fixed;
			background: rgba(0, 0, 0, 0.5);
			z-index: 98;
			top: 0;
			display: none;
		}

		.auth_content {
			padding: 32rpx 32rpx 72rpx 32rpx;
			position: relative;
			z-index: 99;
			background: #fff;
			border-radius: 16rpx 16rpx 0 0;

			.auth_top {
				position: relative;

				.ptitle {
					font-size: 30rpx;
					font-weight: bold;
					margin-bottom: 24rpx;
				}

				.txt {
					font-size: 26rpx;
					color: #999;
				}

				.close {
					width: 26rpx;
					height: 26rpx;
					position: absolute;
					right: 0;
					top: 0;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.auth_ul {
				margin-top: 16rpx;

				.auth_li {
					display: flex;
					align-items: center;
					border-top: solid 1px #f5f5f5;
					padding: 24rpx 0;

					&:last-child {
						border-bottom: solid 1px #f5f5f5;
					}

					.tit {
						width: 140rpx;
						font-size: 30rpx;
					}

					.rit {
						width: calc(100% - 140rpx);

						input {
							font-size: 28rpx;
							height: 72rpx;
							width: 100%;
						}

						image {
							width: 54rpx;
							height: 54rpx;
							border-radius: 50%;
						}

						button {
							width: 100%;
							height: 72rpx;
							background: #fff;
							text-align: left;
							padding: 0;

							&:after {
								border: solid 1px #fff;
							}

							// opacity: 0;
						}
					}
				}
			}

			.confirm_btn {
				width: 420rpx;
				margin: 46rpx auto 0 auto;
				background: #39b54a;
				color: #fff;
				border-radius: 8rpx;
				height: 94rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 30rpx;
			}
		}
	}

	//授权弹框 end

	.header {
		height: 400rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		image {
			width: 200rpx;
			height: 200rpx;
		}
	}

	.bottom {
		background: #fff;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #39b54a;
		width: calc(100% - 64rpx);
		margin: 0 32rpx;
		border: solid 1px #39b54a;
		border-radius: 40rpx;

		image {
			width: 54rpx;
			height: 54rpx;
			margin-right: 16rpx;
		}
	}
</style>

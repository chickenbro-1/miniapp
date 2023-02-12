<template>
	<view class="container flex-row">	
		<u-navbar :title="paperName" @rightClick="rightClick" :autoBack="true" bgColor="#F5F5F5"> </u-navbar>
		<view class="box_0" :style="{'margin-top':height+'px'}">
			<u-line-progress :percentage="percentageRate" activeColor="#E8A400"></u-line-progress>
		</view>
		<view class="text-group h-flex-x" @tap="showPopup = !showPopup" :style="{'margin-top':height+'px'}">
			
				<text style="padding-right: 20rpx;">{{countResult.total}}/{{dataList.length}}题</text>
				<u-icon name="grid" size="24" ></u-icon>
			
		</view>
		<!-- 题目轮播图 -->
		<view class="swiper-box" :style="{'margin-top':height+'px'}">
			<swiper class="swiper"
				:duration="duration" 
				:current="swiperIndex" 
				:disable-programmatic-animation="true"
				 @change="onChange" 
				 @animationfinish="onAnimationfinish"
			>
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<scroll-view scroll-y="true" class="swiper-scroll">
						<view class="swiper-item" @touchstart="clearAutoNextTopicTime">
							<view class="topic-content">
								<view>
									<text style="padding-right: 20rpx;">
										<text class="type-label">
											{{item.type | topicType}}
										</text>
									</text>
									<text >{{item.title}}</text>
								</view>
								<view class="answer-sheet" >
									<!-- 用户选择选项 -->
									<view class="item_1 h-flex-x" 
										v-show="item.answerResult == undefined"
										v-for="(sheetItem,sheetIndex) in item.answerSheet" :key="sheetIndex"
										@tap.stop="onSelected(item.type,sheetItem,sheetIndex)"
										:class="{'active':currentIndex.indexOf(sheetIndex) != -1}"
										>
										
										<view style="padding-right: 10rpx;">{{sheetItem.value}}</view>
										<view style="padding-bottom: 5rpx;" >{{sheetItem.name}}</view>
									</view>
									 <!-- 用户提交答案后显示答案 -->
									<view class="item_2 h-flex-x"
										v-show="item.answerResult != undefined"
										v-for="(sheetItem,sheetIndex) in item.answerSheet" :key="sheetIndex"
										:class="{
											'success': success(item,sheetItem) ,
											'error':error(item,sheetItem),
											'errorUnselected':errorUnselected(item,sheetItem),
										}"
										>
									
										<view style="padding-right: 10rpx;">{{sheetItem.value}}</view>
										<view style="padding-bottom: 5rpx;" >{{sheetItem.name}}</view>
										<view v-if="success(item,sheetItem)">
											<u-icon name="checkmark-circle-fill" color="#58BF81" size="20"></u-icon>
										</view>
										<view v-if="error(item,sheetItem)">
											<u-icon name="checkmark-circle-fill" color="#F30109" size="20"></u-icon>
										</view>
									</view> 
									<view style="padding: 20rpx;">
										<u-button shape="circle" type="primary" text="确定" @click="onAnswerSheet(item.type,currentIndex)" :disabled="item.answerResult != undefined"></u-button>
									</view>
									
									<u-notify message="请选择选项" :show="notify"></u-notify>
								</view>
								<view class="answer-result" v-if="item.answerResult">
									<view class="answer-msg" style="h-flex-x">
										<view style="width: 450rpx;">
											<text>答案</text>
											<text style="color: #0089ff;font-weight: bold;padding: 0 20rpx;">{{item.answer}}</text>
										</view>
										<view style="width: 250rpx">
											<text style="padding-right: 20rpx;">您选择</text>
											<text style="color: #59BF82;font-weight: bold;" v-if="item.answerResult == item.answer">{{item.answerResult}}</text>
											<text style="color: #f84d27;font-weight: bold;" v-else>{{item.answerResult}}</text>
										</view>
									</view>
									<u-subsection :list="list" :current="curNow" mode="button" @change="sectionChange" ></u-subsection>
									<view v-if="curNow==0" style="padding-top: 20rpx;">
										<!-- 题目解析 -->
										<text>{{item.answerDoubt}}</text>
										<text>问题反馈</text>
									</view>
									<view v-if="curNow==1" style="padding-top: 20rpx;">
										<!-- 精选总结-->
										<text>{{item.summary}}</text>
									</view>
									<view v-if="curNow==2" style="padding-top: 20rpx;" @click="doNote()">
										<!-- 发表笔记-->
										<view style="display: flex;padding-left: 200rpx;padding-top: 15rpx;" v-if="item.myNote == undefined || item.myNote == null || item.myNote == ''">
											<u--image fade="false" src="/static/publicationNote.png" width="30rpx" height="30rpx"></u--image>
											<text style="padding-left:20rpx;">点击我发表笔记</text>
										</view>
										<view v-else-if="item.myNote != undefined || item.myNote != null || item.myNote != ''">
											<view style="padding-top: 15rpx;">
												<view>
													{{item.myNote}}
												</view>
												<view style="display: flex;padding-top: 20rpx;" @tap.stop="editorNote(item.myNote)">
													<view style="display: flex;padding-right: 50rpx;width: 200rpx;padding-left: 130rpx;">
														<u--image fade="false" src="/static/publicationNote.png" width="30rpx" height="30rpx" ></u--image>
														<text style="padding-left: 15rpx;">编辑</text>
													</view>
													<view style="display: flex;" @tap.stop="deleteNote">
														<u--image fade="false" src="/static/delete.png" width="30rpx" height="30rpx"></u--image>
														<text style="padding-left: 15rpx;">删除</text>
													</view>
													
												</view>
											</view>
										</view>
										
										
									</view>
								</view>
								
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 底部面板 -->
		<view class="panel-bottom">
			<view class="shade" v-if="showPopup" @tap="showPopup = !showPopup"></view>
			<view class="content">
				<view class="action-bar h-flex-x">
					 
					<view @tap="addFavorite">
						<view class="h-flex-x" v-if="isFavorite">
							<uni-icons type="star-filled" size="18" color="#f2ce1b"></uni-icons>
							<text style="padding-left: 10rpx;">已收藏</text>
						</view>
						<view class="h-flex-x" v-else>
							<uni-icons type="star" size="18" color="#666"></uni-icons>
							<text style="padding-left: 10rpx;">收藏</text>
						</view>
					</view>
					<view style="padding-left: 150rpx;padding-right: 150rpx;">
						<u-button v-if="fillOut" text="提交试卷" color="#0AB99C" @click="settlement(dataList)"></u-button>
					</view>
					<view class="h-flex-x" @tap="showPopup = !showPopup" style="">
						<uni-icons type="bars" size="18" color="#666"></uni-icons>
						<text style="padding-left: 10rpx;font-weight: bold;">{{topicIndex+1}}</text>
						<text style="color: #999;padding: 0 5rpx;">/</text>
						<text style="color: #999;">{{dataList.length}}</text>
					</view>
				</view>
				<scroll-view class="topic-list" v-if="showPopup" style="height: 700rpx;" scroll-y="">
					<view class="list-box h-flex-x h-flex-wrap h-flex-6">
						<view class="list-item"
							v-for="(item,index) in dataList" :key="index" 
							@tap="pickerTopic(index)"
						>
							<view class="h-flex-x h-flex-center"
								:class="{
									'active':index == topicIndex,
									'success':item.answerResult && judgeItems(item),
									'error':item.answerResult && (!judgeItems(item)),
								}"
							>{{index+1}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		
		<!-- <view class="showTotal" v-if="fillOut">
		            <view class="show">
		                <image src="/static/logo.png" mode="widthFix" class="show-image"></image>
		                <view class="show-button" @click="fillOut = false">
		                    立即填写
		                </view>
		            </view>
		            <view class="over"></view>
		</view> -->
	</view>
</template>

<script>
	import uniIcons  from '@/uni_modules/uni-icons/components/uni-icons/uni-icons';
	import getDataList from './optimized-swiper-data.js'
	export default {
		components: {uniIcons},
		data() {
			return {
				questionId:0,//当前题目id
				curNow:0,
				list:['题目解析','精选总结','我的笔记'],
				notify:false,//弹窗提示用户选择选项
				answerIndex:[0,0,0,0],//答案列表
				currentIndex:[],//当前选择的选项
				fillOut:false,//交卷弹窗
				percentageRate:'0.00', //进度百分比
				paperName:'', // 试卷名称
				countNumber:0, //答题总数
				dataList:[],	// 数据源
				swiperList:[],	// 轮播图数据列表
				swiperIndex:0,	// 轮播图当前位置
				isChange:false,	// 是否切换
				topicIndex:0,	// 题目位置
				duration:200,	// 动画过渡时长
				showPopup:false,//弹窗是否显示
				height:getApp().globalData.statusBarHeight+getApp().globalData.navigationBarHeight,
			}
		},
		computed:{
			// 结果统计
			countResult(){
				let [success,error,total] = [0,0,0];
				this.dataList.forEach((item)=>{
					if(item.answerResult){
						if(item.answerResult == item.answer){
							success++;
						}else{
							error++;
						}
					}
					total = success + error;
					this.countNumber = total;
				})
				return {
					success,
					error,
					total
				}
			},
			// 是否收藏
			isFavorite(){
				let item = this.dataList[this.topicIndex];
				if(item && item.favorite){
					return true;
				}
				return false;
			}
		},
		filters:{
			topicType(type){
				if(type == 1){
					return '单选题';
				}
				if(type == 2){
					return '多选题';
				}
				return ''
			}
		},
		onLoad(option){
			this.paperName = option.name;

			getDataList.getDataList().then(res=>{
				this.dataList = res;
				this.renderSwiper(0);
			})
		},
		methods: {
			//判断题目是否
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
			//跳转结算页面
			settlement(dataList){
				
				
				uni.navigateTo({
					url:'/pages/settlement/settlement',
					success: function(res) {
					  res.eventChannel.emit('data', { msg:dataList})
					}
				})
			},
			deleteNote(){
				this.$set(this.dataList[this.topicIndex],"myNote",'');
			},
			editorNote(myNote){
				let that = this;
				uni.navigateTo({
				  url: '/pages/doNote/doNote',
				  events: {
					someEvent: function(data) {
						console.log(data["note"])
						that.$set(that.dataList[that.topicIndex],"myNote",data["note"]);
				    }
				  },
				  success: function(res) {
				    res.eventChannel.emit('acceptDataFromOpenerPage', { msg:myNote})
				  }
				})
			},
			doNote(){
				let that = this;
				uni.navigateTo({
				  url: '/pages/doNote/doNote',
				  events: { 
				    someEvent: function(data) {
						console.log(data["note"])
						that.$set(that.dataList[that.topicIndex],"myNote",data["note"]);
				    }
				  },
				  // 发送通信方法
				  success: function(res) {
				    // 通过eventChannel向被打开页面传送数据
				    // 其中含有两个参数，第一个是接收的函数名，第二个则是需要携带的参数
					
				    // res.eventChannel.emit('acceptDataFromOpenerPage', { data:})
				  }
				})
				
				
			},
			sectionChange(index){
				this.curNow = index;
			},
			// 选择选项 未提交
			onSelected(type,item,index){
				//单选题
				if(type == 1){
					this.currentIndex = [];
					if(this.currentIndex.indexOf(index)== -1){
						this.currentIndex.push(index);
					}
				}
				//多选题
				if(type == 2){
					if(this.currentIndex.indexOf(index)== -1){
						this.currentIndex.push(index);
					}else{
						this.currentIndex.splice(this.currentIndex.indexOf(index),1)
					}
				}	
			},
			// 渲染 swiper
			renderSwiper(index){
				let list = [];
				let current = 1;
				if(this.dataList[index-1]){
					list.push(this.dataList[index-1]);
				}else{
					current = 0;
				}
				
				list.push(this.dataList[index])
				
				if(this.dataList[index+1]){
					list.push(this.dataList[index+1]);
				}
				
				this.duration = 0;
				
				setTimeout(()=>{
					this.swiperList = list;
					this.swiperIndex = current;
					
					setTimeout(()=>{
						this.duration = 200;
					},100)
				},50)
			},
			// 轮播图切换
			onChange(e){
				
				// 非触摸事件不做轮播图状态更新
				if(e.detail.source != "touch")return;
				
				// 标识已切换
				this.isChange = true;
				// 轮播图当前位置大于原来时则表示为下一题
				if(e.detail.current > this.swiperIndex){
					this.topicIndex++;
				}else{
					// 轮播图当前位置小于原来时则表示为上一题
					this.topicIndex--;
				}
				// 更新轮播图位置数值，为更新时让 Vue 能监听到数据有改变
				this.swiperIndex = e.detail.current;
				//换页后设置已选选项为空 
				this.currentIndex=[];
				this.answerIndex=[];
				
			},
			// 轮播图动画结束
			onAnimationfinish(e){
				if(!this.isChange)return;
				
				this.isChange = false;
				setTimeout(()=>{
					this.renderSwiper(this.topicIndex);
				},10);
				
			},
			// 选择题目
			pickerTopic(index){
				this.topicIndex = index;
				this.renderSwiper(index);
				this.showPopup = false;
				
			},
			// 监听答题
			onAnswerSheet(type,index){
				this.questionId = this.swiperList[this.swiperIndex].questionId
				
				if(index.length == 0){
					this.$u.toast('请选择选项!');
					return;
				}
				if(this.swiperList[this.swiperIndex].answerResult){
					// 不能重复答题
					return;
				}
				if(type == 1){
					// 当前已选答案
					let seelctedValue = this.swiperList[this.swiperIndex].answerSheet[index].value;
					this.$set(this.swiperList[this.swiperIndex],"answerResult",seelctedValue);
				}else if(type == 2){
					var seelctedValue = [];
					for(const i of index){
						seelctedValue.push(this.swiperList[this.swiperIndex].answerSheet[i].value);
					}
					this.$set(this.swiperList[this.swiperIndex],"answerResult",seelctedValue);
					
					
				}
				//计算百分比
				this.percentageRate = Math.round((this.countNumber + 1 ) / this.dataList.length * 10000) / 100;
				//最后一题弹出提交按钮
				if((this.countNumber + 1 ) == this.dataList.length ){
					this.fillOut = true;
				}
			},
			// 清除自动跳到下一页延时器
			clearAutoNextTopicTime(){
				clearTimeout(this.autoNextTopicTime);
			},
			// 添加收藏
			addFavorite(){
				let favorite = this.dataList[this.topicIndex].favorite;
				this.$set(this.dataList[this.topicIndex],"favorite",!favorite);
			},
			success(item,sheetItem){

				// 单选题
				if(item.type == 1){
					if(item.answer == sheetItem.value){
						return true;
					}
				// 多选题 
				}else if(item.type == 2){
					// console.log(typeof(sheetItem.value));
					if(item.answerResult != undefined){
						for(var i of item.answer){
							if((i == sheetItem.value)&&(item.answerResult.indexOf(i) != -1)){
								return true;
							}
						}
					}	
				}
			},
			error(item,sheetItem){
				//单选题
				if(item.type == 1){
					if((item.answerResult == sheetItem.value) && (item.answer != sheetItem.value)){
						return true;
					}
				// 多选题 
				}else if(item.type == 2){
					
					if(item.answerResult != undefined){
						for(var i of item.answerResult){
							
							if((item.answer.indexOf(i) == -1) &&(sheetItem.value == i)){
								return true;
						}
					}
				}
				}
			},
			errorUnselected(item,sheetItem){
				//单选题
				if(item.type == 1){
					return false;
				// 多选题 
				}else if(item.type == 2){
					if(item.answerResult != undefined){
						for(var i of item.answer){
							
							if((item.answerResult.indexOf(i) == -1) &&(sheetItem.value == i)){
								return true;
						}
					}
				}
				}
				
			}
			
		}
	}
</script>

<style lang="scss">
@import "@/lib/flex.scss";
@import './assets/style/index.rpx.scss';


</style>
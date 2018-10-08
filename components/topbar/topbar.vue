<template>
	<view class="index">
		<scroll-view id="tab-bar" class="swiper-tab" scroll-x :scroll-left="scrollLeft">
			<block v-for="(tab,index) in tabs" :key="tab.id">
				<view :class="['swiper-tab-list',currentTab==index ? 'on' : '']" :id="tab.id" :data-current="index" @tap="swichNav">{{tab.name}}</view>
			</block>
		</scroll-view>
		<swiper :current="currentTab" class="swiper-box" duration="300" @change="bindChange">
			<block v-for="(item,index1) in tabs" :key="index1">
				<swiper-item>
					<scroll-view class="index-bd" scroll-y>
						<custom-list :bannerUrl="item.bannerUrl" :listUrl="item.listUrl"></custom-list>
					</scroll-view>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isClickChange: false
			}
		},
		props: ['currentTab', 'tabs'],
		methods: {
			bindChange: async function(e) {
					let index = e.target.current;
					if (this.isClickChange) {
						this.currentTab = index;
						this.isClickChange = false;
						return;
					}
					let tabBar = await this.getWidth("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft;

					let width = 0;

					for (let i = 0; i < index; i++) {
						let result = await this.getWidth(this.tabs[i].id);
						width += result.width;
					}

					let winWidth = uni.getSystemInfoSync().windowWidth,
						nowElement = await this.getWidth(this.tabs[index].id),
						nowWidth = nowElement.width;

					if (width + nowWidth - tabBarScrollLeft > winWidth) {
						this.scrollLeft = width + nowWidth - winWidth;
					}
					if (width < tabBarScrollLeft) {
						this.scrollLeft = width;
					}
					this.isClickChange = false;
					this.currentTab = index; //一旦访问data就会出问题
				},
				getWidth: function(id) { //得到元素的宽高
					return new Promise((res, rej) => {
						uni.createSelectorQuery().select("#" + id).fields({
							size: true,
							scrollOffset: true
						}, (data) => {
							if (id === 'tab-bar') {
								console.log("id=", id, "数据:", data)
							}
							res(data);
						}).exec();
					})
				},
				swichNav: async function(e) { //点击tab-bar
					if (this.currentTab === e.target.dataset.current) {
						return false;
					} else {
						let tabBar = await this.getWidth("tab-bar"),
							tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
						this.scrollLeft = tabBarScrollLeft;
						this.isClickChange = true;
						this.currentTab = e.target.dataset.current
					}
				}
		}
	}
</script>

<style>
	page {
		display: flex;
	}

	.index {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
		width: 100%;
	}

	.index-bd {
		width: 750upx;
		height: 100%;
	}

	.swiper-tab {
		width: 100%;
		white-space: nowrap;
		line-height: 64upx;
		height: 64upx;
	}


	.swiper-tab-list {
		font-size: 30upx;
		width: 150upx;
		display: inline-block;
		text-align: center;
		color: #777777;
	}

	.on {
		color: #FF0000;
		border-bottom: 5upx solid #FF0000;
	}

	.swiper-box {
		flex: 1;
		width: 100%;
	}

	.swiper-box view {
		text-align: center;
	}
</style>

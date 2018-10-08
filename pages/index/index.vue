<template>
	<view class="container">
		<view class="uni-flex uni-row header">
			<image src="../../static/sm.png" @tap="scanCode"></image>
			<view class="center">
				<input class="uni-input" type="text" confirm-type="search" :placeholder="keywords" />
			</view>
			<image src="../../static/search.png"></image>
		</view>
		<top-bar :currentTab="currentTab" :tabs="tabs"></top-bar>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'test',
				currentTab: 0,
				keywords: '中国新说唱',
				tabs: [{
					name: '关注',
					id: 'guanzhu',
					bannerUrl: 'http://10.103.11.70:8080/longzhu/banner',
					listUrl: 'http://10.103.11.70:8080/longzhu/news'
				}, {
					name: '推荐',
					id: 'tuijian',
					bannerUrl: 'http://10.103.11.70:8080/meinv/banner',
					listUrl: 'http://10.103.11.70:8080/meinv/news'
				}]
			}
		},
		methods: {
			scanCode: function() {
				var that = this
				uni.scanCode({
					success: function(res) {
						that.result = res.result
					},
					fail: function(res) {}
				})
			},
			search: function() {

			}
		}
	}
</script>

<style>
	.header {
		height: 90upx;
		margin-top: 20upx;
	}

	.header image {
		height: 70upx;
		width: 70upx;
	}

	.header .center {
		flex: 1;
		height: 90upx;
		margin: 0 10upx !important;
	}

	.center input {
		background-color: #FFFFFF;
		border-radius: 10upx;
	}
</style>

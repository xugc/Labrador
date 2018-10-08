<template>
	<view class="container">
		<view class="login-view">
			<image src="../../static/login.png" @tap="bindLogin"></image>{{userName}}
		</view>
		<view class="uni-card">
			<view class="uni-list">
				<view class="uni-list-cell" v-for="(item,index) in menuList" :key="index">
					<view class="uni-list-cell-navigate uni-navigate-right">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: '未登录',
				menuList: [{
					name: '消息通知'
				}, {
					name: '系统设置'
				}]
			}
		},
		methods: {
			bindLogin: function() {
				uni.navigateTo({
					url: '../login/login'
				});
			}
		}
	}
</script>

<style>
	.login-view {
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
	}

	.login-view image {
		width: 90upx;
		height: 90upx;
		padding: 50upx;
	}
</style>

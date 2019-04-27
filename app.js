App({
	onLaunch: function () {//小程序启动后调用
		// 展示本地存储能力
		var logs = wx.getStorageSync('logs') || [];
		logs.unshift(Date.now());
		wx.setStorageSync('logs', logs);

		// 登录
		wx.login({
			success: res => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
			}
		});

		// 获取用户信息
		wx.getSetting({
			success: res => {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: res => {
							// 可以将 res 发送给后台解码出 unionId
							// this.globalData.userInfo = res.userInfo;
							this.globalData.unionId = res.unionId;

							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
							// 所以此处加入 callback 以防止这种情况
							/*if (this.userInfoReadyCallback) {
								this.userInfoReadyCallback(res)
							}*/
						}
					})
				}
			}
		})
	},


	/*----------------------------------------- 前往授权登陆 ----------------------------------------*/
	goAuthLogin: function () {
		wx.reLaunch({
			url: "/pages/login/login"
		});
	},

	/*------------------------------------------- 进入小程序 ----------------------------------------*/
	enterFn: function () {
		/* var toUrl = wx.getStorageSync(this.globalData.CY_ZS_LINK_URL);
		 if (toUrl == "" || undefined == toUrl || "undefined" == toUrl || null == toUrl || "null" == toUrl) {
		   toUrl = "/pages/index/index";
		 }
		 // console.log(toUrl);
		 this.wxRedirectTo(toUrl);*/
	},

	/*---------------------------------------- 判断用户是否登陆 ----------------------------------------*/
	checkLogin: function () {
		return this.globalData.user.id != null;
	},

	/*------------------------------------------- 定义全局变量 ----------------------------------------*/
	globalData: {
		user: {},
		wxUser: {},
		debug: true,

		//正式环境
		/*url: "http://ksmall.ciyuanmh.com/weixin/mini",
		uploadUrl: "http://ksmall.ciyuanmh.com/",
		loginUrl: 'https://ksmall.ciyuanmh.com/weixin/mini/login',*/

		//本地环境
		url: "http://localhost:8080/mingpian/weixin-mini",
		uploadUrl: "http://localhost:8080/mingpian/",
		loginUrl: 'https://localhost:8080/mingpian/weixin-mini/login',

		openId: '',
		unionId: '',
		CY_ZS_UNOIN_ID: "CY_ZS_UNOIN_ID",//微信unionId
		CY_ZS_AUTH_OPEN_ID: 'CY_ZS_AUTH_OPEN_ID',//本地缓存用户的id
		CY_ZS_MINI_OPEN_ID: 'CY_ZS_MINI_OPEN_ID',//小程序的openId


	}
});
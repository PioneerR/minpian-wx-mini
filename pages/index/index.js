var app = getApp();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		tabIndex: 0,
		adVos: {},   //轮播图广告
		activityAdVo: {},
		todayRecommends: {}, //今日推荐
		hotRecommends: {}, //热门推荐
		newCartoons: {}, //新作抢先看
		loveCartoons: {}, //言情纯爱
		bloodCartoons: {}, //少年热血
		bannerVos: {}, //插图广告
		mysteryCartoons: {}, //悬疑灵异
		realityCartooons: {},
		freeCartoons: {}, //免费专区
		ancientCartoons: {}, //热门古风
		likeCartoons: {}, //猜你喜欢
		indicatorDots: true,
		autoplay: true,
		interval: 5000,
		duration: 1000,
		indicatorColor: "#aba3ab",
		indicatorActiveColor: "#fc8b80",
		imgone: 'https://img.ciyuanmh.com/ksmall/images/search2.png',
		isAdvert: 2,
		paperActivity: {},
		isShowPaperDialog: false,
		isShowActivityDialog: false,//是否显示节日弹窗
		isShowTab: false,//是否显示言情纯爱那些的tab
		shareTaskUserItem: {},
		isShowShareDialog: false,//否显示分享弹窗
		taskVo: {},
		shareTaskParams: {
			title: '',
			path: '',
			img: ''
		},
		toView: 0,
		tabState: [],
		neverTip: false,
		isTurnning: false,
		xView: 0,
		isShowPayContent: true
	},
	//-----------------广告弹窗 start--------------------------
	closeAdvert: function () {
		this.setData({
			isAdvert: 1
		})
		var that = this;
		setTimeout(function () {
			that.setData({
				isAdvert: 2,
				isShowActivityDialog: false
			});
			that.showShareDialog();
			that.checkShowPaperDialog();
		}, 300);
	},
	openAdvert: function () {
		this.setData({
			isAdvert: 1
		});
		var that = this;
		setTimeout(function () {
			that.setData({
				isAdvert: 0
			});
		}, 300);
	},
	//-----------------广告弹窗 end--------------------------
	//-----------------加载首页数据(用户信息除外)start--------------------------
	loadData: function () {
		var _this = this;
		var tabState = ["on", "", "", "", "", "", ""];
		_this.setData({
			tabState: tabState
		});
		app.request(
			app.globalData.url + "/index/index",
			{},
			function (res) {
				if (!res.data.success) {
					app.wxToast({
						title: res.data.info
					});
					return;
				}
				_this.setData({
					adVos: res.data.indexBean['adMiniVos'],
					todayRecommends: res.data.indexBean['todayRecommends'] == null ? [] : _this.substring(res.data.indexBean['todayRecommends']),
					hotRecommends: res.data.indexBean['hotRecommends'] == null ? [] : _this.substring(res.data.indexBean['hotRecommends']),
					newCartoons: res.data.indexBean['newCartoons'] == null ? [] : _this.substring(res.data.indexBean['newCartoons']),
					loveCartoons: res.data.indexBean['loveCartoons'] == null ? [] : _this.substring(res.data.indexBean['loveCartoons']),
					bloodCartoons: res.data.indexBean['bloodCartoons'] == null ? [] : _this.substring(res.data.indexBean['bloodCartoons']),
					bannerVos: res.data.indexBean['bannerMiniVos'] == null ? [] : res.data.indexBean['bannerMiniVos'],
					mysteryCartoons: res.data.indexBean['mysteryCartoons'] == null ? [] : _this.substring(res.data.indexBean['mysteryCartoons']),
					freeCartoons: res.data.indexBean['freeCartoons'] == null ? [] : _this.substring(res.data.indexBean['freeCartoons']),
					ancientCartoons: res.data.indexBean['ancientCartoons'] == null ? [] : _this.substring(res.data.indexBean['ancientCartoons']),
					likeCartoons: res.data.indexBean['likeCartoons'] == null ? [] : _this.substring(res.data.indexBean['likeCartoons']),
					realityCartoons: res.data.indexBean['realityCartoons'] == null ? [] : _this.substring(res.data.indexBean['realityCartoons']),
					activityAdVo: res.data.indexBean['activityAdMiniVo'] == null ? {} : res.data.indexBean['activityAdMiniVo']
				});

				var user = app.globalData.user;
				if (user == null || user.id == null) {
					return;
				}
				_this.setData({
					neverTip: app.globalData.user.invitateState == 1
				});
				//显示广告弹窗
				_this.showActivityAd();
				//显示分享弹窗
				_this.data.shareTaskUserItem = !res.data.shareTaskUserItem ? null : res.data.shareTaskUserItem;
				// console.log("dddddd-->"+_this.data.shareTaskUserItem);
				_this.data.taskVo = !res.data.taskVo ? null : res.data.taskVo;
				_this.setData({
					shareTaskUserItem: _this.data.shareTaskUserItem,
					taskVo: _this.data.taskVo
				});
				_this.showShareDialog();
				//显示问卷弹窗
				_this.data.paperActivity = !res.data.paperActivity ? null : res.data.paperActivity;
				_this.setData({
					paperActivity: _this.data.paperActivity,
					activityAdVo: _this.data.activityAdVo
				});
				_this.checkShowPaperDialog();
			}
		)
	},
	/*****************加载用户相关的信息start*********************/
	loadUserIndex(isReload) {
		var _this = this;
		app.request(
			app.globalData.url + "/index/index-user",
			{},
			function (res) {
				if (!res.data.success) {
					app.wxToast({
						title: res.data.info
					});
					return;
				}
				var neverTip = app.globalData.user.invitateState == 1;
				_this.setData({
					neverTip: neverTip
				});
				//显示广告弹窗
				_this.showActivityAd();
				//显示分享弹窗
				_this.data.shareTaskUserItem = !res.data.shareTaskUserItem ? null : res.data.shareTaskUserItem;
				_this.data.taskVo = !res.data.taskVo ? null : res.data.taskVo;
				_this.setData({
					shareTaskUserItem: _this.data.shareTaskUserItem,
					taskVo: _this.data.taskVo
				});
				_this.showShareDialog();
				//显示问卷弹窗
				_this.data.paperActivity = !res.data.paperActivity ? null : res.data.paperActivity;
				_this.setData({
					paperActivity: _this.data.paperActivity,
					activityAdVo: _this.data.activityAdVo
				});
				_this.checkShowPaperDialog();
			},
			function (res) {

			},
			function (res) {
				if (isReload) {
					app.globalData.isLoginDo = false;
				}
			}
		)
	},
	/******************加载用户相关的信息end*************************/
	waitToTab: function (res) {
		var that = this;
		var pageY = res.detail.scrollTop;
		if (pageY >= 1550) {
			this.setData({
				isShowTab: true
			});
		} else {
			this.setData({
				isShowTab: false
			});
		}
		var index = 0;

		// console.log(pageY);
		var tabState = ["", "", "", "", "", "", ""];
		if (pageY < 2480) {
			tabState[0] = "on";
		} else if (pageY < 2960) {
			index = 1;
			tabState[1] = "on";
		} else if (pageY < 3440) {
			index = 2;
			tabState[2] = "on";
		} else if (pageY < 3920) {
			index = 3;
			tabState[3] = "on";
		} else if (pageY < 4880) {
			index = 4;
			tabState[4] = "on";
		} else if (pageY < 5360) {
			tabState[5] = "on";
			index = 5;
		} else {
			tabState[6] = "on";
			index = 6;
		}
		this.setData({
			tabState: tabState,
			xView: "xTab" + index
		});
	},
	//-----------------加载首页数据 end--------------------------
	onPageScroll: function (res) {
		if (res.scrollTop >= 1550) {
			this.setData({
				isShowTab: true
			})
		} else {
			this.setData({
				isShowTab: false
			})
		}
	},
	//----------------问卷调查的弹窗 start--------------------
	checkShowPaperDialog: function () {
		if (this.data.isShowActivityDialog || this.data.isShowShareDialog) {
			//已经显示节日弹窗,不要在显示
			return;
		}
		//判断是否显示问卷活动的弹窗
		if (this.data.paperActivity == null || this.data.paperActivity.isAnswer) {
			//活动不存在或用户已经回答
			return;
		}
		var date = new Date();
		var startDate = new Date("2018/02/17 00:00:00");
		var endDate = new Date("2018/02/20 23:59:59");
		if (date.getTime() < startDate.getTime() || date.getTime() > endDate.getTime()) {
			//不在时间范围内
			return;
		}
		var viewDate = wx.getStorageSync(app.globalData.CY_ZS_USER_PAPER);
		var curDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
		if (viewDate == null) {
			_this.setData({
				isShowPaperDialog: true
			});
			wx.setStorage({key: app.globalData.CY_ZS_USER_PAPER, data: curDate});
			return;
		}
		if (viewDate == curDate) {
			return;
		}
		this.setData({
			isShowPaperDialog: true
		});
		wx.setStorage({key: app.globalData.CY_ZS_USER_PAPER, data: curDate});
	},
	//----------------问卷调查的弹窗 end--------------------
	//-------------分享的弹窗 start -----------------------
	showShareDialog: function () {
		if (this.data.neverTip) {
			return;//用户设置不再提示
		}
		if (this.data.isShowActivityDialog) {
			return;//已经显示弹窗了
		}
		if (this.data.shareTaskUserItem == null) {
			//没有任务
			return;
		}
		if (this.data.shareTaskUserItem != null && this.data.shareTaskUserItem.state != 0) {
			//已完成
			return;
		}
		var user = app.globalData.user;
		this.data.shareTaskParams.title = null == this.data.taskVo.shareTitle || this.data.taskVo.shareTitle == "" ? app.globalData.shareInviteTitle : this.data.taskVo.shareTitle;
		this.data.shareTaskParams.img = null == this.data.taskVo.miniShareImgUrl || this.data.taskVo.miniShareImgUrl == "" ? app.globalData.shareInviteImg : this.data.taskVo.miniShareImgUrl;
		this.data.shareTaskParams.path = '/pages/share/share?linkId=' + user.linkId + "&pageType=0&taskUserId=" + this.data.shareTaskUserItem.taskUserId;
		this.setData({
			shareTaskParams: this.data.shareTaskParams
		});
		//判断今天是否显示过
		var date = new Date();
		//wx.setStorageSync(app.globalData.SHARE_TASK_USER_ITEM_INDEX_ID+this.data.shareTaskUserItem.id,'');
		var viewDate = wx.getStorageSync(app.globalData.SHARE_TASK_USER_ITEM_INDEX_ID + this.data.shareTaskUserItem.id);
		var curDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
		if (viewDate == null) {
			//未显示过
			_this.setData({
				isShowShareDialog: true
			});
			wx.setStorageSync(app.globalData.SHARE_TASK_USER_ITEM_INDEX_ID + this.data.shareTaskUserItem.id, curDate);
			return;
		}
		if (viewDate == curDate) {
			//已经显示过
			return;
		}
		this.setData({
			isShowShareDialog: true
		});
		wx.setStorageSync(app.globalData.SHARE_TASK_USER_ITEM_INDEX_ID + this.data.shareTaskUserItem.id, curDate);
	},
	closeShareDialog: function () {
		//关闭分享的弹窗
		this.setData({
			isShowShareDialog: false
		});
		this.checkShowPaperDialog();
	},
	//-------------分享的弹窗 end -----------------------
	//----------------前往任务 start--------
	goTask: function () {
		if (app.globalData.isLoginDo) {
			return;
		}
		app.wxNavigateTo('/pages/task/task');
		/*wx.navigateTo({
	   url: '/pages/task/task'
	 })*/
	},
	//-----------------前往任务 end------------
	substring: function (obj) {
		for (var index in obj) {
			if (obj[index].name.length > 7) obj[index].name = obj[index].name.substring(0, 7) + "...";
		}
		return obj;
	},

	toTab: function (event) {
		var id = event.currentTarget.dataset.id;
		var tabState = ["", "", "", "", "", "", ""];
		tabState[id] = "on";
		this.setData({
			toView: "tab" + id,
			tabState: tabState
		});
	},

	goCartoon: function (event) {
		if (app.globalData.isLoginDo) {
			return;
		}
		if (this.data.isTurnning) {
			return;
		}
		this.setData({
			isTurnning: true
		});
		var id = event.currentTarget.dataset.id;
		var type = event.currentTarget.dataset.type;
		var genre = event.currentTarget.dataset.genre;
		app.request(
			app.globalData.url + "/index/update-views",
			{type: type, genre: genre},
			function (res) {
				if (!res.data.success) {
					app.wxToast({
						title: res.data.info
					});
					return;
				}
				app.wxNavigateTo('/pages/cartoon-detail/cartoon-detail?id=' + id);
				/*wx.navigateTo({
				  url: '/pages/cartoon-detail/cartoon-detail?id=' + id
				});*/
			}
		)
	},
	goMore: function (event) {
		if (app.globalData.isLoginDo) {
			return;
		}
		var type = event.currentTarget.dataset.type;
		var sort = event.currentTarget.dataset.sort;
		var genre = event.currentTarget.dataset.genre;
		app.request(
			app.globalData.url + "/index/update-views",
			{type: sort, genre: genre},
			function (res) {
				if (!res.data.success) {
					app.wxToast({
						title: res.data.info
					});
					return;
				}
				app.wxNavigateTo('/pages/plate/list?type=' + type);
				/* wx.navigateTo({
				   url: '/pages/plate/list?type=' + type
				 });*/
			}
		)
	},
	//底部跳转
	goTab: function (event) {
		if (app.globalData.isLoginDo) {
			return;
		}
		this.data.tabIndex = event.currentTarget.dataset.id;
		var url = null;
		switch (this.data.tabIndex) {
			case '0':
				url = '/pages/index/index';
				break;
			case '1':
				url = '/pages/cartoon/cartoon';
				break;
			case '2':
				url = '/pages/bookShelf/bookShelf';
				break;
			case '3':
				url = '/pages/mine/mine';
				break;
		}
		if (this.data.tabIndex == 1) {
			app.request(
				app.globalData.url + "/index/update-stat-click",
				{type: 5},
				function (res) {
					if (!res.data.success) {
						app.wxToast({
							title: res.data.info
						});
						return;
					}
				}
			)
		}
		app.wxReLaunch(url);
	},
	checkBanner: function () {
		if (this.data.bannerVos == null) {
			return;
		}
		for (var i = 0; i < this.data.bannerVos.length; i++) {
			if (this.data.bannerVos[i].status == 1) {
				continue;
			}
			var now = new Date();
			var key = 'bannerVos[' + i + ']';
			var startDate = new Date(this.data.bannerVos[i].startDate);
			var endDate = new Date(this.data.bannerVos[i].endDate);
			if (this.dateToString(startDate) > this.dateToString(new Date())) {
				this.data.bannerVos[i].status = 1;
				this.setData({
					[key]: this.data.bannerVos[i]
				});
				continue;
			}
			if (this.dateToString(endDate) < this.dateToString(new Date())) {
				this.data.bannerVos[i].status = 1;
				this.setData({
					[key]: this.data.bannerVos[i]
				});
				continue;
			}
		}
	},
	dateToString: function (date) {
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		var d = date.getDate();
		return y + "-" + (m < 10 ? '0' : '') + m + "-" + (d < 10 ? '0' : '') + d;
	},
	//判断节日广告是否可以显示
	showActivityAd: function () {
		if (this.data.activityAdVo == null) {
			return;
		}
		if (this.data.activityAdVo.status == 1) {
			return;
		}
		var now = new Date();
		if (this.data.activityAdVo.startDate > now.getTime()) {
			this.data.activityAdVo.status = 1;
		}
		if (this.data.activityAdVo.endDate < now.getTime()) {
			this.data.activityAdVo.status = 1;
		}
		if (this.data.activityAdVo.status != 0) {
			return;
		}
		var date = new Date();
		var viewDate = wx.getStorageSync(app.globalData.CY_ZS_ACTIVITY);
		var curDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
		if (viewDate == null) {
			this.openAdvert();
			this.data.isShowActivityDialog = true;
			wx.setStorageSync(app.globalData.CY_ZS_ACTIVITY, curDate);
			return;
		}
		if (viewDate == curDate) {
			return;
		}
		//展示
		this.openAdvert();
		wx.setStorageSync(app.globalData.CY_ZS_ACTIVITY, curDate);
		this.data.isShowActivityDialog = true;
	},
	goAd: function (event) {
		if (app.globalData.isLoginDo) {
			return;
		}
		var url = event.currentTarget.dataset.url;
		var statType = event.currentTarget.dataset.statType;
		var cartoonId = event.currentTarget.dataset.cartoonId;
		if (statType == 11) {
			app.wxNavigateTo('/pages/cartoon-detail/cartoon-detail?id=' + cartoonId);
			return;
		}
		this.updateViews(0, 0, url, cartoonId);
		if (cartoonId != 0) {
			app.request(
				app.globalData.url + "/index/get-chapterId", {id: cartoonId},
				function (res) {
					if (!res.data.success) {
						app.wxToast({
							title: res.data.info
						});
						return;
					}
					var chapterId = res.data.chapterId;
					if (null != chapterId) {
						app.wxNavigateTo("/pages/chapter/chapter?id=" + res.data.chapterId);
						return;
					}
					app.wxNavigateTo(url);
					return;
				}
			);
			return;
		}
		if (null == url || url == "") {
			return;
		}
		app.wxNavigateTo(url);
	},
	neverTip: function () {
		app.request(
			app.globalData.url + "/index/update-tip-state", {},
			function (res) {
				if (!res.data.success) {
					app.wxToast({
						title: res.data.info
					});
				}
			}
		);
		this.closeShareDialog();
	},
	updateViews: function (statType, genre, url, cartoonId) {
		var _this = this;
		app.request(
			app.globalData.url + "/index/update-views",
			{type: statType, genre: genre, url: url, cartoonId: cartoonId},
			function (res) {
				if (!res.data.success) {
					app.wxToast({
						title: res.data.info
					});
				}
			}
		)
	},
	goClassify: function (event) {
		if (app.globalData.isLoginDo) {
			return;
		}
		var type = event.currentTarget.dataset.type;
		app.request(
			app.globalData.url + "/index/update-stat-click",
			{type: type},
			function (res) {
				if (!res.data.success) {
					app.wxToast({
						title: res.data.info
					});
					return;
				}
				app.wxRedirectTo("/pages/classify/classify");
			}
		)
	},
	goSearch: function (event) {
		if (app.globalData.isLoginDo) {
			return;
		}
		var type = event.currentTarget.dataset.type;
		app.request(
			app.globalData.url + "/index/update-stat-click",
			{type: type},
			function (res) {
				if (!res.data.success) {
					app.wxToast({
						title: res.data.info
					});
					return;
				}
				app.wxNavigateTo("/pages/search/search");
			}
		)
	},
	goContribute: function () {
		if (app.globalData.isLoginDo) {
			return;
		}
		app.wxNavigateTo("/pages/contribute/contribute");
	},
	goRank: function (event) {
		if (app.globalData.isLoginDo) {
			return;
		}
		var type = event.currentTarget.dataset.type;
		app.wxNavigateTo('/pages/bookRank/bookRank?type=' + type);
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		app.updatePageView();
	},
	onShow: function () {
		this.setData({
			isShowPayContent: app.globalData.isShowPayContent
		});
		this.loadData();
		if (!app.checkLogin()) {
			app.globalData.loginDoFn = this.loadUserIndex;
			app.globalData.isLoginDo = true;
			app.wxLogin();
		} else {
			this.loadUserIndex(false);
		}
		var title = app.globalData.commonTitle + '首页';
		wx.setNavigationBarTitle({title: title});
		this.setData({
			isTurnning: false
		});
	},
	onReady: function (options) {

	},
	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function (res) {
		var _this = this;
		if (res.from === 'button') {
			// console.log("butoon"+_this.data.shareTaskParams.path);
			var type = 0;
			var model = 0;
			_this.closeShareDialog();
			return {
				title: _this.data.shareTaskParams.title,
				desc: _this.data.shareTaskParams.desc,
				imageUrl: _this.data.shareTaskParams.img,
				path: _this.data.shareTaskParams.path,
				success: function (res) {

				},
				fail: function (res) {

				},
				complete: function (res) {
					app.clcShareNum(_this, type, model, 0);
				}
			}
		}
		var user = app.globalData.user;
		return {
			title: app.globalData.shareTitle,
			desc: app.globalData.shareDesc,
			imageUrl: app.globalData.shareImg,
			path: '/pages/share/share?linkId=' + user.linkId + "&pageType=0"
		}
	},
	goPaper: function () {
		if (app.globalData.isLoginDo) {
			return;
		}
		app.wxNavigateTo('/pages/questionnaire/questionnaire');
	},
	showPaperDialog: function () {
		if (this.data.paperActivity == null) {
			app.wxToast({
				title: '尚未有问卷活动'
			});
			return;
		}
		if (this.data.paperActivity.isAnswer) {
			app.wxToast({
				title: '您已经参与过了哟~'
			});
			return;
		}
		this.setData({
			isShowPaperDialog: true
		});
	},
	closePaperDialog: function () {
		this.setData({
			isShowPaperDialog: false
		});
	},
	goActivity: function () {
		app.wxNavigateTo('/pages/activityArea/activityArea');
	},
	goTask: function () {
		app.wxNavigateTo('/pages/task/task');
	}
});

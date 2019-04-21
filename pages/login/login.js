var app = getApp();

Page({

  //页面的初始数据
  data: {
    url:''
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    /*var linkId = app.globalData.enterLinkId;
    var taskUserId = app.globalData.enterTaskUserId;
    var loginUrl = app.globalData.loginUrl+'?linkId='+linkId;
    if(null != taskUserId && undefined != taskUserId && 0 != taskUserId ){
    	loginUrl += '&taskUserId='+taskUserId;
    }
    this.setData({
    	url : "https://ksmall.ciyuanmh.com/?#/user/book-shelf?linkId=3F26E6AE86FA4F21ED7CB57AB1A1DFAA"
    });*/
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    //console.log(options); 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
	  var title = '漫画';
	  wx.setNavigationBarTitle({  title: title});
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
  onShareAppMessage: function () {
    var user = app.globalData.user;
    return {
      title: app.globalData.shareTitle,
      desc: app.globalData.shareDesc,
      path: '/pages/index/index?linkId=' + user.linkId
    }
  }
})
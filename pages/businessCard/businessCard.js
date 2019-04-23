Page({
  data: {
    userWeChatId:1,
    moreCard:"更多名片",
    consult:"咨询",
    imgMode: "scaleToFill",
    srcPhoto: "../../static/images/businessCard/foolMan.jpg",
    name:'肖逗',
    position:'CEO',
    company:'环境卫生管理局',
    srcLogo:'../../static/images/logo-xbox.png',
    imgLogoMode:'scaleToFill',
    imgNavMode:'scaleToFill',
    srcMoreCard:'../../static/images/businessCard_blue_64px.png',
    srcWeChat:'../../static/images/businessCard/WeChat.png',
    moreCardURL:'#',
    weChatURL:'#',
    fixedNavOpenType:'redirect',
    imgBrowse:'../../static/images/businessCard/Browse.png',
    userA: { imgUser: '../../static/images/businessCard/1.jpg', imgUserMode: 'scaleToFill', browseUsers:''},
    userB: { imgUser: '../../static/images/businessCard/2.jpg', imgUserMode: 'scaleToFill', browseUsers: ''},
    userC: { imgUser: '../../static/images/businessCard/3.jpg', imgUserMode: 'scaleToFill', browseUsers: ''},
    userD: { imgUser: '../../static/images/businessCard/3.jpg', imgUserMode: 'scaleToFill', browseUsers: ''},
    userE: { imgUser: '../../static/images/businessCard/2.jpg', imgUserMode: 'scaleToFill', browseUsers: ''},
    userF: { imgUser: '../../static/images/businessCard/1.jpg', imgUserMode: 'scaleToFill', browseUsers: ''},
    userG: { imgUser: '', imgUserMode: 'scaleToFill', browseUsers:'+3761' },
    doWhat:'正在观看名片',
    phoneNum:'13075813328',
    address:'蔡塘社区创业公寓',
    weChatId:'13075813328',
    email:'784429899@qq.com',
    shareImage:'../../static/images/businessCard/Share.png',
    exchangeImage:'../../static/images/businessCard/Exchang.png',
    companyLatitude:24.4888913935,
    companyLongitude: 118.1572026014,
    moreInfo:'更多',
    show:false,
    ad1: { imgAD: '../../static/images/businessCard/more1.jpg', imgAdMode: 'scaleToFill' },
    ad2: { imgAD: '../../static/images/businessCard/more2.jpg', imgAdMode: 'scaleToFill' },
    ad3: { imgAD: '../../static/images/businessCard/more3.jpg', imgAdMode: 'scaleToFill' },
    ad4: { imgAD: '../../static/images/businessCard/more3.jpg', imgAdMode: 'scaleToFill' },
    ad5: { imgAD: '../../static/images/businessCard/more3.jpg', imgAdMode: 'scaleToFill' },
    ad6: { imgAD: '../../static/images/businessCard/more3.jpg', imgAdMode: 'scaleToFill' },
    ad7: { imgAD: '../../static/images/businessCard/more3.jpg', imgAdMode: 'scaleToFill' },
    ad8: { imgAD: '../../static/images/businessCard/more3.jpg', imgAdMode: 'scaleToFill' }
  },
  onLoad: function (options) {
    this.getdata(options.userWeChatId)
  },
  getdata: function (userWeChatId) { // 测试
    var that = this;
    wx.request({
      url: '', // 请求的URL
      data: {
        id:that.data.userWeChatId
      }, 
      header:{
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: function (res) { //res是接受的传参
        that.setData ({
          name: res.data.user.name,
          position: res.data.user.position,
          company: res.data.user.company,
          PhoneNum: res.data.user.phone,
          Address: res.data.user.address,
          WeChatId: res.data.user.wechat,
          Email: res.data.user.email,
          companyLatitude: res.data.user.companyLatitude,
          companyLongitude: res.data.user.companyLongitude
        })
      },
      fail: function (err) { 
        that.setData({
          name: '肖文杰' 
        })
      },
      complete: function () { }
    })
  },
  callUp: function(e) {
    wx.makePhoneCall({
      phoneNumber: this.data.PhoneNum
    })
  },
  openMap: function(e) {
    wx.openLocation({
      latitude: this.data.companyLatitude, 
      longitude: this.data.companyLongitude
    })
  },
  copyWeChatId: function (e) {
    wx.setClipboardData({
      data: this.data.WeChatId,
      success: function (res) {
        wx.showToast({
          title: '复制成功'
        })
      }
    })
  },
  copyEmail: function (e) {
    wx.setClipboardData({
      data: this.data.Email,
      success: function (res) {
        wx.showToast({
          title: '复制成功'
        })
      }
    })
  },
  ShowMore: function(e) {
    if (this.data.show)
    {
      this.setData({
        show: false,
        moreInfo:'更多'
      })
    } else {
      this.setData({
        show: true,
        moreInfo: '收起'
      })
    }
  },
  savePhoneNum:function(e) {
    wx.addPhoneContact({
      firstName:this.data.name,
      mobilePhoneNumber:this.data.PhoneNum,
      weChatNumber:this.data.WeChatId, 
      organization:this.data.company,
      title:this.data.position,
      email:this.data.Email,
      workAddressStreet:this.data.Address,
      success:function(res) {
        wx.showToast({
          title: '保存成功'
        })
      }
    })
  }
})
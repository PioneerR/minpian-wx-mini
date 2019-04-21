Page({
  data: {
    imageMode: "scaleToFill",
    urlHeaderImg:"../../images/ShoppingMall/header.jpg",
    currentIndex:2,
    tabList: [
      { tabtext: '全部', index: 0 },
      { tabtext: '自用茶', index: 1 },
      { tabtext: '定制茶', index: 2 },
      { tabtext: '礼盒茶', index: 3 },
      { tabtext: '茶面膜', index: 4 },
      { tabtext: '茶生活', index: 5 },
      { tabtext: '高端茶', index: 6 },
    ],
    

  },
  onLoad:function(){
    that.setData({
      currentIndex:0
    })
  },
  //滑动切换
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  //点击切换
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current

      })
    }
  },
})
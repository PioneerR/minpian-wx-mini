Page({
  data:{
    goodId: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    easingFunction: 'easeInOutCubic',
    goodName: '乌龙茶',
    goodImgSrcs: [
      {
      src: '../../static/images/ShoppingMall/goods.jpg'
      },
      {
        src: '../../static/images/ShoppingMall/goods.jpg'
      },
      {
        src: '../../static/images/ShoppingMall/goods.jpg'
      }
    ],
    goodPrice: "￥158",
    discountPrice: "￥128",
    goodSalesVolume: 8,
    imgModeScale: 'scaleToFill',
    imgModeWidthFix: 'widthFix',
    goodDetailInfo: '商品详情'
  },
  onLoad: function (options) {
    this.setData({
      goodId:options.goodId
    })
  }
})
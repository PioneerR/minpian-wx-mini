Page({
  data: {
    imgMode: "scaleToFill",
    srcPhoto: "../images/businessCard/foolMan.jpg"
  },
  imageError(e) {
    console.log('image3发生error事件，携带值为', e.detail.errMsg)
  }
})
// pages/post_evaluate/post_evaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    evaluate_title_width: wx.getSystemInfoSync().windowWidth*0.88-40,
    img1:"../../images/iconfont-evaluate.png",
    img2:"../../images/iconfont-evaluate.png",
    img3:"../../images/iconfont-bad.png",
    good1:false,
    general1:false,
    bad1:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
  
  },
  good:function(){
    this.setData({
      img1: "../../images/iconfont-good.png",
      img2: "../../images/iconfont-evaluate.png",
      img3: "../../images/iconfont-bad.png",
      good1: true,
      general1: false,
      bad1: false,
    })
  },
  general: function () {
    this.setData({
      img1: "../../images/iconfont-evaluate.png",
      img2: "../../images/iconfont-middle.png",
      img3: "../../images/iconfont-bad.png",
      good1: false,
      general1: true,
      bad1: false,
    })
  },
  bad: function () {
    this.setData({
      img1: "../../images/iconfont-evaluate.png",
      img2: "../../images/iconfont-evaluate.png",
      img3: "../../images/iconfont-badon.png",
      good1: false,
      general1: false,
      bad1: true,
    })
  }
})
// pages/callcenter/callcenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedbtn:true,
    selectedbtn1:false,
    selectedbtn2: false,
    label_width: wx.getSystemInfoSync().windowWidth * 0.88 - 20,
    service_phone:"18361296775"
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
  selected:function(){
    this.setData({
      selectedbtn: true,
      selectedbtn1: false,
      selectedbtn2: false,
    })
  },
  selected1: function () {
    this.setData({
      selectedbtn: false,
      selectedbtn1: true,
      selectedbtn2: false,
    })
  },
  selected2: function () {
    this.setData({
      selectedbtn: false,
      selectedbtn1: false,
      selectedbtn2: true,
    })
  },
  callmobile: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.service_phone
    })
  },
})
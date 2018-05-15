// pages/binding_phone/binding_phone.js
var timer=1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input_width: wx.getSystemInfoSync().windowWidth * 0.92 - 186,
    sendmsg: "sendmsg", 
    getmsg: "获取验证码", 
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
  /** 
 * 获取短信验证码 
 */
  sendmessg: function (e) {
    if (timer == 1) {
      timer = 0
      var that = this
      var time = 60
      that.setData({
        sendmsg: "sendmsgafter",
      })
      var inter = setInterval(function () {
        that.setData({
          getmsg: time + "s后重新发送",
        })
        time--
        if (time < 0) {
          timer = 1
          clearInterval(inter)
          that.setData({
            sendmsg: "sendmsg",
            getmsg: "获取验证码",
          })
        }
      }, 1000)
    }
  },
})
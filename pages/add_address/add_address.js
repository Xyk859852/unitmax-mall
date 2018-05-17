// pages/add_address/add_address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:""
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
  
  }

  // onChangeAddress: function () {
  //   var that = this
  //   wx.chooseLocation({
  //     success: function (res) {
  //       // success  
  //       console.log(res, "location")
  //       that.setData({
  //         hasLocation: true,
  //         location: {
  //           longitude: res.longitude,
  //           latitude: res.latitude
  //         },
  //         detail_info: res.address,
  //         wd: res.latitude,
  //         jd: res.longitude
  //       })
  //     },
  //     fail: function () {
  //       // fail  
  //     },
  //     complete: function () {
  //       // complete  
  //     }
  //   })  
  // }
})
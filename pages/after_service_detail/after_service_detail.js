const app = getApp();
var header = getApp().globalData.header;
// pages/after_service_detail/after_service_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodity_li_right_width: wx.getSystemInfoSync().windowWidth * 0.88 - 60,
    address_width: wx.getSystemInfoSync().windowWidth * 0.84 - 40,
    address_left: wx.getSystemInfoSync().windowWidth * 0.08 + 20,
    image_box_width: wx.getSystemInfoSync().windowWidth * 0.92 * 0.32,
    IP:app.IP
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.toast = this.selectComponent("#toast");
    var that = this;
    var ORDERFORM_ID = options.orderform_id;
    var SELLAFTERID = options.sellafterid;
    if (ORDERFORM_ID != '' && ORDERFORM_ID!=undefined
      && SELLAFTERID != '' && SELLAFTERID!=undefined){
      wx.showToast({
        title: "Loading...",
        icon: "loading",
        duration: 2000
      })
      wx.request({
        url: app.IP + 'chatSellafter/goRecord',
        data: {
          ORDERFORM_ID: ORDERFORM_ID,
          SELLAFTERID: SELLAFTERID
        },
        header: header,
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          console.log(res.data);
          if(res.data.msg==undefined){
            that.setData({
              order: res.data.order,
              orderDetailList: res.data.orderDetailList,
              sellafter: res.data.sellafter
            })
          }
        },
        fail: function (res) { 
          // fail
          setTimeout(function () {
            that.toast.showView("加载失败");
          }, 100)
        },
        complete: function (res) { 
          // complete
          //wx.hideToast();
        },
      })
    }
   
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
})
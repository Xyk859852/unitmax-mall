const app = getApp();
var header = getApp().globalData.header;
var page = 1;
var GetList = function (that) {
  wx.showToast({
    title: "加载中...",
    icon: "loading"
  });
  wx.request({
    url: app.IP + 'chatSellafter/sellafterList',
    data: {
      pageSize: 10,
      pageNo: page,
    },
    header: header,
    method: 'GET',
    dataType: 'json',
    success: function (res) {
      console.log(res);
      var l = that.data.list
      for (var i = 0; i < res.data.list.length; i++) {
        l.push(res.data.list[i])
      }
      that.setData({
        list: l
      })
      page++;
    },
    fail: function (res) {
      // fail
      setTimeout(function () {
        that.toast.showView("加载失败");
      }, 100)
     },
    complete: function (res) { 
      // complete
      wx.hideToast();
    },
  })

}
// pages/after_service_management/after_service_management.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodity_li_right_width: wx.getSystemInfoSync().windowWidth * 0.88 - 60,
    list:[],
    IP: app.IP
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.toast = this.selectComponent("#toast");
    var that = this;
    page = 1;
    that.setData({
      list: []
    })
    GetList(that);
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
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    page = 1;
    this.setData({
      list: [],
      scrollTop: 0
    });
    GetList(this);
    // 隐藏导航栏加载框  
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
    
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    GetList(that);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  goodsDetail:function(e){
    console.log(e);
    var goods_id = e.currentTarget.dataset.goods_id;
    wx.navigateTo({
      url: '../commodity_detail/commodity_detail?goods_id=' + goods_id,
    });
  }
})
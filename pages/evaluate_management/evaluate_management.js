const app = getApp();
var header = getApp().globalData.header;
// pages/evaluate_management/evaluate_management.js
var page = 1;
var GetList = function (that) {
  wx.request({
    url: app.IP + 'chatEvaluate/findEvaluateForBuyer',
    data: {
      pageSize: 10,
      pageNo: page,
    },
    header: header,
    method: 'GET',
    dataType: 'json',
    success: function (res) {
      console.log(res.data);
      var l = that.data.list
      for (var i = 0; i < res.data.evaluateList.length; i++) {
        l.push(res.data.evaluateList[i])
      }
      that.setData({
        list: l
      });
      page++;
      console.log(l.length);
    },
    fail: function (res) { },
    complete: function (res) { },
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodity_li_right_width: wx.getSystemInfoSync().windowWidth * 0.8 - 60,
    list: [],
    IP:app.IP
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
    wx.showToast({
      title: "Loading...",
      icon: "loading",
      duration: 2000
    })
    var that = this;
    var user = wx.getStorageSync("user");
    console.log(user);
    page = 1;
    that.setData({
      list: [],
      user: user
    });
    GetList(that);
    //wx.hideToast();
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
    console.log("刷新");
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    page = 1;
    this.setData({
      list: []
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
    console.log("下拉");
    var that = this;
    GetList(that);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  goDetail:function(e){
    console.log(e);
    var goods_id = e.currentTarget.dataset.goods_id;
    wx.navigateTo({
      url: '../commodity_detail/commodity_detail?goods_id=' + goods_id,
    })
  }
})
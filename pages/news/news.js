//news.js
//获取应用实例
const app = getApp()
var header = getApp().globalData.header;
var url = app.IP + "chatNews/listNews";
var page = 1;
var GetList = function (that) {
  wx.showNavigationBarLoading()
  that.setData({
    hidden: false
  });
  wx.request({
    url: url,
    header:header,
    data: {
      pageSize: 10,
      pageNo: page
    },
    success: function (res) {
      console.log(res.data);
      var l = that.data.list
      for (var i = 0; i < res.data.newList.length; i++) {
        l.push(res.data.newList[i])
      }
      that.setData({
        list: l
      });
      page++;
      console.log(l.length);
    },
    fail: function () {
      // fail
      setTimeout(function () {
        wx.showToast({
          title: "加载失败",
          duration: 1500
        })
      }, 100)
    },
    complete: function () {
      // complete
      //wx.hideToast();
    }
  });
  wx.hideNavigationBarLoading()
  that.setData({
    hidden: true
  });
} 

// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news_img_width: wx.getSystemInfoSync().windowWidth * 0.8 - 100,
    appIP: app.IP
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    page = 1;
    that.setData({
      list: [],
    });
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
  openDetail: function(e) {
    console.log(e);
    var types = e.currentTarget.dataset.type;
    if(types==1){
      wx.navigateTo({
        url: '../news_detail_url/news_detail_url?url=' + e.currentTarget.dataset.url
      })
    }else{
      wx.navigateTo({
        url: "../news_detail/news_detail?ID=" + e.currentTarget.dataset.id
      })
    }
  }
})
// pages/myOrder/myOrder_list.js

var app = getApp();
var header = getApp().globalData.header;
Page({
  data: {
    appIP: app.IP,
    selected: true,
    selected1: false,
    selected2: false,
    selected3: false,
    selected4: false,
    commodity_li_right_width: wx.getSystemInfoSync().windowWidth * 0.88 - 80,
    page: 1,
    pageSize: 30,
    hasMoreData: true,
    orderList: [],
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
    // 页面显示
    var that = this;
    wx.request({
      url: this.data.appIP + 'chatOrder/myOrderList',
      // data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header, // 设置请求的 header
      success: function (res) {
        // success
        if (res.data.result == "true") {
          that.setData({
            orderList: res.data.orderList,
            ORDER_STATUS: res.data.ORDER_STATUS
          });
        }

        if (res.data.result == "1002") {
          wx.switchTab({
            url: '../mine/mine',
          })
        }
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
        wx.hideToast();
      }
    })

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
  selected: function (e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected3: false,
      selected4: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected2: false,
      selected3: false,
      selected4: false,
      selected1: true
    })
  },
  selected2: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected3: false,
      selected2: true,
      selected4: false,
    })
  },
  selected3: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: false,
      selected3: true,
      selected4: false,
    })
  },
  selected4: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: false,
      selected3: false,
      selected4: true,
    })
  },
  getMyOrderList: function (message) {
    var that = this
    var data = {
      page: that.data.page,
      ORDER_STATUS: that.data.ORDER_STATUS,
    }
    wx.request({
      url: this.data.appIP + 'chatOrder/myOrderList',
      data: data,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header, // 设置请求的 header
      success: function (res) {
        console.log(res)
        var orderListTem = that.data.orderList
        if (res.showapi_res_code == 0) {
          if (that.data.page == 1) {
            orderListTem = []
          }
          var orderList = res.showapi_res_body.pagebean.orderList
          if (orderList.length < that.data.pageSize) {
            that.setData({
              orderList: orderListTem.concat(orderList),
              hasMoreData: false
            })
          } else {
            that.setData({
              orderList: orderListTem.concat(orderList),
              hasMoreData: true,
              page: that.data.page + 1
            })
          }
        } else {
          wx.showToast({
            title: res.data.result,
          })
        }

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
        wx.hideToast();
      }
    })
  },
  /**
* 页面相关事件处理函数--监听用户下拉动作
*/
  onPullDownRefresh: function () {
    this.data.page = 1
    this.getMyOrderList('正在刷新数据')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.getMyOrderList('加载更多数据')
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  }
})
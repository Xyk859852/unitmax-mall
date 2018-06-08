// pages/callcenter/callcenter.js
var header = getApp().globalData.header;
var util = require("../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedbtn:true,
    selectedbtn1:false,
    selectedbtn2: false,
    label_width: wx.getSystemInfoSync().windowWidth * 0.88 - 20,
    service_phone:"",
    hasMoreData: true,
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.toast = this.selectComponent("#toast");
    var that = this;
      //加载信息
    wx.request({
      url: app.IP + 'chatConfig/findQuestionanswer',
      header: header,
      method: 'GET',
      success: function (res) {
        if (res.data.result == "true") {
          that.setData({
            service_phone: res.data.service_phone,
            typeList: res.data.typeList,
            varList: res.data.varList,
            DICTIONARIES_ID: res.data.typeList[0].DICTIONARIES_ID
          });

        }
      },
      fail: function (res) {

      },
      complete: function (res) {

      },
    });
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
  selected:function(e){
    var QUESTIONTYPE = e.target.dataset.questiontype;
    this.setData({ DICTIONARIES_ID: QUESTIONTYPE,page: 1});
    this.getMyvarList("加载更多数据");
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
  getMyvarList: function (message) {
    var that = this
    var data = {
      page: that.data.page,
      QUESTIONTYPE: that.data.DICTIONARIES_ID,
    }
    wx.request({
      url: app.IP + 'chatConfig/findQuestionanswer',
      data: data,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header, // 设置请求的 header
      success: function (res) {
        var varListTem = that.data.varList
        if (res.data.result == "true") {
          if (that.data.page == 1) {
            varListTem = []
          }
          if (res.data.varList.length < res.data.pageSize) {
            that.setData({
              varList: varListTem.concat(res.data.varList),
              hasMoreData: false
            })
          } else {
            that.setData({
              varList: varListTem.concat(res.data.varList),
              hasMoreData: true,
              page: that.data.page + 1
            })
          }
        } else {
          that.toast.showView(res.data.result);
        }

      },
      fail: function () {
        // fail
        setTimeout(function () {
          that.toast.showView("加载失败");
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
    this.getMyvarList('正在刷新数据')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.getMyvarList('加载更多数据')
    } else {
      that.toast.showView("没有更多数据");
    }
  },
})
//search.js
//获取应用实例
const app = getApp();
var header = getApp().globalData.header;
var util = require("../../utils/util.js");
var souList = [];
Page({
  data: {
    search_box_left_width: wx.getSystemInfoSync().windowWidth * 0.88*0.92 - 32,
    search_width: wx.getSystemInfoSync().windowWidth * 0.88*0.88 - 47,
    search_left: wx.getSystemInfoSync().windowWidth * 0.88 * 0.04+15,
    search_img_left: wx.getSystemInfoSync().windowWidth * 1.88 * 0.04,
    souList:[],
    searchList:[]
  },
  onLoad: function () {
    //选择组件对象
    this.toast = this.selectComponent("#toast");
  },
  onShow: function() {
    var that = this;
    souList = wx.getStorageSync("souList");
    if (!util.isAvalible(souList)){
      souList = [];
    }
    that.setData({
      souList: souList
    })
    console.log(that.data.souList);
    wx.request({
      url: app.IP +'chatIndex/searchList',
      data: '',
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        if(res.data.result=="true"){
          that.setData({
            searchList:res.data.list
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  goOrderList: function(e) {
    console.log(e);
  },
  realnameConfirm: function(e){
    var that = this;
    console.log(e);
    if (e.detail.value != undefined && e.detail.value != null && e.detail.value !=''){
      console.log(souList);
      var l = that.data.souList;
      for (var i = 0; i < l.length; i++) {
        if (l[i] == e.detail.value){
          l.splice(i, 1)
          break;
        }
      }

      if(l.length==10){
        l.splice(9, 1);
        l.unshift(e.detail.value);
      }else{
        l.unshift(e.detail.value);
      }
      wx.setStorageSync("souList", l);
      wx.redirectTo({
        url: '../commodity/commodity?keywords=' + e.detail.value
      });
    }else{
      this.toast.showView("请输入搜索内容");
    }
    console.log(e);
  },
  back:function(e){
    wx.navigateBack({ changed: true });//返回上一页  
  },
  goList: function(e){
    console.log(e);
    var that = this;
    var l = that.data.souList;
    if (l.length == 10) {
      l.splice(9, 1);
      l.unshift(e.currentTarget.dataset.keywords);
    } else {
      l.unshift(e.currentTarget.dataset.keywords);
    }
    wx.setStorageSync("souList", l);
    wx.redirectTo({
      url: '../commodity/commodity?keywords=' + e.currentTarget.dataset.keywords
    });
  },
  removeList:function(e){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要清空搜索记录吗？',
      success: function (sm) {
        if (sm.confirm) {
          souList = [];
          that.setData({
            souList: souList
          })
          wx.setStorageSync("souList", souList);
        } else if (sm.cancel) {

        }
      }
    })
  }
})

//search.js
//获取应用实例
const app = getApp();
var header = getApp().globalData.header;
var souList = [];
Page({
  data: {
    search_box_left_width: wx.getSystemInfoSync().windowWidth * 0.84 - 32,
    search_width: (wx.getSystemInfoSync().windowWidth * 0.84 - 32)*0.96-20,
    souList:[]
  },
  onLoad: function () {
    //选择组件对象
    this.toast = this.selectComponent("#toast");
  },
  onShow: function() {
    var that = this;
    souList = wx.getStorageSync("souList");
    if (souList == undefined || souList==''){
      souList = ['暂无搜索记录'];
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
      if (l[0] == '暂无搜索记录') {
        l = [];
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
    if (l[0] == '暂无搜索记录') {
      l = [];
    }
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
    souList=['暂无搜索记录'];
    console.log('清除信息');
    this.setData({
      souList: souList
    })
    wx.setStorageSync("souList", souList);
  }
})

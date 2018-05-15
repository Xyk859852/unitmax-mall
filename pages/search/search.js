//search.js
//获取应用实例
const app = getApp()

Page({
  data: {
    search_box_left_width: wx.getSystemInfoSync().windowWidth * 0.84 - 32,
    search_width: (wx.getSystemInfoSync().windowWidth * 0.84 - 32)*0.96-20
  },
  onLoad: function () {

  },
  onShow: function() {
    
  },
  goOrderList: function(e) {
    console.log(e);
  },
  realnameConfirm: function(e){
    if (e.detail != undefined && e.detail != null && e.detail!=''){
      wx.navigateTo({
        url: '../commodity/commodity?keywords=' + e.detail.value
      });
    }
    console.log(e);
  },
  back:function(e){
    wx.navigateBack({ changed: true });//返回上一页  
  }
})

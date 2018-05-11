//category.js
//获取应用实例  
var app = getApp()
Page({
  data: {
    category_img_width: wx.getSystemInfoSync().windowWidth * 0.7*0.27,
    svLeftHeight: '100',
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    tabdefault: 1
  },

  getchildren: function (e) {
    if (this.data.tabdefault == 1) {
      this.setData({
        tabdefault: 0
      })
    }
    var dataId = e.target.dataset.id;//获取到了点击的是哪个分类
    var obj = {};
    obj.curHdIndex = dataId;
    obj.curBdIndex = dataId;
    this.setData({
      tabArr: obj//将此分类ID传递给data进行渲染wxml
    })
  },
  onLoad: function () {
  }
})  
// pages/place_order/place_order.jsvar app = getApp();
var util = require("../../utils/util.js");
var province = (util.province || []).map(v => {
  return v.title
});
// 获取到的province["上海市", "江苏省", "浙江省", "安徽省", "北京市", "重庆市", ...]
var city = ((util.city || []).filter(v => { return v.parent_code == "jt" }) || []).map(v => {
  return v.title
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Delivery:false,
    payment:false,
    commodity_li_right_width: wx.getSystemInfoSync().windowWidth * 0.88 - 80,
    other_input_width: wx.getSystemInfoSync().windowWidth * 0.88 - 56,
    address_width: wx.getSystemInfoSync().windowWidth * 0.84 - 40,
    address_left: wx.getSystemInfoSync().windowWidth * 0.08 + 20,
    p_c: [["今天"], ["1:00"]],
    //对应的数组下标 eg: pcIndex[1,2]指的是 p_c[0][1] 省的名称 和 p_c[1][2] 市的名称
    pcIndex: [0, 0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.p_c[0] = province
    this.data.p_c[1] = city

    //初始化p_c

    this.setData({ p_c: this.data.p_c })
    console.log(this.data.p_c)
  },
  onShow: function () {
    wx.showToast({
      title: "Loading...",
      icon: "loading",
      duration: 2000
    })
    // 页面显示
    var that = this;
    wx.request({
      url: app.IP + 'chatGoodscart/toList',
      // data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        if (res.data.result == "true") {
          that.setData({
            cartlist: res.data.cartlist
          });
        } else if (res.data.result == "noLogin") {//未登录

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
    });

  },
  pkIndex: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pcIndex: e.detail.value
    })
  },
  pkCol: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      p_c: this.data.p_c,
      pcIndex: this.data.pcIndex
    };

    //如果选择省则区的数组会变
    if (e.detail.column == 0) {
      //code默认值为上海
      var code = "sh";
      // 获取我们选择省所对应的code
      (util.province || []).some(v => {
        if (v.title == province[e.detail.value]) {
          code = v.code
          // if选择北京 则code值变为 "bj" 并返回true
          return true
        }
        return false
      });
      // 选取parent_code为"bj"的所有区 把所有区的title放到一个city数组里面

      var city = ((util.city || []).filter(v => { return v.parent_code == code }) || []).map(v => {
        return v.title
      });
      //把区的变化和下标的变化设置data里就ok
      data.p_c[1] = city
      data.pcIndex[0] = e.detail.value
    } else {
      data.pcIndex[1] = e.detail.value;
    }
    this.setData(data)
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
  showDelivery:function(){
    this.setData({
      Delivery:true
    })
  },
  hideDelivery: function () {
    this.setData({
      Delivery: false
    })
  },
  showpayment: function () {
    this.setData({
      payment: true
    })
  },
  hidepayment: function () {
    this.setData({
      payment: false
    })
  }
})
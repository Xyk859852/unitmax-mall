//commodity.js
//获取应用实例
const app = getApp()
var url = app.IP +"chatGoods/listPageGoods";
var page = 1;

var GetList = function (that) {
  that.setData({
    hidden: false
  });
  wx.request({
    url: url,
    data: {
      pageSize: 10,
      pageNo: page
    },
    success: function (res) {
      console.log(res.data);
      var l = that.data.list
      for (var i = 0; i < res.data.goodslist.length; i++) {
        l.push(res.data[i])
      }
      that.setData({
        list: l
      });
      page++;
    }
  });
  that.setData({
    hidden: true
  });
} 
Page({
  data: {
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0  ,
    selected: true,
    selected1: false,
    selected2: false,
    selected3: false,
    selectedbtn: true,
    selectedbtn1: false,
    selectedbtn2: false,
    selectedbtn3: false,
    commodity_li_right_width: wx.getSystemInfoSync().windowWidth * 0.88 - 100,
    search_box_left_width: wx.getSystemInfoSync().windowWidth * 0.88,
    search_width: wx.getSystemInfoSync().windowWidth * 0.88*0.96 - 20
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  }, 
  onShow: function () {
    var that = this;
    GetList(that);
  },
  bindDownLoad: function () {
    var that = this;
    GetList(that);
  },
  scroll: function (event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refresh: function (event) {
    page = 1;
    this.setData({
      list: [],
      scrollTop: 0
    });
    GetList(this)
  },  
  select: function (e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected: false,
      selected3: false
    })
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected: true,
      selected3: false,
      selectedbtn1: false,
      selectedbtn2: false,
      selectedbtn: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected2: false,
      selected1: true,
      selected3: false,
      selectedbtn: false,
      selectedbtn2: false,
      selectedbtn1: true
    })
  },
  selected2: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: true,
      selected3: false,
      selectedbtn: false,
      selectedbtn1: false,
      selectedbtn2: true,
    })
  },
  selected3: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: false,
      selected3: true
    })
  },
  //下拉
  onPullDownRefresh: function(e){
    console.log("123");
  },

  onReachBottom:function(e) {
    console.log("321")
  }
})

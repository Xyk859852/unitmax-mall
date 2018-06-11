var header = getApp().globalData.header;
var util = require("../../utils/util.js");
var tempObj = require("../../utils/bottom.js");
//commodity.js
//获取应用实例
const app = getApp()
var url = app.IP + "chatGoods/listPageGoods";
var page = 1;
var jiage = -1;
var xiaoliang = -1;
var keywords = '';
var GOODSTYPE = '';
var GOODSLEVEL = '';
var preTypeId = "";
var preLevelId = "";
var GetList = function (that) {
  wx.showToast({
    title: "加载中...",
    icon: "loading"
  });
  that.setData({ jiage: jiage, xiaoliang: xiaoliang, goodstype_id: util.isAvalible(GOODSTYPE) ? GOODSTYPE : -1, goodslevel_id: util.isAvalible(GOODSLEVEL) ? GOODSLEVEL : -1 });
  wx.request({
    url: url,
    header: header,
    data: {
      pageSize: 10,
      pageNo: page,
      xiaoliang: xiaoliang,//1降序,0升序
      jiage: jiage,//1降序,0升序
      GOODSTYPE_ID: GOODSTYPE,
      GOODSLEVEL_ID: GOODSLEVEL,
      keywords: keywords
    },
    success: function (res) {
       preTypeId = GOODSTYPE;
       preLevelId = GOODSLEVEL;

      console.log(res.data);
      var l = that.data.list
      for (var i = 0; i < res.data.goodslist.length; i++) {
        res.data.goodslist[i].GOODS_PRICE = util.changeTwoDecimal_f(res.data.goodslist[i].GOODS_PRICE);
        l.push(res.data.goodslist[i])
      }
      that.setData({
        list: l,
        goodsTypes: res.data.goodstypeList
      });
      if (GOODSTYPE != '' && GOODSTYPE != null && GOODSTYPE != undefined) {
        console.log(GOODSTYPE);
        var s = res.data.goodstypeList;
        wx.request({
          url: app.IP + "chatGoods/listLevel",
          data: { GOODSTYPE_ID: GOODSTYPE },
          success: function (res) {
            console.log(res.data);
            that.setData({
              goodsLevels: res.data.goodsLevels
            });
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
        });
      }
      page++;
      console.log(l.length);


    },
    fail: function () {
      // fail
      setTimeout(function () {
        that.toast.showView("加载失败");
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
Page({
  data: {
    appIP: app.IP,
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0,
    selected: true,
    selected1: false,
    selected2: false,
    selected3: false,
    selectedbtn: true,
    selectedbtn1: false,
    selectedbtn2: false,
    selectedbtn3: false,
    search: false,
    goodstype_id: -1,
    goodslevel_id: -1,
    goodsTypes: [],
    commodity_li_right_width: wx.getSystemInfoSync().windowWidth * 0.88 - 100,
    search_box_left_width: wx.getSystemInfoSync().windowWidth * 0.88,
    search_width: wx.getSystemInfoSync().windowWidth * 0.88 * 0.96 - 20,
    filtrate_height: wx.getSystemInfoSync().windowHeight - 182
  },
  onLoad: function (e) {
    this.toast = this.selectComponent("#toast");
    //接收参数
    if (util.isAvalible(e.GOODSTYPE_ID)) {
      GOODSTYPE = e.GOODSTYPE_ID;
    }
    var that = this;
    console.log(e);
    if (e.keywords != null && e.keywords != undefined) {
      keywords = e.keywords;
      that.setData({
        search: true,
        keywords: e.keywords
      });
    }
    page = 1;
    that.setData({
      list: [],
      scrollTop: 0
    });
    GetList(that);
    //wx.hideToast();

  },
  onShow: function () {
    console.log(this.data.goodsTypes);

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
    var that = this;
    // console.log(e.currentTarget.dataset.jiage);
    if (e.currentTarget.dataset.xiaoliang != undefined
      && e.currentTarget.dataset.xiaoliang != null
      && e.currentTarget.dataset.xiaoliang != '') {
      xiaoliang = e.currentTarget.dataset.xiaoliang;
      jiage = -1;
    }
    if (e.currentTarget.dataset.jiage != undefined
      && e.currentTarget.dataset.jiage != null
      && e.currentTarget.dataset.jiage != '') {
      jiage = e.currentTarget.dataset.jiage;
      xiaoliang = -1;
    }
    page = 1;
    that.setData({
      list: [],
      scrollTop: 0
    });
    GetList(that);
    that.setData({
      selected1: false,
      selected2: false,
      selected: false,
      selected3: false
    })
  },
  selected: function (e) {
    var that = this;
    page = 1;
    jiage = -1;
    xiaoliang = -1;
    that.setData({
      list: [],
      scrollTop: 0
    });
    GetList(that);
    that.setData({
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
    var that = this;
    page = 1;
    that.setData({
      list: [],
      scrollTop: 0
    });
    if (that.data.selected1) {//降序
      xiaoliang = 1;
      jiage = -1;
      that.setData({
        selected1: false
      })
    } else {//升序
      xiaoliang = 0;
      jiage = -1;
      that.setData({
        selected: false,
        selected2: false,
        selected1: true,
        selected3: false,
        selectedbtn: false,
        selectedbtn2: false,
        selectedbtn1: true
      })
    }
    GetList(that);

  },
  selected2: function (e) {
    var that = this;
    page = 1;
    that.setData({
      list: [],
      scrollTop: 0
    });
    if (that.data.selected2) {//降序
      jiage = 1;
      xiaoliang = -1;
      that.setData({
        selected2: false
      })
    } else {//升序
      jiage = 0;
      xiaoliang = -1;
      that.setData({
        selected: false,
        selected1: false,
        selected2: true,
        selected3: false,
        selectedbtn: false,
        selectedbtn1: false,
        selectedbtn2: true,
      })
    }
    GetList(this);
  },
  selected3: function (e) {
    var that = this;
    if (this.data.selected3) {
      this.setData({
        selected3: false
      })
    } else {
      GOODSTYPE = preTypeId;
      GOODSLEVEL = preLevelId;

      this.setData({
        selected: false,
        selected1: false,
        selected2: false,
        selected3: true,
        goodstype_id: util.isAvalible(GOODSTYPE) ? GOODSTYPE:-1,
        goodslevel_id: util.isAvalible(GOODSLEVEL) ? GOODSLEVEL : -1,
      });
      if (util.isAvalible(GOODSTYPE) && GOODSTYPE != -1) {
        wx.request({
          url: app.IP + "chatGoods/listLevel",
          data: { GOODSTYPE_ID: GOODSTYPE },
          success: function (res) {
            console.log(res.data);
            that.setData({
              goodsLevels: res.data.goodsLevels,
              goodstype_id: GOODSTYPE
            });
          },
          fail: function () {
            // fail
            setTimeout(function () {
              that.toast.showView("加载失败");
            }, 100)
          },
          complete: function () {
            // complete
            //wx.hideToast();
          }
        });

      }

    }
  },
  //下拉
  onPullDownRefresh: function (e) {
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

  //下拉
  onReachBottom: function (e) {
    var that = this;
    GetList(that);
  },

  //选择品类
  levelSelect: function (e) {
    var that = this;
    GOODSLEVEL = '';
    console.log(e);
    if (util.isAvalible(e.currentTarget.dataset.goodstype_id)) {
      GOODSTYPE = e.currentTarget.dataset.goodstype_id;
      wx.request({
        url: app.IP + "chatGoods/listLevel",
        data: { GOODSTYPE_ID: GOODSTYPE },
        success: function (res) {
          console.log(res.data);
          that.setData({
            goodsLevels: res.data.goodsLevels,
            goodstype_id: GOODSTYPE,
            goodslevel_id: -1,
          });
        },
        fail: function () {
          // fail
          setTimeout(function () {
            that.toast.showView("加载失败");
          }, 100)
        },
        complete: function () {
          // complete
          //wx.hideToast();
        }
      });
    } else {
      GOODSTYPE = '';
      that.setData({
        goodstype_id: -1,
        goodslevel_id: -1,
        goodsLevels:[]
      });
    }
  },
  //选择等级
  bindLevel: function (e) {
    if (util.isAvalible(e.currentTarget.dataset.goodslevel_id)) {
      GOODSLEVEL = e.currentTarget.dataset.goodslevel_id;
      this.setData({
        goodslevel_id: e.currentTarget.dataset.goodslevel_id
      })
    } else {
      this.setData({
        goodslevel_id: -1
      });
      GOODSLEVEL = '';
    }
  },
  //重置
  reset: function (e) {
    GOODSLEVEL = "";
    GOODSTYPE = "";
    this.setData({
      goodsLevels: [],
      goodstype_id: -1,
      goodslevel_id: -1
    });
  },
  //点击确定
  submint: function (e) {
    var that = this;
    page = 1;
    that.setData({
      list: [],
      scrollTop: 0
    });
    GetList(that);
    that.setData({
      selected1: false,
      selected2: false,
      selected: false,
      selected3: false
    })
  },
  back: function (e) {
    keywords = "";
    wx.navigateBack({ changed: true });//返回上一页  
  },
  gohome: function (e) {
    tempObj.gohome(e);
  },
  gocommodity: function (e) {
    tempObj.gocommodity(e);
  },
  gocategory: function (e) {
    tempObj.gocategory(e);
  },
  goshoppingcart: function (e) {
    tempObj.goshoppingcart(e);
  },
  getUserInfo: function (e) {
    tempObj.getUserInfo(e)
  },
  goMinePage: function (e) {
    tempObj.goMinePage(e)
  }
})

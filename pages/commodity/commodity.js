var header = getApp().globalData.header;
var util = require("../../utils/util.js");
//commodity.js
//获取应用实例
const app = getApp()
var url = app.IP +"chatGoods/listPageGoods";
var page = 1;
var jiage = -1;
var xiaoliang = -1;
var GOODSLEVEL_ID = '';
var GOODSTYPE_ID = '';
var keywords = '';
var GOODSTYPE = '';
var GOODSLEVEL = '';
var GetList = function (that) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url,
    header:header,
    data: {
      pageSize: 10,
      pageNo: page,
      xiaoliang: xiaoliang,
      jiage: jiage,
      GOODSTYPE_ID: GOODSTYPE,
      GOODSLEVEL_ID: GOODSLEVEL,
      keywords, keywords
    },
    success: function (res) {
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
        for (var i = 0; i < s.length; i++) {
          if (s[i].goodstype_id == GOODSTYPE) {
            that.setData({
              typeIndex: i
            })
          }
        }
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
      }
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
Page({
  data: {
    appIP:app.IP,
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
    search: false,
    levelIndex: -1,
    typeIndex: -1,
    goodsTypes:[],
    commodity_li_right_width: wx.getSystemInfoSync().windowWidth * 0.88 - 100,
    search_box_left_width: wx.getSystemInfoSync().windowWidth * 0.88,
    search_width: wx.getSystemInfoSync().windowWidth * 0.88*0.96 - 20
  },
  onLoad: function (e) {
    //接收参数
    if (util.isAvalible(e.GOODSTYPE_ID)){
      GOODSTYPE = e.GOODSTYPE_ID;
      GOODSLEVEL ='';
    }
    wx.showToast({
      title: "Loading...",
      icon: "loading",
      duration: 2000
    })
    var that = this;
    console.log(e);
    if (e.keywords != null && e.keywords != undefined){
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
         && e.currentTarget.dataset.xiaoliang!=''){
      xiaoliang = e.currentTarget.dataset.xiaoliang;
      jiage = -1;
    }
    if (e.currentTarget.dataset.jiage != undefined
      && e.currentTarget.dataset.jiage != null
      && e.currentTarget.dataset.jiage != ''){
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
    if (this.data.selected1) {
      this.setData({
        selected1: false
      })
    }else{
      this.setData({
        selected: false,
        selected2: false,
        selected1: true,
        selected3: false,
        selectedbtn: false,
        selectedbtn2: false,
        selectedbtn1: true
      })
    }
  },
  selected2: function (e) {
    if (this.data.selected2) {
      this.setData({
        selected2: false
      })
    } else {
    this.setData({
      selected: false,
      selected1: false,
      selected2: true,
      selected3: false,
      selectedbtn: false,
      selectedbtn1: false,
      selectedbtn2: true,
    })
    }
  },
  selected3: function (e) {
    if (this.data.selected3) {
      this.setData({
        selected3: false
      })
    } else {
    this.setData({
      selected: false,
      selected1: false,
      selected2: false,
      selected3: true
    })
    }
  },
  //下拉
  onPullDownRefresh: function(e){
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
  onReachBottom:function(e) {
    var that = this;
    GetList(that);
  },

  //选择品类
  levelSelect: function(e) {
    var that = this;
    console.log(e);
    if (e.currentTarget.dataset.goodstype_id!=undefined
      && e.currentTarget.dataset.goodstype_id!=null
      && e.currentTarget.dataset.goodstype_id!=''){
      GOODSTYPE_ID = e.currentTarget.dataset.goodstype_id;
      var typeIndex = e.currentTarget.dataset.index;
      console.log(typeIndex);
      wx.request({
        url: app.IP + "chatGoods/listLevel",
        data: { GOODSTYPE_ID: GOODSTYPE_ID},
        success: function (res) {
          console.log(res.data);
          that.setData({
            goodsLevels: res.data.goodsLevels,
            typeIndex: e.currentTarget.dataset.index
          });
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
    } else if(e.currentTarget.dataset.index==-1){
      GOODSTYPE_ID='';
      GOODSLEVEL_ID='';
      that.setData({
        goodsLevels: '',
        typeIndex: -1,
        levelIndex:-1
      });
    }
    
  },
  //选择等级
  bindLevel: function(e) {
    GOODSLEVEL_ID = e.currentTarget.dataset.goodslevel_id
    this.setData({
      levelIndex: e.currentTarget.dataset.index
    })
  },
  //重置
  reset: function(e) {
    GOODSLEVEL_ID = "";
    GOODSTYPE_ID = "";
    this.setData({
      goodsLevels: [],
      levelIndex:-1,
      typeIndex:-1
    });
  },
  //点击确定
  submint: function(e) {
    GOODSLEVEL = GOODSLEVEL_ID;
    GOODSTYPE = GOODSTYPE_ID;
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
  back: function(e){
    keywords = "";
    wx.navigateBack({ changed: true });//返回上一页  
  }
})

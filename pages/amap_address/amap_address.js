// pages/amap_address/amap_address.js
var amapFile = require('../../utils/amap-wx.js');
var myAmapFun = new amapFile.AMapWX({ key: 'd83e81a457dc244325637496faab2c75' });

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips: {},
    nearby: {},
    location:{},
    address:"",
    content: true,
    content1: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    myAmapFun.getRegeo({
      success: function (data) {
        that.setData({
          address: data[0].name + ' ' + data[0].desc,
          location: data[0].longitude+","+data[0].latitude
        });
        myAmapFun.getPoiAround({
          querytypes: "汽车服务|汽车销售|汽车维修|摩托车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务 | 风景名胜 | 商务住宅 | 政府机构及社会团体 | 科教文化服务 |交通设施服务 | 金融保险服务 | 公司企业 | 道路附属设施 | 地名地址信息 | 公共设施",
          location: that.data.location,
          success: function (data) {
            //成功回调
            if (data && data.poisData) {
              that.setData({
                nearby: data.poisData
              });
            }
          },
          fail: function (info) {
            //失败回调
            console.log(info)
          }
        })
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
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
  bindInput: function (e) {
    var that = this;
    var keywords = e.detail.value;
    if (keywords == "") {
      that.setData({
        content: true,
        content1: false,
      });
    }else{
    myAmapFun.getInputtips({
      keywords: keywords,
      location: this.data.location,
      success: function (data) {
        if (data && data.tips) {
          that.setData({
            tips: data.tips,
            content1: true,
            content: false,
          });
        } else {
          that.setData({
            content: true,
            content1: false,
          });
        }
      },
      fail: function (info) {
        //失败回调
        that.setData({
          content: true,
          content1: false,
        });
      }
    })

    // myAmapFun.getPoiAround({
    //   querytypes: "汽车服务|汽车销售|汽车维修|摩托车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务 | 风景名胜 | 商务住宅 | 政府机构及社会团体 | 科教文化服务 |交通设施服务 | 金融保险服务 | 公司企业 | 道路附属设施 | 地名地址信息 | 公共设施",
    //   location: "117.186361,34.260681",
    //   querykeywords: keywords,
    //   success: function (data) {
    //     console.log(JSON.stringify(data))
    //     //成功回调
    //     if (data && data.poisData) {
    //       that.setData({
    //         tips: data.poisData
    //       });
    //     }
    //   },
    //   fail: function (info) {
    //     //失败回调
    //     console.log(info)
    //   }
    // })
    }
  },
  bindSearch: function (e) {
    var keywords = e.target.dataset.keywords;
    if (keywords==undefined){

    }else{
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2]  //上一个页面
      prevPage.setData({
        address: keywords
      })
      wx.navigateBack({
        delta: -1
      });
    }
  },
  bindSearch1: function (e) {
    var that = this;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]  //上一个页面
    prevPage.setData({
      address: that.data.address
    })
    wx.navigateBack({
      delta: -1
    });
  }
})
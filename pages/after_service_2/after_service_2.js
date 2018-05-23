// pages/after_service_2/after_service_2.js
var app = getApp();
var header = getApp().globalData.header;
Page({
  data: {
    appIP: app.IP,
    image1: false,
    image2: false,
    image3: false,
    addimage: true,
    image1_src: "",
    image2_src: "",
    image3_src: "",
    cause: "",
    remark: "",
    commodity_li_right_width: wx.getSystemInfoSync().windowWidth * 0.88 - 60,
    address_width: wx.getSystemInfoSync().windowWidth * 0.84 - 40,
    other_input_width: wx.getSystemInfoSync().windowWidth * 0.88 - 56,
    address_left: wx.getSystemInfoSync().windowWidth * 0.08 + 20,
    image_box_width: wx.getSystemInfoSync().windowWidth * 0.92 * 0.32,
    ORDERFORM_ID: "",
    orderDetailList: [],
    order: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ORDERFORM_ID: options.ORDERFORM_ID
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
    wx.showToast({
      title: "Loading...",
      icon: "loading",
      duration: 2000
    })
    // 页面显示
    var that = this;
    wx.request({
      url: this.data.appIP + 'chatOrder/gosellafter?ORDERFORM_ID=' + that.data.ORDERFORM_ID,
      // data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header, // 设置请求的 header
      success: function (res) {
        // success
        that.setData({
          order: res.data.order,
          orderDetailList: res.data.orderDetailList
        })
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
    })
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
  showcause: function () {
    var that = this;
    var itemList = ['不想要了', '买错了', '没收到货', '与说明不符'];
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        console.log(res.tapIndex)
        that.setData({
          cause: itemList[res.tapIndex]
        });
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0];
        if (!that.data.image1) {
          if (that.data.image2 && that.data.image3) {
            that.setData({
              addimage: false
            })
          }
          that.setData({
            image1: true
           // image1_src: tempFilePaths
          });
          that.uploadSellafterImg(tempFilePaths, "image1_src");
        } else {
          if (!that.data.image2) {
            if (that.data.image1 && that.data.image3) {
              that.setData({
                addimage: false
              })
            }
            that.setData({
              image2: true
              //image2_src: tempFilePaths
            });
            that.uploadSellafterImg(tempFilePaths, "image2_src");
          } else {
            if (!that.data.image3) {
              if (that.data.image1 && that.data.image2) {
                that.setData({
                  addimage: false
                })
              }
              that.setData({
                image3: true
               // image3_src: tempFilePaths
              });
              that.uploadSellafterImg(tempFilePaths, "image3_src");
            }
          }
        }

      }
    })
  },
  delimage1: function () {
    this.setData({
      image1: false,
      image1_src: "",
      addimage: true
    })
  },
  delimage2: function () {
    this.setData({
      image2: false,
      image2_src: "",
      addimage: true
    })
  },
  delimage3: function () {
    this.setData({
      image3: false,
      image3_src: "",
      addimage: true
    })
  },
  uploadSellafterImg: function (imageParth,img_src){
    var that = this;
    // var data = {
    //   ORDERFORM_ID: that.data.ORDERFORM_ID,
    // };
    wx.uploadFile({
      url: app.IP + 'chatOrder/uploadSellafterImg',
      filePath: imageParth,
      name: 'file',
      header: {
        'Cookie': '',
        'Content-Type': 'multipart/form-data'
      },
      //formData: data,
      success: function (res) {
       var resdata = JSON.parse(res.data);
       if (resdata.result == "true"){
          console.log(img_src == "image1_src");
          if (img_src == "image1_src"){
            that.setData({
              image1_src: resdata.SELLAFTER_IMG
            });
            console.log(that.data.image1_src);
          }
          if (img_src == "image2_src") {
            that.setData({
              image2_src: resdata.SELLAFTER_IMG
            });
          }
          if (img_src == "image3_src") {
            that.setData({
              image3_src: resdata.SELLAFTER_IMG
            });
          }

       }
      },
      fail: function (res) {
        wx.showToast({
          title: '上传失败',
          duration:1500
        })
      }

    });
  }
  ,
  AddSellafter: function () {
    var that = this;
    var data = {
      PROBLEM_DESC: that.data.cause,
      REMARK: that.data.remark,
      TITLE: that.data.order.ORDER_NO,
      ORDERFORM_ID: that.data.ORDERFORM_ID,
      SELLAFTER_IMG1: that.data.image1_src,
      SELLAFTER_IMG2: that.data.image2_src,
      SELLAFTER_IMG3: that.data.image3_src
    };

    wx.request({
      url: app.IP + 'chatOrder/buyerAddSellafter',
      data: data,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header,  // 设置请求的 
      success: function (res) {
        // success
        if (res.data.result == "true") {
          wx.navigateTo({
            url: '../after_service_management/after_service_management',
          })
        } else {//未登录
          wx.showToast({
            title: res.data.result,
            duration: 1500
          });
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
  remarkBlur: function(e){
    var remark = e.detail.value;
    this.setData({
      remark: remark
    });
  }
})
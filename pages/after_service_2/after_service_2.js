// pages/after_service_2/after_service_2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image1: false,
    image2: false,
    image3: false,
    addimage: true,
    image1_src:"",
    image2_src:"",
    image3_src:"",
    cause:"",
    commodity_li_right_width: wx.getSystemInfoSync().windowWidth * 0.88 - 60,
    address_width: wx.getSystemInfoSync().windowWidth * 0.84 - 40,
    other_input_width: wx.getSystemInfoSync().windowWidth * 0.88 - 56,
    address_left: wx.getSystemInfoSync().windowWidth * 0.08 + 20,
    image_box_width: wx.getSystemInfoSync().windowWidth * 0.92*0.32,
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  showcause:function(){
    var that = this;
    var itemList = ['不想要了', '买错了', '没收到货','与说明不符'];
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
  chooseImage:function(){
    var that=this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        if (!that.data.image1) {
          if (that.data.image2 && that.data.image3) {
            that.setData({
              addimage: false
            })
          }
          that.setData({
            image1:true,
            image1_src: tempFilePaths
          })
        }else{
          if (!that.data.image2) {
            if (that.data.image1 && that.data.image3) {
              that.setData({
                addimage: false
              })
            }
            that.setData({
              image2: true,
              image2_src: tempFilePaths
            })
          }else{
            if (!that.data.image3) {
              if (that.data.image1 && that.data.image2) {
                that.setData({
                  addimage: false
                })
              }
              that.setData({
                image3: true,
                image3_src: tempFilePaths
              })
            }
          }
        }
        
      }
    })
  },
  delimage1:function(){
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
  }
})
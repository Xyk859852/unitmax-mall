function getUserInfo(e) {
  console.log(e);
  var user = wx.getStorageSync("user");
  //var user = null;
  if (user != undefined && user != '' && user != null) {
    console.log(user);
    wx.redirectTo({
      url: '../mine/mine'
    });
  } else {

    // if (e.detail.errMsg == "getUserInfo:ok") {
    //   wx.setStorageSync("wxuser", e.detail.userInfo);
    //   console.log(e);
    //   console.log(e.detail.userInfo);
      
    // } else {
    //   console.log("拒绝授权");
    //   wx.navigateTo({
    //     url: '../binding_phone/binding_phone?updatePhone=true'
    //   })
    // }
  }


  // // if (user != undefined && user != '' && user != null) {
  // //   console.log(user);
  // //   wx.redirectTo({
  // //     url: '../mine/mine'
  // //   })
  // // }else{
  // if (e.detail.errMsg == "getUserInfo:ok") {
  //   wx.setStorageSync("wxuser", e.detail.userInfo);
  //   console.log(wx.getStorageSync("wxuser"));
  //   wx.navigateTo({
  //     url: '../binding_phone/binding_phone?updatePhone=true'
  //   })
  // } else {
  //   console.log("拒绝授权");
  //   wx.navigateTo({
  //     url: '../binding_phone/binding_phone?updatePhone=true'
  //   })

  //   // wx.openSetting({
  //   //   success: function (res) {
  //   //     if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
  //   //       //这里是授权成功之后 填写你重新获取数据的js
  //   //       //参考:
  //   //       // that.getLogiCallback('', function () {
  //   //       //   callback('')
  //   //       // })
  //   //     }
  //   //   }
  //   // })
  // }
  // //}

}

function goMinePage(e){
  var user = wx.getStorageSync("user");
  if (user != undefined && user != '' && user != null) {
    wx.redirectTo({
      url: '../mine/mine'
    });
  } else {
    wx.navigateTo({
      url: '../binding_phone/binding_phone?updatePhone=true&fromPage=mine',
    })
  }
}

function gohome(e) {
  wx.redirectTo({
    url: '../home/home'
  })
}

function gocategory(e) {
  wx.redirectTo({
    url: '../category/category'
  })
}

function gocommodity(e) {
  wx.redirectTo({
    url: '../commodity/commodity'
  })
}

function goshoppingcart(e) {
  var user = wx.getStorageSync("user");
  if (user != undefined && user != '' && user != null) {
    wx.redirectTo({
      url: '../shopping_cart/shopping_cart'
    });
  } else {
    wx.navigateTo({
      url: '../binding_phone/binding_phone?updatePhone=true&fromPage=shopping_cart',
    });
  }
  // var that = this;
  // var user = wx.getStorageSync("user");
  // if (user != undefined && user != '' && user != null) {
  //   console.log(user);
  //   wx.redirectTo({
  //     url: '../shopping_cart/shopping_cart'
  //   })
  // } else {
  //   console.log(e);
  //   if (e.detail.errMsg == "getUserInfo:ok") {
  //     wx.setStorageSync("wxuser", e.detail.userInfo);
  //     console.log(wx.getStorageSync("wxuser"));
  //     wx.navigateTo({
  //       url: '../binding_phone/binding_phone'
  //     })
  //   } else {
  //     console.log("拒绝授权");
  //     wx.openSetting({
  //       success: function (res) {
  //         if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
  //           //这里是授权成功之后 填写你重新获取数据的js
  //           //参考:
  //           // that.getLogiCallback('', function () {
  //           //   callback('')
  //           // })
  //         }
  //       }
  //     })
  //   }
  // }

}
module.exports.getUserInfo = getUserInfo
module.exports.gohome = gohome
module.exports.gocommodity = gocommodity
module.exports.gocategory = gocategory
module.exports.goshoppingcart = goshoppingcart
module.exports.goMinePage = goMinePage


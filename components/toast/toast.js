// components/toast/toast.js
let _compData={
  '_toast_.isHide':false,
  '_toast_.content':''
}
let toastPannel={
  //toast显示的方法
  showtoast:function(data){
    let self=this;
    this.setData({'_toast_.isHide':true,'_toast_.content':data});
    setTimeout(function(){
      self.setData({ '_toast_.isHide': false})
    },3000)
  }
}
function ToastPannel(){
  //拿到当前页面对象
  let pages=getCurrentPages();
  let curPage=pages[pages.length-1];
  this._page=curPage;
  Object.assign(curPage,toastPannel);
  curPage.toastPannel=this;
  curPage.setData(_compData);
  return this;
}
module.exports.ToastPannel = ToastPannel;
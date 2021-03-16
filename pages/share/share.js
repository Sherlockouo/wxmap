// pages/message/message.js
const app = getApp()
var consoleUtil = require('../../utils/consoleUtil.js');
var constant = require('../../utils/constant.js');
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    imageMaxNum: 6,
    toupload: false,
    region:[],
    pics:[],
    province: '',
    city: '',
    type: '',
    street: '',
    latitude: 0,
    longtitude: 0,
    shareTitle:"",
    shareText:"",
    shareLocal:"成都市郫都区红光镇红光大道9999号"
  },

  /**
   * 预览图片
   */
  previewImage: function () {
    var that = this;
    wx.previewImage({
      urls: that.data.pics,
    })
  },

  /**
   * 选择照片
   */
  takePhoto: function () {
    var that = this;
    var ps = [];
    var pics = that.data.pics;
    if (that.data.pics.length >= that.data.imageMaxNum) {
      wx.showToast({
        title: '最多选择' + that.data.imageMaxNum + '张！',
      })
      return;
    }
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      count: that.data.imageMaxNum-that.data.pics.length,
      success: function (res) {
        var imgs = res.tempFilePaths;
        console.log("images ",imgs.length)
        for (var i = 0; i < imgs.length; i++) {
          ps.push(imgs[i])
        }
        for(var i = 0;i<pics.length;i++){
          ps.push(pics[i])
        }
        that.setData({
          pics: ps,
          toupload: true,
        })
        // console.log("fileupload ",res.tempFilePaths[0])
        // that.adjustViewStatus(false, true, false);
      },
    })
  },

  /**
   * 删除已选照片
   */
  deleteSelectImage: function () {
    this.resetPhoto();
  },

  /**
   * 重置照片
   */
  resetPhoto: function () {
    var that = this;
    that.setData({
      uploadImagePath: '',
    })
  },

  previewSelectImage: function (key) {
    var that = this;
    wx.previewImage({
      urls: that.data.pics,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      shareLocal:options.address,
      city: options.city,
      street: options.street
    })
  },
  Stable :function(e)
  {
    wx.navigateTo({
      url: '/pages/table/table'
    })
  },
  Slocal :function(e)
  {
    wx.navigateTo({
      url: '/pages/chooseAddress/chooseAddress?city='+this.data.city+'&street='+this.data.street
    })
  },
  post:function(){
    var that = this
    console.log("shit text ",that.data.shareText)
    var fs = [];
    console.log('globaldata ',app.globalData.token)
    // var token = app.globalData.token;
    var token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3ZGYuY29kZXJAZ21haWwuY29tIiwiZXhwIjoxNjE1OTA0NTI4LCJpYXQiOjE2MTU4ODY1Mjh9.rqxD7Z2erS_ymPfRP9Zk0-wmpxfKMeD-382U5wilTN440DvQS2Q6uC-7CRsCZUl37kT8sqIfhzz91C-hQ1beNg'
    if(token==null||token==''){
      wx.showModal({
        content:'请重新登录',
        confirmText: '确定',
        cancelColor: 'red',
      })
      wx.navigateTo({
        url: '/pages/man/man',
      })
      return ;
    }
    var ps = that.data.pics;
    for(var i=0;i<ps.length;i++){
      console.log(ps[i])
    wx.uploadFile({
      url: 'https://storymap.sherlockouo.com/upload/files',
      method: 'POST',
      header:{
        Authorization:token,
      },
      name: 'files',
      filePath: ps[i],
      success(res){
        console.log("success upload files",res)
      },
      fail(res){
        console.log("fails to upload ",res)
      }
    })
  }
    // 等上面ok了再测试下面的
    // wx.request({
    //   url: 'https://storymap.sherlockouo.com/poster/post', //仅为示例，并非真实的接口地址
    //   method: 'POST',
    //   data: {
    //     title: that.data.shareTitle,
    //     message: that.data.shareText,
    //     type: "lost",
    //     address: that.data.shareLocal,
    //     latitude: 115.88367580795743,
    //     longtitude: 35.688365773824085,
    //     files: fs,
    //   },
    //   header: {
    //     'Authorization': token,
    //     'content-type': 'application/x-www-form-urlencoded' 
    //   },
    //   success (res) {
    //     console.log('markers',res.data)
    //   }
    // })
  },
  // 使页面显现的函数
  // changeView: function(e){
  //   var that = this
  //   if(that.data.isHide==true){
  //     that.setData({
  //       isHide:false
  //     })
  //   }else{
  //     that.setData({
  //       isHide:true
  //     })
  //   }
  //   console.log("clicked change view :",that.data.isHide)
  // },
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

})
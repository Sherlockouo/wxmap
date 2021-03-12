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
    region:[],
    province: '',
    city: '',
    latitude: '',
    longitude: '',
    shareTitle:"",
    shareText:"",
    shareLocal:"成都市郫都区红光镇红光大道9999号"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
     
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
      url: '/pages/chooseAddress/chooseAddress'
    })
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

  }
})
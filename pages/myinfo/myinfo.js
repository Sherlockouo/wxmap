// pages/addOrEditUser/addOrEditUser.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    titleInfo: "添加用户信息",
    userhead:"",
    username:"",//用户默认名称
    // 省市区三级联动初始化
    region: ["四川省", "成都市", "郫都区"],
    introduce:"留下你的足迹吧~"
  },
 
  //设置用户详情页的图片信息
  setbackground:function()
  {
    console.log("点击设置图片")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.data.sex[0].checked=true;
    this.setData({
       userhead:app.globalData.userInfo.avatar,
       username:app.globalData.userInfo.nickname,
       date:app.globalData.userInfo.birthday,
       head:app.globalData.userInfo.bgimg,
       introduce:app.globalData.userInfo.motto
    })
    var local=app.globalData.userInfo.addres;
    local.split('.')
    console.log( local.split('.'));
  
    
  },
   // 选择省市区函数
   changeRegin(e){
    this.setData({ region: e.detail.value });
  },
  imgShow:function(event)
  {
   console.log("点击");
   console.log(event.currentTarget.dataset.url)
   var currentUrl=event.currentTarget.dataset.url
   this.setData({
     imgList:currentUrl
   })
   wx.previewImage({
    current:currentUrl, // 当前显示图片的http链接
    urls:[currentUrl]// 需要预览的图片http链接列表
  })
  },

  changeDate(e){
    this.setData({ date:e.detail.value});
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
  addUser: function(){
    var that = this;
   
  },
})
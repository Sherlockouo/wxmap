// pages/addOrEditUser/addOrEditUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2018-10-01',
    titleInfo: "添加用户信息",
    password: "",
    password_check: "",
    password_show: false,
    userhead:"",
    username:"",//用户默认名称
    // 省市区三级联动初始化
    region: ["四川省", "成都市", "郫都区"],
  },
  // 性别变化更改
  radioChange: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    const sex = this.data.sex
    for (let i = 0, len = sex.length; i < len; ++i) {
      sex[i].checked = sex[i].id == e.detail.value
    }
    this.setData({
      sex
    })
    console.log(this.data.sex);
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
       userhead:options.userinfoimg,
       username:options.username
    })
    
    
  },
   // 选择省市区函数
   changeRegin(e){
    this.setData({ region: e.detail.value });
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
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  passwordCheckInput: function (e) {
    this.setData({
      password_check: e.detail.value
    });
  } 
})
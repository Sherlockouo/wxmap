// pages/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vaHe:0,  //导航菜单高度
    inputHe:0,  //输入框高度
    myname:'Another Drmension',
    current: 0,  //当前所在页面的 index
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 800, //滑动动画时长
    circular: true, //是否采用衔接滑动
    imgUrls: [
      'http://qwq.fjtbkyc.net/public/personalBlog/images/zuopin/portfolio6.jpg',

      'http://qwq.fjtbkyc.net/public/personalBlog/images/zuopin/portfolio3.jpg',

      'http://qwq.fjtbkyc.net/public/personalBlog/images/zuopin/portfolio5.jpg'

    ],
    links: [
      '/pages/preview/preview',
    ],
    essay_title:"这就是标题啦",
    essay_text:"我特别喜欢春天，春天到了，万物复苏！",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("current markid is ",app.globalData.currentMarkerId)
    var data = wx.getMenuButtonBoundingClientRect()
    var WH=wx.getSystemInfoSync()
    this.setData({
      // 获取导航栏高度
      vaHe:data.bottom+10,
      inputHe:data.bottom-data.top,
      // Sheight: (WH.windowHeight),
      // Swidth: (WH.windowWidth)
    })
    console.log(this.data.vaHe);
  },
  swiperChange: function(e) {

    this.setData({

      swiperCurrent: e.detail.current

    })

  },

  //点击指示点切换

  chuangEvent: function(e) {

    this.setData({

      swiperCurrent: e.currentTarget.id

    })

  },

  //点击图片触发事件

  swipclick: function(e) {

    console.log(this.data.swiperCurrent);

    wx.switchTab({

      url: this.data.links[this.data.swiperCurrent]

    })

  },
  preview:function(e)
  {
    wx.navigateTo({
      url: '/pages/preview/preview?imgurl='+this.data.imgUrls[0]
    })
    console.log(e);
  },
  deback:function(e){

   wx.switchTab({
      url: '/pages/trends/trends'
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

  }
})
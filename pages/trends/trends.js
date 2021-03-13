// pages/trends/trends.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: [{
      id:1,
      imgurl:"http://qwq.fjtbkyc.net/public/personalBlog/images/zuopin/portfolio6.jpg",
      title:"这是title1",
      handimg:"http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog9.jpg",
      username:"Frightly",
      like:1034,
      concern:10
    },
    {
      id:2,
      imgurl:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1868271530,1508234125&fm=26&gp=0.jpg",
      title:"这是title2",
      handimg:"http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg",
      username:"Brank",
      like:112,
      concern:10
    },
    {
      id:3,
      imgurl:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1868271530,1508234125&fm=26&gp=0.jpg",
      title:"这是title3",
      handimg:"http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg",
      username:"Brank",
      like:112,
      concern:10
    },
    {
      id:4,
      imgurl:"http://qwq.fjtbkyc.net/public/personalBlog/images/zuopin/portfolio3.jpg",
      title:"这是title4",
      handimg:"http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg",
      username:"Brank",
      like:112,
      concern:10
    },
    {
      id:5,
      imgurl:"http://qwq.fjtbkyc.net/public/personalBlog/images/zuopin/portfolio3.jpg",
      title:"这是title5",
      handimg:"http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg",
      username:"Brank",
      like:112,
      concern:10
    },
    {
      id:6,
      imgurl:"http://qwq.fjtbkyc.net/public/personalBlog/images/zuopin/portfolio3.jpg",
      title:"这是title6",
      handimg:"http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg",
      username:"Brank",
      like:112,
      concern:10
    }
    ],
    lostnavbar:[
      {
      id:1,
      imgurl:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1750936640,4186342694&fm=26&gp=0.jpg",
      title:"丢失一把雨伞",
      handimg:"http://www.fjtbkyc.net/mywx/services1.png",
      username:"bigSur",
      like:1034,
      concern:10
      },
      {
        id:1,
      imgurl:"http://www.fjtbkyc.net/mywx/phonegp.jpg",
      title:"捡到一部手机",
      handimg:"http://www.fjtbkyc.net/mywx/konjian.png",
      username:"Jone",
      like:1034,
      concern:10
      },
    ],
    currentTab: 0,
    tal:0,
    ac1:1,
    ac2:0,
    cTab:0,
    shareCount:1,
    lostCount:2,
  },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    console.log(e.currentTarget.dataset);
  },
  active1:function(e)
  {
    this.setData({
      ac1:1,
      ac2:0,
      cTab: 0
    })
  },
  active2:function(e)
  {
    this.setData({
      ac1:0,
      ac2:1,
      cTab: 1
    })
  },
  goDetail:function(e)
  {
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
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

  }
})
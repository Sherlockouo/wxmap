// pages/trends/trends.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: [{
      id:1,
      imgurl:"https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00528-2613.jpg",
      title:"这是title1",
      handimg:"http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog9.jpg",
      username:"Frightly",
      like:1034,
      concern:10
    },
    {
      id:2,
      imgurl:"https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00523-2175.jpg",
      title:"这是title2",
      handimg:"http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg",
      username:"Brank",
      like:112,
      concern:10
    }
    ],
    currentTab: 0,
    tal:0,
    ac1:1,
    ac2:0,
    shareCount:5,
    lostCount:0
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
      currentTab: 0
    })
  },
  active2:function(e)
  {
    this.setData({
      ac1:0,
      ac2:1,
      currentTab: 1
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
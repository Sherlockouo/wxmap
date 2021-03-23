// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      bacurl: 'http://www.fjtbkyc.net/mywx/clients-section-bg1.jpg', // 背景图片连接
      headimg: 'http://www.fjtbkyc.net/mywx/dog.jpg', //头像链接
      username: 'Another 小明',
      local:"宜宾", //用户来自城市
      concern:10, //用户关注的人数
      like:80, //用户粉丝数
      introduce:"该用户很懒，还没留下任何东西哦~该用户很懒，还没留下任何东西哦~该用户很懒，还没留下任何东西哦~",//用户介绍，最多50个字
    },
    isconcern: '+关注', //按钮的文字内容
    concernAc: 0,

  },
  //点击关注按钮调用
  concern: function (e) {

    if (this.data.concernAc == 0) {
      this.setData({
        concernAc: 1,
        isconcern: '已关注'
      })
    }
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
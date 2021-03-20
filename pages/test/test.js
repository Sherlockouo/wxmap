// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     essayall:
      {
        imgUrls: [
          'http://qwq.fjtbkyc.net/public/personalBlog/images/zuopin/portfolio6.jpg',
          'http://qwq.fjtbkyc.net/public/personalBlog/images/zuopin/portfolio3.jpg',
          'http://qwq.fjtbkyc.net/public/personalBlog/images/zuopin/portfolio5.jpg',
          'http://www.fjtbkyc.net/mywx/sunny5.jpg'
        ],
        essay_title:"这就是标题啦",
        essay_text:"花香四溢的春天来了，我的家乡到处是一片欣欣向荣的景象。石川河的柳树开始发芽了，鸡子山的草儿也偷偷地钻了出来，各种各样的花儿也悄悄地开放 了。你看那河的沿岸和山脚下：粉红的桃花、雪白的梨花、娇艳的海棠花......都开得笑盈盈的。",
      },
    hidden: false,
    imgList: [],
    autoplay: false,
    indicatordots: false,
    duration: 500
  },

  onLoad: function () {
    var that = this;
    // var videoUrl = "请求的接口地址";
    // Api.http(videoUrl, (res) => {
      that.setData({
        hidden: true,
        imgList: this.data.essayall.imgUrls,
      })
    // })
  },

  onSlideChange: function (event) { 
    var postId = event.detail.current; 
    console.log(postId);
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
    }
    return {
      title: "真好",
      path: 'pages/mypage/mypage'
    }
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
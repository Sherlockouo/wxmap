const app = getApp()
let result = {};
Page({
  data: {
    search_btn: true,
    search_friend: false,
    show_mask: false,
    chatbackground:"http://qwq.fjtbkyc.net/image/bgimg/chatbac2.jpg",
    //消息列表
    groupList: [{
        headimg: "http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg", //用户头像
        name: "晴空一线",
        lastmessage: "明天有空吗，可以约你出来", //代表最后的一条消息
        id: 2,
        countmessage: 6, //未读消息数量,
      },
      {
        headimg: "http://www.fjtbkyc.net/mywx/dog.jpg", //用户头像
        name: "Another Dersion",
        lastmessage: "明天有空哦，等你！",
        id: 34,
        countmessage: 0 //是否存在未读消息
      },
      {
        headimg: "http://qwq.fjtbkyc.net/image/headimg/003.jpg", //用户头像
        name: "Another Dersion",
        lastmessage: "明天有空哦，等你！",
        id: 34,
        countmessage: 0 //是否存在未读消息
      },
      {
        headimg: "http://qwq.fjtbkyc.net/image/headimg/004.jpg", //用户头像
        name: "Another Dersion",
        lastmessage: "明天有空哦，等你！",
        id: 34,
        countmessage: 0 //是否存在未读消息
      },
      {
        headimg: "http://qwq.fjtbkyc.net/image/headimg/007.jpg", //用户头像
        name: "一骑绝尘",
        lastmessage: "明天有空哦，等你！",
        id: 34,
        countmessage: 0 //是否存在未读消息
      },
      {
        headimg: "http://qwq.fjtbkyc.net/image/headimg/008.jpg", //用户头像
        name: "Fubure",
        lastmessage: "明天有空哦，等你！",
        id: 34,
        countmessage: 0 //是否存在未读消息
      },
      {
        headimg: "http://qwq.fjtbkyc.net/image/headimg/009.jpg", //用户头像
        name: "空",
        lastmessage: "明天有空哦，等你！",
        id: 34,
        countmessage: 0 //是否存在未读消息
      }

    ], // 聊天室列表
    userid: "" //根据用户id渲染消息列表
  },

  onLoad: function (option) {
    wx.showLoading({
      title: '消息列表加载中'
    })
    setTimeout(function () {
      wx.hideLoading({
        success: (res) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
    }, 1000);
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#1ba1f0',
      animation: {
        duration: 300,
        timingFunc: 'easeIn'
      }
    })
    this.setData({
      userid: option.userid
    });
  },

  onShow: function () {
    // this.listGroups();
    this.listChatrooms();
  },

  //列出所有聊天室
  listChatrooms() {



  },

  openSearch: function () {
    this.setData({
      search_btn: false,
      search_friend: true,
      show_mask: true
    });
  },

  cancel: function () {
    this.setData({
      search_btn: true,
      search_friend: false,
      show_mask: false
    });
  },

  // close_mask: function () {
  //   this.setData({
  //     search_btn: true,
  //     search_friend: false,
  //     show_mask: false
  //   });
  // },
  //进入聊天页面
  into_room: function (e) {
    wx.navigateTo({
      url: '/pages/chat/chat?userid=' + 1,
    })
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
    this.onShow(); //重新加载onLoad()
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

});
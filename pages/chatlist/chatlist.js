const app = getApp()
let result = {};
Page({
  data: {
    search_btn: true,
    search_friend: false,
    show_mask: false,
    chatbackground:"http://qwq.fjtbkyc.net/image/bgimg/chatbac2.jpg",
    //消息列表
    groupList: [
      // {
      //   headimg: "http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg", //用户头像
      //   name: "晴空一线",
      //   lastmessage: "我找到了你的无人机!", //代表最后的一条消息
      //   id: 2,
      //   countmessage: 6, //未读消息数量,
      // },
      // {
      //   headimg: "http://www.fjtbkyc.net/mywx/dog.jpg", //用户头像
      //   name: "Another Dersion",
      //   lastmessage: "明天有空哦，你来找我拿吧！",
      //   id: 34,
      //   countmessage: 0 //是否存在未读消息
      // },
      // {
      //   headimg: "http://qwq.fjtbkyc.net/image/headimg/003.jpg", //用户头像
      //   name: "明天有空",
      //   lastmessage: "我在成都市郫都区！",
      //   id: 34,
      //   countmessage: 0 //是否存在未读消息
      // },
      // {
      //   headimg: "http://qwq.fjtbkyc.net/image/headimg/004.jpg", //用户头像
      //   name: "Another Dersion",
      //   lastmessage: "明天有空哦，等你！",
      //   id: 34,
      //   countmessage: 0 //是否存在未读消息
      // },
      // {
      //   headimg: "http://qwq.fjtbkyc.net/image/headimg/007.jpg", //用户头像
      //   name: "一骑绝尘",
      //   lastmessage: "明天有空哦，等你！",
      //   id: 34,
      //   countmessage: 0 //是否存在未读消息
      // },
      // {
      //   headimg: "http://qwq.fjtbkyc.net/image/headimg/008.jpg", //用户头像
      //   name: "Fubure",
      //   lastmessage: "明天有空哦，等你！",
      //   id: 34,
      //   countmessage: 0 //是否存在未读消息
      // },
      // {
      //   headimg: "http://qwq.fjtbkyc.net/image/headimg/009.jpg", //用户头像
      //   name: "空",
      //   lastmessage: "明天有空哦，等你！",
      //   id: 34,
      //   countmessage: 0 //是否存在未读消息
      // }

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
    var that = this
    var baseUrl = app.globalData.baseUrl;
  var token = app.globalData.token;
    // this.listGroups();
    this.listChatrooms();
    wx.request({
      url: baseUrl+"/chatlog/all",
      method: "GET",
      header:{
        "Authorization": token
      },
      data: {
        pageNum: 1,
        pageSize: 100,
        // toUserId: 3
      },
      success(res) {
          
        
         var ls = res.data.data;
         console.log("list ",ls)
        for (var t in ls) {
          var key = ls[t];
          console.log("msg ",key);
          key.headimg = key.senduser.avatar;
          key.name = key.senduser.nickname;
          key.lastmessage=key.sendtext;
          key.countmessage = 0;
          key.id = key.senduser.id
        }
        console.log("ls ",ls)
        that.setData({
          groupList: ls
        })
      },
      fail:{
  
      }
    })
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
    //获取点击的用户的id 进入聊天界面
    var userid = e.currentTarget.dataset.roomid
    wx.navigateTo({
      url: '/pages/chat/chat?userid=' + userid,
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
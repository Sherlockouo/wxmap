// pages/message/message.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
          
              app.globalData.userInfo = res.userInfo
              that.setData({
                userInfo: res.userInfo,
              })
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },
  wxlogin: function(e){
    if(e.detail.userInfo){
      var that = this
      wx.login({
        success: res => {
          // 获取到用户的 code 之后：res.code
          console.log("用户的code:" + res.code);
          // 可以传给后台，再经过解析获取用户的 openid
          // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
          wx.request({
              // 自行补上自己的 APPID 和 SECRET
              url: 'https://storymap.sherlockouo.com/user/login',
              method: "POST",
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              data:{
                wxcode:res.code
              },
              success: res => { 
                // 获取到用户的信息了，打印到控制台上看下
                  console.log("用户的信息如下：");
                  console.log(e.detail.userInfo);
                  //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
                  that.setData({
                    isHide: false,
                    userInfo: e.detail.userInfo
                  });
                  // 获取到用户的 openid
                  if(res.code==0){
                  console.log("用户的token " + res.token);
                  }else{
                    console.log("msg ",res.data.msg);
                  }
              },
              fail: res=>{
                  console.log("shit failed");
              }
          });
        }
      });
    
  } else {
    //用户按了拒绝按钮
    wx.showModal({
      title: '警告',
      content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
      showCancel: false,
      confirmText: '返回授权',
      success: function(res) {
        // 用户没有授权成功，不需要改变 isHide 的值
        if (res.confirm) {
          console.log('用户点击了“返回授权”');
        }
      }
    });
  }
  },

  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      var email = ''
      wx.showModal({
        title: '绑定邮箱',
        content: '请输入你的邮箱',
        editable: true,
        success (res) {
          if (res.confirm) {
            email = res.content;
            wx.login({
              success: res => {
                // 获取到用户的 code 之后：res.code
                console.log("用户的code:" + res.code);
                // 可以传给后台，再经过解析获取用户的 openid
                // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                wx.request({
                    // 自行补上自己的 APPID 和 SECRET
                    url: 'https://storymap.sherlockouo.com/user/register',
                    method: "POST",
                    header: {
                      'content-type': 'application/x-www-form-urlencoded' // 默认值
                    },
                    data:{
                      wxcode:res.code,
                      email:email
                    },
                    success: res => {
                        // 获取到用户的 openid
                        console.log("用户的openid:" + res.data);
                         // 获取到用户的信息了，打印到控制台上看下
                        console.log("用户的信息如下：");
                        console.log(e.detail.userInfo);
                        //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
                        that.setData({
                          isHide: false,
                          userInfo: e.detail.userInfo
                        });
                    },
                    fail: res=>{
                        console.log("shit failed");
                    }
                });
              }
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }},
          fail(res){
            
          }
        
      })
     
     
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  /**
  * 自定义函数
  */
  myinfopage:function(){
    wx.navigateTo({
      url: '/pages/share/share',
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
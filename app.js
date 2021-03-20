// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
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
              wxcode:res.code
            },
            success: res => { 
              
                console.log(res)
                // 获取到用户的 openid
                if(res.data.code==0){
                  // app.globalData.token = res.data.token;
                  wx.setStorage({
                    data: res.data.token,
                    key: 'token',
                  })
                 
                }else{
                  
                  console.log(" something goes wrong msg ",res.data.msg);
                }
            },
            fail: res=>{
                console.log("shit failed");
            }
        });
      
      }
    });
  
    this.globalData.token=wx.getStorageSync('token')
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    currentMarkerId:0,
    token:'',
    isHide:0,//登录状态
  }
})

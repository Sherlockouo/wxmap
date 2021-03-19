// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sharenavbar: [{
      id:1,
      imgurl:"http://qwq.fjtbkyc.net/public/personalBlog/images/zuopin/portfolio6.jpg",
      title:"艺术大楼，秋意浓浓，艺术大楼，秋意浓浓",
      handimg:"http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog9.jpg",
      username:"Frightly",
      local:'四川省成都市高新区西源大道2006号',
      like:1034,
      concern:10
    },
    {
      id:2,
      imgurl:"http://www.fjtbkyc.net/mywx/sunny5.jpg",
      title:"湖边生活悠闲自得",
      handimg:"http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg",
      username:"Brank",
      local:'成都市郫都区太双路与蜀新大道交叉路口',
      like:112,
      concern:10
    },
    {
      id:3,
      imgurl:"http://www.fjtbkyc.net/mywx/sunny4.jpg",
      title:"西华四舍",
      handimg:"http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg",
      username:"Brank",
      local:'四川省成都市高新区西源大道2006号',
      like:112,
      concern:10
    },
    {
      id:4,
      imgurl:"http://qwq.fjtbkyc.net/public/personalBlog/images/zuopin/portfolio3.jpg",
      title:"这是title4",
      handimg:"http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg",
      username:"Brank",
      local:'贵阳市观山湖区金阳新区观山大桥',
      like:112,
      concern:10
    },
    {
      id:5,
      imgurl:"http://www.fjtbkyc.net/mywx/sunny.jpg",
      title:"这是title5",
      handimg:"http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg",
      username:"Brank",
      local:'四川省成都市大邑县西岭镇',
      like:112,
      concern:10
    },
    {
      id:6,
      imgurl:"http://www.fjtbkyc.net/mywx/sunny2.jpg",
      title:"这是title6",
      handimg:"http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg",
      username:"Brank",
      local:'四川省成都市金牛区西华大道16号',
      like:112,
      concern:10
    }
    ],
    lostnavbar:[
      {
      id:1,
      imgurl:"http://www.fjtbkyc.net/mywx/umber.jpg",
      title:"丢失一把雨伞",
      handimg:"http://www.fjtbkyc.net/mywx/services1.png",
      username:"bigSur",
      local:'四川省成都市青羊区光华大道与光耀三路路口',
      like:1034,
      concern:10
      },
      {
        id:1,
      imgurl:"http://www.fjtbkyc.net/mywx/phone17.jpg",
      title:"捡到一部手机",
      handimg:"http://www.fjtbkyc.net/mywx/konjian.png",
      username:"Jone",
      local:'四川省成都市郫都区红光街道广场路北三段188号',
      like:1034,
      concern:10
      },
    ],
    userInfo: {},
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    navbar: ['我的分享', '失物招领'],
    currentTab: 0,
    tal:0,
    shareCount:1,   //分享的数量
  },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  //事件处理函数
  bindViewTap: function() {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
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
              url: 'https://storymap.sherlockouo.com/user/register',
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
                  
                  console.log(res)
                  // 获取到用户的 openid
                  if(res.data.code==0){
                    app.globalData.token = res.data.token;
                    wx.setStorage({
                      data: res.data.token,
                      key: 'token',
                    })
                    //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
                  that.setData({
                    isHide: false,
                    userInfo: e.detail.userInfo
                  });
                    // app.globalData.token = res.data.token;
                  console.log("用户的token " + app.globalData.token);
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
  goDetail:function(e)
  {
    var pagid=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/detail?pageid='+pagid,
    })
  },
  /**
  * 自定义函数
  */
  myinfopage:function(){
    wx.navigateTo({
      url: '/pages/myinfo/myinfo',
    })
  },
  toH :function(e)
  {
    wx.navigateTo({
      url: '/pages/hoard/hoard'
    })
   
  },
  toC :function(e)
  {
    wx.navigateTo({
      url: '/pages/concern/concern'
    })
  },
  toL :function(e)
  {
    wx.navigateTo({
      url: '/pages/like/like'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    var token = app.globalData.token;
    wx.request({
      url: 'https://storymap.sherlockouo.com/poster/self',
      method: "GET",
      header:{
        Authorization: token,
      },
      data:{
        type: 1,
        pageNum: 1,
        pageSize: 100

      },
      success(res){
        console.log('res is  ',res.data.data.list)
        var ls = res.data.data.list;
        
        for (var key in ls) {
          var marker = ls[key];
          marker.id = marker.id;
          marker.userid = marker.userid;
          marker.local = marker.address;
          
          //cover
          marker.imgurl = marker.files.substr(1,83);
          console.log('marker',marker)
        }
        that.setData({
          sharenavbar:res.data.data.list
        })
      }
    })
    wx.request({
      url: 'https://storymap.sherlockouo.com/poster/self',
      method: "GET",
      header:{
        Authorization: token,
      },
      data:{
        type: 2,
        pageNum: 1,
        pageSize: 100

      },
      success(res){
        console.log('res is lost  ',res.data.data.list)
        var ls = res.data.data.list;
        
        for (var key in ls) {
          var marker = ls[key];
          marker.id = marker.id;
          marker.userid = marker.userid;
          marker.local = marker.address;
          
          //cover
          marker.imgurl = marker.files.substr(1,82);
          console.log('marker',marker)
        }
        that.setData({
          lostnavbar:res.data.data.list
        })
      }
    })
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
  }
})
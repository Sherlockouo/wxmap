//获取应用实例
const app = getApp();
//  pages/trends/trends.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: [],//周边分享的图文结果
    lostnavbar:[
      // {
      // id:1,
      // imgurl:"",
      // title:"",
      // headimg:"",
      // username:"",
      // local:'',
      // like:0,
      // concern:0
      // }
    ],
    lat: 0,
    lng: 0,
    currentTab: 0,
    tal:0,
    ac1:1,
    ac2:0,
    cTab:0,
    shareCount:1,
    lostCount:2,
    Lflage:[],
    Sflage:[],
  },

  //请求地理位置
  requestLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      },
    })
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
    
    app.globalData.currentMarkerId = e.currentTarget.dataset.id
    
    var pagid=e.currentTarget.dataset.id; //用于文章返回 
    if (app.globalData.token.length==0) {
      wx.navigateTo({
        url: '/pages/login/login?pagetype='+2,
      })
    }else{
      wx.navigateTo({
      url: '/pages/detail/detail?pageid='+pagid,
    })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var location = {}
        location.lat = res.latitude
        location.lng = res.longitude
        app.globalData.location = location
        
      },
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
    /**
     * 获取周围post
     */
    var that = this
    console.log('location ',app.globalData.location)
    var location = app.globalData.location
    // var token = app.globalData.token;
    wx.request({
      url: 'https://storymap.sherlockouo.com/poster/local',
      method: "GET",
      header:{
        // Authorization: token,
      },
      data:{
        lat: location.lat,
        lng: location.lng,
        type: 1,
        pageNum: 1,
        pageSize: 200

      },
      success(res){
        // console.log('res is  ',res.data.data.list)
        var ls = res.data.data.list;
        
        for (var key in ls) {
          var marker = ls[key];
          marker.id = marker.id;
          marker.userid = marker.userid;
          marker.local = marker.address;
          var imgurls = marker.files.split("#");

                for (var i = 0; i < imgurls.length; i++) {
                  if (imgurls[i] == "") imgurls.splice(i, 1);
                }
          imgurls = Array.from(new Set(imgurls))
          //cover
          marker.headimg = marker.avatar;
          marker.like=marker.likes;
          marker.imgurl = imgurls[0];
          // console.log('marker',marker)
        }
        that.setData({
          navbar:res.data.data.list
        })
      }
    })
    wx.request({
      url: 'https://storymap.sherlockouo.com/poster/local',
      method: "GET",
      header:{
        // Authorization: token,
      },
      data:{
        lat: location.lat,
        lng: location.lng,
        type: 2,
        pageNum: 1,
        pageSize: 200

      },
      success(res){
        // console.log('res is  ',res.data.data.list)
        var ls = res.data.data.list;
        
        for (var key in ls) {
          var marker = ls[key];
          marker.id = marker.id;
          marker.userid = marker.userid;
          marker.local = marker.address;
          var imgurls = marker.files.split("#");
          marker.headimg = marker.avatar;
          marker.like=marker.likes;
          for (var i = 0; i < imgurls.length; i++) {
            if (imgurls[i] == "") imgurls.splice(i, 1);
          }
          imgurls = Array.from(new Set(imgurls))
          //cover
          marker.imgurl = imgurls[0]
          // console.log('marker',marker)
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
//获取应用实例
const app = getApp();
//  pages/trends/trends.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: [], //周边分享的图文结果
    lostnavbar: [
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
    tal: 0,
    ac1: 1,
    ac2: 0,
    cTab: 0,
    shareCount: 1,
    lostCount: 2,
    Lflage: [],
    Sflage: [],
    authorid: 0, //作者的id
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

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    console.log(e.currentTarget.dataset);
  },
  active1: function (e) {
    this.setData({
      ac1: 1,
      ac2: 0,
      cTab: 0
    })
  },
  active2: function (e) {
    this.setData({
      ac1: 0,
      ac2: 1,
      cTab: 1
    })
  },
  goDetail: function (e) {
    var that = this
    var postid = e.currentTarget.dataset.id
    var userid = 0;
    wx.request({
      url: 'https://storymap.sherlockouo.com/poster/info',
      method: "GET",
      data: {
        posterId: postid,
      },
      success(res) {
        if (res.data.code == 0) {
          new Promise((resolve, reject) => {
            var marker = res.data.data;
            userid = marker.userid;
            resolve(userid)
          }).then(() => {
            app.globalData.currentMarkerId = e.currentTarget.dataset.id
            if (app.globalData.token.length == 0) {
              wx.navigateTo({
                url: '/pages/login/login?pagetype=' + 2 + "&userid=" + userid,
              })
            } else {
              wx.navigateTo({
                url: '/pages/detail/detail?pageid=' + 2 + "&userid=" + userid,
              })
            }
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '玩命加载中'
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
    wx.showLoading({
      title: '玩命加载中'
      })
    var that = this
    // console.log('location ', app.globalData.location)
    var location = app.globalData.location
    // var token = app.globalData.token;
    wx.request({
      url: 'https://storymap.sherlockouo.com/poster/local',
      method: "GET",
      header: {
        // Authorization: token,
      },
      data: {
        lat: location.lat,
        lng: location.lng,
        type: 1,
        pageNum: 1,
        pageSize: 200

      },
      success(res) {
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
          marker.like = marker.likes;
          marker.imgurl = imgurls[0];
          // console.log('marker',marker)
        }
        var array;
        array=res.data.data.list;
        array.reverse();
        that.setData({
          navbar: array
        })
      }
    })
    wx.request({
      url: 'https://storymap.sherlockouo.com/poster/local',
      method: "GET",
      header: {
        // Authorization: token,
      },
      data: {
        lat: location.lat,
        lng: location.lng,
        type: 2,
        pageNum: 1,
        pageSize: 200

      },
      success(res) {
        wx.hideLoading();
        var ls = res.data.data.list;

        for (var key in ls) {
          var marker = ls[key];
          marker.id = marker.id;
          marker.userid = marker.userid;
          marker.local = marker.address;
          var imgurls = marker.files.split("#");
          marker.headimg = marker.avatar;
          marker.like = marker.likes;
          for (var i = 0; i < imgurls.length; i++) {
            if (imgurls[i] == "") imgurls.splice(i, 1);
          }
          imgurls = Array.from(new Set(imgurls))
          //cover
          marker.imgurl = imgurls[0]
          // console.log('marker',marker)
        }
        var array;
        array=res.data.data.list;
        array.reverse();
        that.setData({
          lostnavbar: array
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
    this.onShow();
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
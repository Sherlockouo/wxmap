//获取应用实例
const app = getApp();
//  pages/trends/trends.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: [{
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
    lat: 0,
    lng: 0,
    currentTab: 0,
    tal:0,
    ac1:1,
    ac2:0,
    cTab:0,
    shareCount:1,
    lostCount:2,
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
    wx.navigateTo({
      url: '/pages/detail/detail?pageid='+pagid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.requestLocation()
    
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
    console.log(that.data.lat,that.data.lng)
    var token = app.globalData.token;
    wx.request({
      url: 'https://storymap.sherlockouo.com/poster/type',
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
          marker.imgurl = marker.files.substr(1,82);
          console.log('marker',marker)
        }
        that.setData({
          navbar:res.data.data.list
        })
      }
    })
    wx.request({
      url: 'https://storymap.sherlockouo.com/poster/type',
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
        console.log('res is  ',res.data.data.list)
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
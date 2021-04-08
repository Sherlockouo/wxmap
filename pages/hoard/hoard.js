// pages/hoard/hoard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: [{
      id:1,
      imgurl:"http://qwq.fjtbkyc.net/public/personalBlog/images/zuopin/portfolio6.jpg",
      title:"艺术大楼，秋意浓浓，艺术大楼，秋意浓浓艺术大楼，秋意浓浓艺术大楼，秋意浓浓艺术大楼，秋意浓浓艺术大楼，秋意浓浓艺术大楼，秋意浓浓艺术大楼，秋意浓浓",
      handimg:"http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog9.jpg",
      username:"Frightly",
      local:'四川省成都市高新区西源大道2006号',
      like:1034,
      concern:10
    },
    {
      id:2,
      imgurl:"http://www.fjtbkyc.net/mywx/sunny5.jpg",
      title:"湖边生活悠闲自得我悠",
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
      username:"Brank lighterty",
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
    ac:[],//判断文字是行数

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arr=[]
    for(let td of this.data.navbar){
     if(td.title.length>12)
      {
        arr[td.id-1]=1
      }
   }
   this.setData({
    ac:arr
  })
  console.log(this.data.ac);

  },
  Tapgo:function(e)
  {
    var pagid=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/detail?pageid='+pagid,
    })
  },

  //获取收藏列表
  getCollect: function () {
    var token = app.globalData.token;
  },
  // 取消收藏
  unCollect: function () {
    var token = app.globalData.token;
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
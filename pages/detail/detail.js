const {
  log
} = require("../../utils/consoleUtil")

// pages/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageid: '', //跳转到此界面之前页面的id
    vaHe: 0, //导航菜单高度
    inputHe: 0, //输入框高度
    username: "",
    current: 0, //当前所在页面的 index
    concernAc: 0, //用户是否关注
    isconcern: '+关注', //按钮的文字内容
    headimg: "http://qwq.fjtbkyc.net/image/headimg/default.jpg", //默认头像信息

    circular: true, //是否采用衔接滑动
    essayall: null,
    links: [
      '/pages/preview/preview',
    ],
    likeimg: '/img/like.png',
    hoardimg: '/img/hoard.png',
    shareimg: '/img/shareico_h.png',
    isyouself: 0, //判断是不是本人
    isshow: 0, //是否展示相关信息
    islike: 0, //是否点赞
    ishoard: 0, //是否收藏
    authorid: 0,
  },

  // 点击图片进行预览函数
  //预览图片，放大预览
  imgClick: function (e) {
    var src = e.currentTarget.dataset.num // 图片路径
    var imgList = this.data.essayall.imgUrls // 图片数组
    wx.previewImage({
      current: imgList[src],
      urls: imgList
    })
  },
  onSlideChange: function (event) {
    var postId = event.detail.current;
    // console.log(postId);
    this.setData({
      current: event.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '玩命加载中'
      })
    wx.showShareMenu({
      withShareTicket: true
    })
    // console.log("current markid is ",app.globalData.currentMarkerId)
    var data = wx.getMenuButtonBoundingClientRect()
    var WH = wx.getSystemInfoSync()
    this.setData({
      // 获取导航栏高度
      vaHe: data.bottom + 10,
      inputHe: data.bottom - data.top,
      pageid: options.pageid,
      authorid: options.userid,
      // Sheight: (WH.windowHeight),
      // Swidth: (WH.windowWidth)
    })
    if (options.userid == app.globalData.userInfo.id) {
      this.setData({
        isyouself: 1,
      })
    }
    //  console.log("",app.globalData.userInfo.id)
    var that = this
    var token = app.globalData.token;
    wx.request({
      url: 'https://storymap.sherlockouo.com/like/didLike',
      method: "GET",
      header: {
        'Authorization': token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        posterId: app.globalData.currentMarkerId,
        // tofollow: that.data.essayall.userid
      },
      success(res) {
        console.log("like ", res)
        if (res.data.code == '0') {
          if (res.data.data == true) {
            that.setData({
              islike: 1
            })
          }
        }
      }

    })
    wx.request({
      url: 'https://storymap.sherlockouo.com/collect/didCollect',
      method: "GET",
      header: {
        'Authorization': token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        posterId: app.globalData.currentMarkerId,
        // tofollow: that.data.essayall.userid
      },
      success(res) {
        // console.log("follow ",res)
        if (res.data.code == '0') {
          if (res.data.data == true) {
            that.setData({
              ishoard: 1
            })
          }
        }

      }
    })
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current

    })

  },
  //界面跳转
  goMessage: function (e) {
    this.setData({
      isshow: 0
    })
    var userid = this.data.authorid
    var youself=this.data.isyouself
    wx.navigateTo({
      url: '/pages/message/message?userid=' + userid+"&ismystyle="+youself,
    })
  },
  //展示编辑操作
  showedit: function (e) {
    if (this.data.isshow == 1) {
      this.setData({
        isshow: 0
      })
    } else {
      this.setData({
        isshow: 1
      })
    }
  },
  hide: function (e) {
    this.setData({
      isshow: 0
    })
  },

  //点击指示点切换

  chuangEvent: function (e) {

    this.setData({

      swiperCurrent: e.currentTarget.id

    })

  },

  //点击图片触发事件

  swipclick: function (e) {

    console.log(this.data.swiperCurrent);
    wx.switchTab({
      url: this.data.links[this.data.swiperCurrent]

    })

  },
  deback: function (e) {
    console.log("点击收到的" + this.data.pageid)
    if (this.data.pageid == 1) {
      wx.switchTab({
        url: '/pages/index/index'
      })
    } else if (this.data.pageid == 2) {
      wx.switchTab({
        url: '/pages/trends/trends',
      })
    } else if (this.data.pageid == 3) {
      wx.switchTab({
        url: '/pages/man/man'
      })
    } else if (this.data.pageid = 4) {
      wx.navigateBack({
        url: '/pages/hoard/hoard'
      })
    } else if (this.data.pageid = 5) {
      wx.navigateBack({
        url: '/pages/like/like'
      })

    } else if (this.data.pageid = 6) {
      wx.navigateBack({
        url: '/pages/message/message'
      })
    } else {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  },
  //点击关注按钮调用
  concern: function (e) {
    var that = this
    var token = app.globalData.token;
    // console.log("iddd ",that.data.essayall.userid,that.data.essayall.id)
    wx.request({
      url: 'https://storymap.sherlockouo.com/follow/dofollow',
      method: "POST",
      header: {
        'Authorization': token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        // posterid: that.data.essayall.id,
        tofollow: that.data.essayall.userid
      },
      success(res) {
        // console.log("dolike ",res)
        if (res.data.code == '0') {
          console.log("shit ", res)
          that.setData({
            concernAc: !that.data.concernAc,
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
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
    var that = this
    var postid = app.globalData.currentMarkerId
    var essayall = {};
    var token = app.globalData.token
    // console.log('postid ', postid)
    wx.request({
      url: 'https://storymap.sherlockouo.com/poster/info',
      method: "GET",
      data: {
        posterId: app.globalData.currentMarkerId,
      },
      success(res) {
        console.log('res is  ', res)
        if (res.data.code == 0) {
          new Promise((resolve, reject) => {
            var marker = res.data.data;
            essayall.id = marker.id;
            essayall.userid = marker.userid;
            essayall.local = marker.address;
            essayall.essay_title = marker.title;
            essayall.essay_text = marker.message
            var imgurls = marker.files.split("#");

            for (var i = 0; i < imgurls.length; i++) {
              if (imgurls[i] == "") imgurls.splice(i, 1);
            }
            // 去重方式一 会把imgurls 变为 空
            imgurls = Array.from(new Set(imgurls))
            // var imgs = [...new Set(imgurls)];
            // var imgs = imgurls;
            // console.log('imgs ',imgs)
            essayall.imgUrls = imgurls;
            // console.log('after ', imgurls)
            var tags = marker.tags.split("#");
            for (var i = 0; i < tags.length; i++) {
              if (tags[i] == "") tags.splice(i, 1);
            }
            essayall.tabel = tags;
            essayall.like = marker.likes;
            essayall.sharetime = marker.createTime;
            essayall.userid = marker.userid
            that.setData({
              username: marker.username,
              headimg: marker.avatar
            })
            resolve(essayall);
          }).then(() => {

            that.setData({
              essayall: essayall,
            })

          }).then(() => {
            wx.request({
              url: 'https://storymap.sherlockouo.com/follow/didFollow',
              method: "GET",
              header: {
                'Authorization': token,
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                // posterId: app.globalData.currentMarkerId,
                userId: that.data.essayall.userid
              },
              success(res) {
                wx.hideLoading({
                  success: (res) => {},
                })
                // console.log("detail ",res)
                if (res.data.code == '0') {
                  that.setData({
                    concernAc: res.data.data
                  })
                }
              }

            })
          })
        }
      }
    })
  },
  //分享给朋友
  onShareAppMessage: function (res) {
    // return {
    //   title: '朋友圈看到的页面标题',
    //   path: '/pages/detail/detail?markid='+markid.userid,
    //   imageUrl:'http://qwq.fjtbkyc.net/public/personalBlog/images/zuopin/portfolio6.jpg',
    //   success: function (res) {
    //     console.log("分享成功")
    //   },
    //   fail: function (res) {
    //     console.log("分享失败")
    //   }
    return {
      title: '朋友圈看到的页面标题',
      path: '/pages/detail/detail?id=' + markid.userid,
      success: function (res) {
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  // 分享到朋友圈 
  onShareTimeline: function () {
    return {
      title: '朋友圈看到的页面标题',
      path: '/pages/detail/detail?id=' + markid,
      imageUrl: 'http://qwq.fjtbkyc.net/public/personalBlog/images/zuopin/portfolio6.jpg', //分享链接图片
      query: 'kjbfrom=pyq'
    }
  },

  dolike: function () {

    var that = this
    var token = app.globalData.token;
    console.log("iddd ", that.data.essayall.userid, that.data.essayall.id)
    wx.request({
      url: 'https://storymap.sherlockouo.com/like/dolike',
      method: "POST",
      header: {
        'Authorization': token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        posterid: that.data.essayall.id,
        tolike: that.data.essayall.userid
      },
      success(res) {
        // console.log("dolike ",res)
        if (res.data.code == '0') {
          wx.showToast({
            title: '点赞成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            islike: !that.data.islike
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail(res) {}
    })


  },
  docollect: function () {

    var that = this
    var token = app.globalData.token;
    // console.log("iddd ",that.data.essayall.userid,that.data.essayall.id)
    wx.request({
      url: 'https://storymap.sherlockouo.com/collect/docollect',
      method: "POST",
      header: {
        'Authorization': token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        posterId: that.data.essayall.id,
        userid: that.data.essayall.userid
      },
      success(res) {
        // console.log("doCollect ",res)
        if (res.data.code == '0') {

          that.setData({
            ishoard: !that.data.ishoard
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail(res) {}
    })

  },

  delete: function(){
    var that = this
    console.log("woc",that.data.essayall.id)
    var that = this
    var token = app.globalData.token
    wx.request({
      url: 'https://storymap.sherlockouo.com/poster/del',
      method: "DELETE",
      header: {
        'Authorization': token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        posterId: that.data.essayall.id,
      },
      success(res) {
        console.log("woc res",res)
          if(res.data.code==0){
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration:2000
            })
          }else{
            wx.showToast({
              title: '删除失败',
              icon: 'error',
              duration:2000
            })
          }
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
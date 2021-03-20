// pages/message/message.js
const app = getApp()
var consoleUtil = require('../../utils/consoleUtil.js');
var constant = require('../../utils/constant.js');
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    imageMaxNum: 6,
    toupload: false,
    region: [],
    pics: [],
    filesToPost: '',
    province: '',
    city: '',
    type: '',
    street: '',
    latitude: 0,
    longtitude: 0,
    tags:'',
    shareTag:'',
    tagvevtor: [],
    shareTitle: "",
    shareText: "",
    shareLocal: "成都市郫都区红光镇红光大道9999号",
    title_type: "1", //作品类别  1表示分享，2表示失物
    ac2: 1
  },

  parameterTap: function (e) {
    var that = this
    var type = e.currentTarget.dataset.id
    if (type == 1) {
      this.setData({
        ac2: 1
      })
    } else {
      this.setData({
        ac2: 0
      })
    }

    this.setData({
      title_type: type
    })
    console.log(this.data.title_type);

  },

  /**
   * 预览图片
   */
  previewImage: function () {
    var that = this;
    wx.previewImage({
      urls: that.data.pics,
    })
  },

  /**
   * 选择照片
   */
  takePhoto: function () {
    var that = this;
    var ps = [];
    var pics = that.data.pics;
    if (that.data.pics.length >= that.data.imageMaxNum) {
      wx.showToast({
        title: '最多选择' + that.data.imageMaxNum + '张！',
      })
      return;
    }
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      count: that.data.imageMaxNum - that.data.pics.length,
      success: function (res) {
        var imgs = res.tempFilePaths;
        console.log("images ", imgs.length)
        for (var i = 0; i < imgs.length; i++) {
          ps.push(imgs[i])
        }
        for (var i = 0; i < pics.length; i++) {
          ps.push(pics[i])
        }
        that.setData({
          pics: ps,
          toupload: true,
        })
        // console.log("fileupload ",res.tempFilePaths[0])
        // that.adjustViewStatus(false, true, false);
      },
    })
  },

  /**
   * 删除已选照片
   */
  deleteSelectImage: function (e) {
    var key = e.currentTarget.dataset.id;
    var that = this
    var ps = that.data.pics
    // var pos = ps.indexOf(key);
    ps.splice(key, 1)
    that.setData({
      pics:ps
    })

  },



  previewSelectImage: function (key) {
    var that = this;
    wx.previewImage({
      urls: that.data.pics,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('lat: ',options.lat,'lng: ',options.lng)
    var that = this;
    that.setData({
      shareLocal: options.address,
      city: options.city,
      street: options.street,
      latitude: options.lat,
      longtitude: options.lng,
    })
  },
  Stable: function (e) {
    wx.navigateTo({
      url: '/pages/table/table'
    })
  },
  Slocal: function (e) {
    wx.navigateTo({
      url: '/pages/chooseAddress/chooseAddress?city=' + this.data.city + '&street=' + this.data.street
    })
  },
  post: function () {
    var that = this
    if (that.data.shareTitle == '' || that.data.shareText == '' || that.data.tag) {
      wx.showModal({
        content: '请检查是否填写完整',
        cancelColor: 'orange',
        cancelText: '取消',
        confirmText: '确认',
        confirmColor: 'red'
      })
      return;
    }
    if (that.data.latitude == 0 || that.data.longtitude == 0 || that.data.pics.length == 0) {
      wx.showModal({
        content: '请检查是否填写完整',
        cancelColor: 'blue',
        cancelText: '取消',
        confirmText: '确认',
        confirmColor: 'red'
      })
      return;
    }
    var fs = [];
    console.log('globaldata ', app.globalData.token)
    var token = app.globalData.token;
    // var token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3ZGYuY29kZXJAZ21haWwuY29tIiwiZXhwIjoxNjE1OTA0NTI4LCJpYXQiOjE2MTU4ODY1Mjh9.rqxD7Z2erS_ymPfRP9Zk0-wmpxfKMeD-382U5wilTN440DvQS2Q6uC-7CRsCZUl37kT8sqIfhzz91C-hQ1beNg'
    if (token == null || token == '') {
      wx.showModal({
        content: '请重新登录',
        confirmText: '确定',
        cancelColor: 'red',
      })
      /**
       * 清除登录信息 让他重新登录
       */

      return;
    }
    var files = '';
    const v = new Promise((resolve, reject) => {
      var ps = that.data.pics;

      for (var i = 0; i < ps.length; i++) {
        wx.uploadFile({
          url: 'https://storymap.sherlockouo.com/upload/files',
          method: 'POST',
          header: {
            Authorization: token,
          },
          name: 'files',
          filePath: ps[i],
          success(res) {
            res = JSON.parse(res.data)
            files += '#' + res.files[0] + '#'
            resolve(files += '#' + res.files[0] + '#')
            // console.log('fk',files)
          },
          fail(res) {
            wx.navigateBack({
              delta: 1,
            })
            console.log("fails to upload ", res)
          }
        })
      }


    })
    v.then((res) => {
      console.log('files', res)
      wx.request({
        url: 'https://storymap.sherlockouo.com/poster/post', //仅为示例，并非真实的接口地址
        method: 'POST',
        data: {
          title: that.data.shareTitle,
          message: that.data.shareText,
          type: that.data.title_type,
          address: that.data.shareLocal,
          latitude: that.data.latitude,
          longtitude: that.data.longtitude,
          tags: that.data.tags,
          files: files,
        },
        header: {
          'Authorization': token,
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          if(res.data.code==0){
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 1500
          })
        }else{
          wx.showToast({
            title: '上传失败',
            icon: 'error',
            duration: 1500
          })
        }
        },
        fail(res) {
          console.log('failes to upload', res.data)
        }
      })
    })

    wx.navigateBack({
      delta: 0,
    })

  },
  concelTag:function(e){
    var key = e.currentTarget.dataset.idx;
    var newshareTag =[]
    for(let td of this.data.tagvevtor){
      // console.log(td);
      newshareTag.push(td);
    }
    newshareTag.splice(key,1);
    // console.log("new",newshareTag);
    this.setData({
      tagvevtor:newshareTag
    })
  },
  addTag:function(e)
  {
    var newshareTag =this.data.tagvevtor;
     if(this.data.shareTag!='')
     {
        var td = '#'+this.data.shareTag+'#';
     console.log('sharetag ',td)
      newshareTag.push(td);
      console.log('new s length',newshareTag)
      var ss = this.data.tagvevtor;
      newshareTag= Array.from(new Set(ss))
      console.log('ss',ss)
      this.setData({
        tagvevtor: newshareTag,
        shareTag:''
      })
     }
     else{
      wx.showToast({
        title: '标签添加不能为空！',
        icon: 'none',
        duration: 1500
      })     
    }
  },
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

// pages/contact/contact.js
const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;
var socket = {};
var socketUrl = 'wss://storymap.sherlockouo.com'

/**
 * 计算msg总高度
 */
// function calScrollHeight(that, keyHeight) {
//   var query = wx.createSelectorQuery();
//   query.select('.scrollMsg').boundingClientRect(function(rect) {
//   }).exec();
// }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    toUserid: 0,
    sendUserid: 0,
    scrollHeight: '100vh',
    inputBottom: 0,
    inputValue:"",//输入的值
    chatbackground:"http://qwq.fjtbkyc.net/image/bgimg/chatbac.jpg",
    user1: {
      id: 1,
      headimg:'http://qwq.fjtbkyc.net/image/headimg/010.jpg'
      // headimg: 'http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg',
    },
    user2: {
      id: 1,
      headimg: 'http://www.fjtbkyc.net/mywx/dog.jpg',
    }
  },
  /**
 * 初始化数据
 */
initData: function(that) {
  inputVal = '';
  var baseUrl = app.globalData.baseUrl;
  var token = app.globalData.token;
  console.log("userid ",that.data.toUserid)
  wx.request({
    url: baseUrl+"/chatlog/one",
    method: "GET",
    header:{
      "Authorization": token
    },
    data: {
      pageNum: 1,
      pageSize: 100,
      toUserId: that.data.toUserid
      // toUserId: 3
    },
    success(res) {
        var chatlog = res.data.data.list;
        console.log("chatlog ",chatlog)
        for(let key in chatlog){
          let log = chatlog[key];
          if(log.senduserid==app.globalData.userInfo.id)
            log.speaker = "customer";
          else 
            log.speaker = "server"
          log.contentType=log.msgtype
          log.content = log.sendtext
        }
        
        console.log("chatlog ",chatlog)

        that.setData({
          msgList: chatlog
        })
    },
    fail:{

    }
  })

  that.setData({
    inputVal
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    var senduserid = app.globalData.userInfo.id;
    this.data.sendUserid = senduserid
    this.data.toUserid = options.userid
    this.initData(this);
    this.setData({
      cusHeadIcon: app.globalData.userInfo.avatarUrl,
      toView: 'msg-' + (msgList.length - 1)
    });
    
     socket = wx.connectSocket({
      url: socketUrl+"/chat/"+senduserid,
    })
   
    
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    console.log("onshow ",socket)
    socket.onMessage((result) => {
      console.log("on message ",that.data.msgList)
      new Promise((resolve)=>{
        var ls = that.data.msgList
        ls.push({
          speaker: 'server',
          contentType: 'text',
          content: result.data
        })
        resolve(ls)
      }).then((res)=>{
        that.setData({
          msgList: res
        })
      })
      
    })
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
   * 获取聚焦
   */
  focus: function (e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
  //  // 计算msg高度
  //   calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function (e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })
  },

  //发送图片
  sendimg: function (e) {
    var token = app.globalData.token;
    var msgList = this.data.msgList;
    var that = this
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      count: 1,
      success: function (res) {
        var imgs = res.tempFilePaths;
        
        wx.uploadFile({
          url: 'https://storymap.sherlockouo.com/upload/files',
          method: 'POST',
          header: {
            Authorization: token,
          },
          name: 'files',
          filePath: imgs[0],
          success(res) {
            new Promise((resolve=>{
              res = JSON.parse(res.data)
              console.log("upload result",res.files[0])
              resolve(res.files[0])
            })).then((res)=>{
            var msg = {
              senduserid: that.data.sendUserid,
              // senduserid: 2,
              reciveuserid: that.data.toUserid,
              // reciveuserid: 3,
              msgtype: 'img',
              sendtext: res,
              sendtime: new Date()
            };
            msgList.push({
              speaker: 'customer',
              contentType: 'img',
              content: res
            })
            socket.send({
              data: JSON.stringify(msg)
            })
          })
        }
        })
      }
    })
  },
  /**
   * 发送点击监听
   */
  sendClick: function (e) {
    this.bntSend();
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    inputVal = '';
    this.setData({
      msgList,
      inputVal
    });
  },

  bindKeyInput:function(e){
    this.setData({
      inputValue: e.detail.value
    })
  },

  bntSend: function (e) {
    var that = this
    console.log("state ",socket.readyState)
    console.log("input value is ",this.data.inputValue)
    var that =  this
    if(this.data.inputValue==null||this.data.inputValue==""){
      wx.showToast({
        title: '输入字符不能为空',
        icon: 'error',
        duration: 1000,
      })
      return;
    }
    if(socket.readyState!=1){
      new Promise((resolve)=>{
        socket = wx.connectSocket({
          url: socketUrl+"/chat/"+that.data.sendUserid,
        })
        resolve()
      }).then(()=>{
        var msg = {
          senduserid: that.data.sendUserid,
          // senduserid: 2,
          reciveuserid: that.data.toUserid,
          // reciveuserid: 3,
          msgtype: 'text',
          sendtext: this.data.inputValue,
          sendtime: new Date()
        };
        
        let msgList = that.data.msgList
        msgList.push({
          speaker: 'customer',
          contentType: 'text',
          content: this.data.inputValue
        })
    
        socket.send({
          data: JSON.stringify(msg)
        })
    
        console.log("json ",JSON.stringify(msg))
    
        
        console.log("msglist ",msgList)
        this.setData({
          msgList,
          inputVal,
          inputValue: ''
        });
      }).catch((res)=>{
        console.log("catching bugs",res)
      })
        
        
    }else{
    var msg = {
      senduserid: that.data.sendUserid,
      // senduserid: 2,
      reciveuserid: that.data.toUserid,
      // reciveuserid: 3,
      msgtype: 'text',
      sendtext: this.data.inputValue,
      sendtime: new Date()
    };
    
    let msgList = that.data.msgList
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: this.data.inputValue
    })

    socket.send({
      data: JSON.stringify(msg)
    })

    console.log("json ",JSON.stringify(msg))

    
    console.log("msglist ",msgList)
    this.setData({
      msgList,
      inputVal,
      inputValue: ''
    });
  }
  },

  /**
   * 退回上一页
   */
  toBackClick: function () {
    wx.navigateBack({})
  }

})
// pages/companyInfos/introduce/introduce.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    company:"",
    contact:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that =this
      that.data.id=options.id
      that.setData({
        contact:JSON.parse(options.contact)
      })
      that.request()
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
  
  },
  /**
   * 网络请求
   */
  request() {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    var json = new Object()
    var act = "home"
    json.id = that.data.id
    wx.request({
      url: getApp().appData.hostPhp + "index/home", //仅为示例，并非真实的接口地址
      data: {
        "id": that.data.id,
        "token": getApp().md5Php(act + JSON.stringify(json))
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function (res) {
        //请求成功
        if (res.data.status == 100) {
          wx.hideLoading()
          that.setData({
            isfail: false,
            company: res.data.data
          })
        } else { //请求失败
          that.setData({
            isfail: true,
          })
          wx.hideLoading()
          setTimeout(function () {
            wx.showToast({
              title: res.data.msg,
            })
          }, 300)
        }
      },
      fail: function (res) {
        that.setData({
          isfail: true,
        })
        wx.hideLoading()
        setTimeout(function () {
          wx.showToast({
            title: "请求失败",
          })
        }, 300)
      },
      complete: function () {
        wx.stopPullDownRefresh();
      }
    })
  },
})
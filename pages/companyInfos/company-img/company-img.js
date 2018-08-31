// pages/companyInfos/company-img/company-img.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    isfail: true,
    page: 1,
    totalPage: 0,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.id)
    that.data.id = options.id
    that.requestList()
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
    console.log("到底了？")
    var that = this
    if (that.data.page > that.data.totalPage) {
      wx.showToast({
        title: '没有更多了',
      })
      return
    }
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    that.requestList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  shouImg(e){
    wx.previewImage({
      urls: [e.currentTarget.dataset.img],
    })
  },
  requestList() {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    var json = new Object()
    json.id = that.data.id
    json.p = that.data.page
    json.size = 10
    var act = "companyimg"
    wx.request({
      url: getApp().appData.hostPhp + "logistics/companyimg", //仅为示例，并非真实的接口地址
      data: {
        "id": that.data.id,
        "p": that.data.page,
        "size": 10,
        "token": getApp().md5Php(act + JSON.stringify(json))
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function (res) {
        //请求成功
        if (res.data.status == 100) {
          if (that.data.page == 1) {
            that.data.list = []
            that.data.totalPage = res.data.data.end_page
          }
          that.data.page = that.data.page + 1

          Array.prototype.push.apply(that.data.list, res.data.data.list);
          that.setData({
            list: that.data.list,
          })
          that.setData({
            isfail: false,
          })
          wx.hideLoading()
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
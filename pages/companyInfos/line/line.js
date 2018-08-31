// pages/companyInfos/line/line.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    isfail: true,
    page: 1,
    totalPage: 0,
    list: [],
    bean:"",
    toProvin:"省份",
    toCity:"请选择",
    toCityId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.id)
    that.data.id = options.id
    that.setData({
      bean:JSON.parse(options.bean)
    })
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
  toLineDetail(e) {
    wx.navigateTo({
      url: '/pages/companyInfos/line-detail/line-detail?lineBean=' + JSON.stringify(e.currentTarget.dataset.bean) + "&id=" + this.data.id,
    })
  },

  call(e){
    getApp().call(e.currentTarget.dataset.phone)
  },
  requestList() {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    var json = new Object()
    json.id = that.data.id
    json.page = that.data.page
    json.size = 10
    var act = "expline"
    wx.request({
      url: getApp().appData.hostPhp + "index/expline", //仅为示例，并非真实的接口地址
      data: {
        "id": that.data.id,
        "page": that.data.page,
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
          for(var i=0;i<res.data.data.list.length;i++){
            var phoneArr = res.data.data.list[i].mobile.split(",")
            if (phoneArr.length > 0) {
              res.data.data.list[i].phone = phoneArr[0]
            } else {
              res.data.data.list[i].phone = ""
            }
          }
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
  cityChange: function (e) {
    if (e.detail.type == 1) {
      this.data.bean.city = e.detail.cityName
      this.data.bean.cityId = e.detail.cityId
      this.data.bean.province = e.detail.proName
      this.data.toProvin = e.detail.proName
      this.setData({
        bean: this.data.bean
      })
    } else if (e.detail.type == 2) {
      this.setData({
        toCity: e.detail.cityName,
        toCityId: e.detail.cityId,
        toProvin: e.detail.proName,
      })
    }
  },
  /**
     * 查询
     */
  chaXun() {
    var that = this
    if (that.data.bean.cityId == 0) {
      wx.showToast({
        title: '请选择出发地',
      })
      return
    }
    if (that.data.toCityId == 0) {
      wx.showToast({
        title: '请选择到达地',
      })
      return
    }
    that.requestChaXun()
  },

  requestChaXun() {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    var json = new Object()
    json.id = that.data.id
    json.cityId = that.data.bean.cityId
    json.toCityId = that.data.toCityId
    var act = "explinesearch"
    wx.request({
      url: getApp().appData.hostPhp + "index/explinesearch", //仅为示例，并非真实的接口地址
      data: {
        "id": that.data.id,
        "cityId": that.data.bean.cityId,
        "toCityId": that.data.toCityId,
        "token": getApp().md5Php(act + JSON.stringify(json))
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function (res) {
        //请求成功
        if (res.data.status == 100) {
          that.setData({
            isfail: false,
          })
          wx.hideLoading()
          if (res.data.data.fromInfo) {
            var lineBean = new Object()
            lineBean.provin = that.data.bean.province
            lineBean.city = that.data.bean.city
            lineBean.toProvin = that.data.toProvin
            lineBean.toCity = that.data.toCity
            wx.navigateTo({
              url: '/pages/companyInfos/line-detail/line-detail?lineBean=' + JSON.stringify(lineBean) + "&bean=" + JSON.stringify(res.data.data) + "&id=" + that.data.id,
            })
          } else {
            wx.showToast({
              title: '未查询到结果',
            })
          }
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
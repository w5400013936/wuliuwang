// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 提交
   */
  tiJiaoSubmit: function(e) {
    var that = this
    var zhuTi = e.detail.value.zhuTi
    var company = e.detail.value.company
    var name = e.detail.value.name
    var phone = e.detail.value.phone
    var content = e.detail.value.content
    if (!zhuTi) {
      wx.showToast({
        title: '请输入主题',
      })
      return
    }
    if (!company) {
      wx.showToast({
        title: '请输入公司名称',
      })
      return
    }
    if (!name) {
      wx.showToast({
        title: '请输入姓名',
      })
      return
    }
    if (!getApp().checkPhone(phone)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
        showCancel: false
      })
      return
    }
    if (!content) {
      wx.showToast({
        title: '请输入内容',
      })
      return
    }
    wx.showLoading({
      title: '提交中……',
      mask: true
    })
    var json = new Object()
    var mod = "feedback"
    json.title = zhuTi
    json.company = company
    json.name = name
    json.mobile = phone
    json.intro = "[xiaochengxu] " + content
    json.ip = "192.168.11.1"

    wx.request({
      url: getApp().appData.host + "novaild_post", //仅为示例，并非真实的接口地址
      data: {
        "mod": mod,
        "json": JSON.stringify(json),
        "token": getApp().md5(JSON.stringify(json)+mod)
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        //请求成功
        if (res.data.state == 1) {
          wx.hideLoading()
          that.setData({
            isfail: false,
          })
          setTimeout(function() {
            wx.showToast({
              title: '提交成功',
            })
          }, 300)
          wx.navigateBack({
            delta: 1
          })
        } else { //请求失败
          that.setData({
            isfail: true,
          })
          wx.hideLoading()
        }
      },
      fail: function(res) {
        that.setData({
          isfail: true,
        })
        wx.hideLoading()
      },
      complete: function() {
        wx.stopPullDownRefresh();
      }
    })
  }
})
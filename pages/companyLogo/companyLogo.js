// pages/companyLogo/companyLogo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var userInfo = JSON.parse(options.bean)
    console.log(userInfo)
    if (userInfo.mendian) {
      userInfo.menPai = userInfo.imgDir.replace("show", "logo") + userInfo.mendian
    }
    if (userInfo.logo) {
      userInfo.biaoZhi = userInfo.logoUrl
    }
    that.setData({
      userInfo: userInfo
    })
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
    var that = this
    if (getApp().shuaXin.uplogo) {
      console.log("1111111111")
      that.data.userInfo.biaoZhi = getApp().shuaXin.uplogo
      getApp().shuaXin.uplogo = ""
      that.setData({
        userInfo: that.data.userInfo
      })
    }
    if (getApp().shuaXin.upmpzhao) {
      that.data.userInfo.menPai = getApp().shuaXin.upmpzhao
      getApp().shuaXin.upmpzhao = ""
      that.setData({
        userInfo: that.data.userInfo
      })
    }
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
  
  // https://github.com/we-plugin/we-cropper  图片选择库
  chooseImgTap(e) {
    var that = this
    var typeImg = e.currentTarget.dataset.type
    console.log("typeImg", typeImg)
    var mod = ""
    var json = new Object()
    switch (typeImg) {
      case "1":
        mod = "uplogo"
        json.oldlogo = that.data.userInfo.logo
        if (that.data.userInfo.logo) {
          wx.showActionSheet({
            itemList: [
              "查看",
              "重新上传"
            ],
            success(e1) {
              if (e1.tapIndex == 0) {
                wx.previewImage({
                  urls: [that.data.userInfo.biaoZhi],
                })
              } else if (e1.tapIndex == 1) {
                wx.navigateTo({
                  url: '/cutInside/cutInside?mod=' + mod + "&json=" + JSON.stringify(json),
                })
              }
            }
          })
        } else {
          wx.navigateTo({
            url: '/cutInside/cutInside?mod=' + mod + "&json=" + JSON.stringify(json),
          })
        }

        break
      case "2":
        mod = "upmpzhao"
        json.oldlogo = that.data.userInfo.mendian
        if (that.data.userInfo.mendian) {
          wx.showActionSheet({
            itemList: [
              "查看",
              "重新上传"
            ],
            success(e1) {
              if (e1.tapIndex == 0) {
                wx.previewImage({
                  urls: [that.data.userInfo.menPai],
                })
              } else if (e1.tapIndex == 1) {
                wx.navigateTo({
                  url: '/cutInside/cutInside?mod=' + mod + "&json=" + JSON.stringify(json),
                })
              }
            }
          })
        } else {
          wx.navigateTo({
            url: '/cutInside/cutInside?mod=' + mod + "&json=" + JSON.stringify(json),
          })
        }
        break
    }
  },
})
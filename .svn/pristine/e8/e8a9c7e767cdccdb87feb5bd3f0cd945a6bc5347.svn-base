// component/uploadBox/uploadBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    path: {
      type: String,
      value: ""
    },
    base: {
      type: String,
      value: ""
    },
    typeX: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    name: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleUploadHide: function() {
      this.setData({
        show: false
      })
    },
    handleUpload() {
      var that = this
      if (!that.data.base) {
        wx.showToast({
          title: '图片出错',
        })
        return
      }
      if (!that.data.name) {
        wx.showToast({
          title: '请输入名称',
        })
        return
      }
      var json = new Object()
      var mod = "uppic"
      json.type = that.data.typeX
      json.name = that.data.name
      wx.request({
        url: getApp().appData.host + "vaild_post", //仅为示例，并非真实的接口地址
        data: {
          "mod": mod,
          "json": JSON.stringify(json),
          "base64": that.data.base,
          "token": getApp().appData.userInfo.token
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
              show: false
            })
            setTimeout(function() {
              wx.showToast({
                title: '上传成功',
              })
            }, 300)
            that.triggerEvent("handleUpload")
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
    },
    nameInput(e) {
      this.setData({
        name: e.detail.value
      })
    },
  }
})
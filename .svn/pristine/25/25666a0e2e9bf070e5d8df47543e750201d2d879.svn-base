/**
 * Created by sail on 2017/6/1.
 */
import WeCropper from '../we-cropper/we-cropper.js'

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50
var mod = "" //企业标志 
var json = ""

Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300
      }
    },
  },
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage() {
    var that = this
    this.wecropper.getCropperImage((src) => {
      if (src) {
        console.log("哈哈", src)
        that.shangChuan(src)
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
  },
  /**
   * 上传图片
   */
  shangChuan(img) {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    wx.request({
      url: getApp().appData.host + "vaild_post", //仅为示例，并非真实的接口地址
      data: {
        "mod": mod,
        "json": json,
        "base64": img.base64,
        "token": getApp().appData.userInfo.token
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        //请求成功
        if (res.data.state == 1) {
          console.log("上传图片", res.data)
          that.setData({
            isfail: false,
          })
          wx.hideLoading()
          setTimeout(function() {
            wx.showToast({
              title: '上传成功',
            })
          }, 300)
          switch (mod) {
            case "uplogo":
              getApp().shuaXin.SHUA_XIN_USERINFO1 = true
              getApp().shuaXin.uplogo = img.path
              break
            case "upmpzhao":
              getApp().shuaXin.SHUA_XIN_USERINFO1 = true
              getApp().shuaXin.upmpzhao = img.path
              break
            case "upphoto":
              getApp().shuaXin.SHUA_XIN_PROFILE = true
              break
          }
          wx.navigateBack({
            delta: 1
          })
        } else { //请求失败
          that.setData({
            isfail: true,
          })

        }
      },
      fail: function(res) {
        that.setData({
          isfail: true,
        })

      },
      complete: function() {
        wx.stopPullDownRefresh();
      }
    })
  },
  uploadTap() {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值

        self.wecropper.pushOrign(src)
      }
    })
  },
  onLoad(option) {
    const {
      cropperOpt
    } = this.data
    mod = option.mod
    json = option.json
    console.log("json", json)
    new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        console.log(`before picture loaded, i can do something`)
        console.log(`current canvas context:`, ctx)
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        console.log(`picture loaded`)
        console.log(`current canvas context:`, ctx)
        wx.hideToast()
      })
      .on('beforeDraw', (ctx, instance) => {
        console.log(`before canvas draw,i can do something`)
        console.log(`current canvas context:`, ctx)
      })
      .updateCanvas()
  }
})
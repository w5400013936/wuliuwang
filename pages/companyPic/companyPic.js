// pages/companyPic/companyPic.js
var page = 0;
var upng = require('../../upng-js/UPNG.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startX: 0,
    delBtnWidth: 208,
    typeX: 1,
    adapter: [],
    showUpLoad: false,
    path: "",
    width: 200,
    height: 300,
    base64: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      typeX: options.type
    })
    switch (that.data.typeX) {
      case "1":
        wx.setNavigationBarTitle({
          title: '企业图片',
        })
        break
      case "2":
        wx.setNavigationBarTitle({
          title: '荣誉证书',
        })
        break
      case "3":
        wx.setNavigationBarTitle({
          title: '业绩案例',
        })
        break
    }
    page = 0
    that.request()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.uploadBox = this.selectComponent("#uploadBox");
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
    page = 0
    this.request()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.request()
    console.log("底部")
  },

  scorllBtm() {
    this.onReachBottom()
  },

  handleUpload() {
    this.onPullDownRefresh()
  },
  /**
   * 删除图片
   */
  del(e) {
    var that =this
    var index = e.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '确定要删除该图片吗？',
      success(e) {
        if (e.confirm) {
          wx.showLoading({
            title: '加载中……',
            mask: true
          })
          var json = new Object()
          var mod = "delpic"
          json.type = parseInt(that.data.typeX) 
          json.ID = that.data.adapter[index].ID
          wx.request({
            url: getApp().appData.host + "vaild_post", //仅为示例，并非真实的接口地址
            data: {
              "mod": mod,
              "json": JSON.stringify(json),
              "token": getApp().appData.userInfo.token
            },
            header: {
              'content-type': 'application/json', // 默认值
            },
            method: 'POST',
            success: function(res) {
              //请求成功
              if (res.data.state == 1) {
                that.data.adapter.splice(index,1)
                that.setData({
                  isfail: false,
                  adapter: that.data.adapter
                })
                wx.hideLoading()
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
        } else if (e.cancel) {

        }
      }
    })
  },
  /**
   * 展示图片
   */
  showImg(e) {
    wx.previewImage({
      urls: [e.currentTarget.dataset.url],
    })
  },
  /**
   * 上传
   */
  uploadTap() {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值
        that.setData({
          path: src,
        })
        // that.initUploadBox()
        wx.getImageInfo({
          src: that.data.path,
          success(e) {
            var width = e.width
            var height = e.height
            that.setData({
              width: width,
              height: height
            })
            console.log(e)
            const canvas = wx.createCanvasContext("canvas", that)
            // 1. 绘制图片至canvas
            canvas.drawImage(e.path, 0, 0, parseInt(width), parseInt(height))
            // 绘制完成后执行回调，API 1.7.0
            canvas.draw(false, () => {
              // 2. 获取图像数据， API 1.9.0
              wx.canvasGetImageData({
                canvasId: "canvas",
                x: 0,
                y: 0,
                width: parseInt(width),
                height: parseInt(height),
                success(res) {
                  console.log("成功")
                  let platform = wx.getSystemInfoSync().platform
                  if (platform == 'ios') {
                    // 兼容处理：ios获取的图片上下颠倒
                    res = reverseImgData(res)
                  }
                  /**
                   * 图片转base64
                   */
                  try {
                    let pngData = upng.encode([res.data.buffer], res.width, res.height)
                    var base64 = wx.arrayBufferToBase64(pngData)
                    console.log(base64)
                    that.setData({
                      base64: base64,
                      showUpLoad: true
                    })
                  } catch (e) {
                    console.log('图片转base64失败')
                  }
                },
                fail(e) {
                  console.log("失败", e)
                }
              })
            })
          }
        })
      }
    })
  },
  reverseImgData(res) {
    var w = res.width
    var h = res.height
    let con = 0
    for (var i = 0; i < h / 2; i++) {
      for (var j = 0; j < w * 4; j++) {
        con = res.data[i * w * 4 + j]
        res.data[i * w * 4 + j] = res.data[(h - i - 1) * w * 4 + j]
        res.data[(h - i - 1) * w * 4 + j] = con
      }
    }
    return res
  },
  touchS: function(e) {
    var that = this;
    if (e.touches.length == 1) {
      var startX = e.touches[0].clientX;
      that.setData({
        startX: startX
      })
    }
  },
  touchM: function(e) {
    var that = this;
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标
      var moveX = e.touches[0].clientX;
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = that.data.startX - moveX;
      //delBtnWidth 为右侧按钮区域的宽度
      var delBtnWidth = that.data.delBtnWidth;
      var style = "";
      if (disX == 0 || disX < 0) { //如果移动距离小于等于0，文本层位置不变
        style = "left:0;transition: left 0.5s;";
      } else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离
        style = "left:-" + disX + "rpx;";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          // txtStyle = "left:-" + delBtnWidth + "rpx;";
        }
      }

      var index = e.currentTarget.dataset.index;
      that.data.adapter[index].listStyle = style;
      //更新列表的状态
      that.setData({
        adapter: that.data.adapter
      })
    }
  },
  touchE: function(e) {
    var that = this
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var style = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx;transition: left 0.5s;" : "left:0;transition: left 0.5s;";

      var index = e.currentTarget.dataset.index;
      that.data.adapter[index].listStyle = style;
      //更新列表的状态
      that.setData({
        adapter: that.data.adapter
      })
    }
  },
  request() {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    var json = new Object()
    var mod = "userpic"
    json.type = that.data.typeX
    wx.request({
      url: getApp().appData.host + "vaild_page", //仅为示例，并非真实的接口地址
      data: {
        "mod": mod,
        "json": JSON.stringify(json),
        "page": page,
        "size": 10,
        "token": getApp().appData.userInfo.token
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        //请求成功
        if (res.data.state == 1) {
          var userpic = res.data.data
          if (page == 0) {
            that.data.adapter = []
          }
          var list = []
          if (userpic) {
            if (userpic.length > 0) {
              list = userpic[0].rows
            }
          } else {

          }
          page = page + 1
          Array.prototype.push.apply(that.data.adapter, list)
          console.log(that.data.adapter)
          that.setData({
            isfail: false,
            adapter: that.data.adapter
          })
          wx.hideLoading()
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
  }
})
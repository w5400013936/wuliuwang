// component/cityPicker/cityPicker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    multiArray: {
      type: Array,
      value: [
        // ['福建省', '广东省'],
        // ['福州市', '厦门市', '莆田市', '泉州市', '漳州市']
      ]
    },
    multiIndex: {
      type: Array,
      value: [

      ]
    },
    typeX: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    proList: [],
    cityList: [],
  },
  ready() {
    var that = this
    that.requestSheng()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindMultiPickerChange: function(e) {
      this.setData({
        multiIndex: e.detail.value
      })
      var bean = new Object()
      bean.proName = this.data.proList[e.detail.value[0]].proName
      bean.proId = this.data.proList[e.detail.value[0]].proID
      bean.cityName = this.data.cityList[e.detail.value[1]].cityName
      bean.cityId = this.data.cityList[e.detail.value[1]].cityID
      bean.type = this.data.typeX
      this.triggerEvent('cityChange', bean);
    },
    bindMultiPickerColumnChange: function(e) {
      var that = this
      var data = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex
      };
      data.multiIndex[e.detail.column] = e.detail.value;
      switch (e.detail.column) {
        case 0:
          wx.showLoading({
            title: '加载中……',
            mask: true
          })
          that.requestCity(e.detail.value);
          break
      }
    },
    // 网络请求
    requestSheng: function() {
      var that = this
      wx.showLoading({
        title: '加载中……',
        mask: true
      })
      wx.request({
        url: getApp().appData.host + "novaild_list", //仅为示例，并非真实的接口地址
        data: {
          "json": "",
          "mod": "provin",
          "token": getApp().md5("provin")
        },
        header: {
          'content-type': 'application/json', // 默认值
        },
        method: 'POST',
        success: function(res) {
          //请求成功
          if (res.data.state == 1) {
            that.data.multiArray[0] = []
            that.data.multiIndex[0] = 0
            for (let i = 0; i < res.data.data.length; i++) {
              that.data.multiArray[0].push(res.data.data[i].proName)
            }
            that.setData({
              multiArray: that.data.multiArray,
              multiIndex: that.data.multiIndex,
              proList: res.data.data
            })
            that.requestCity(that.data.multiIndex[0]);
            that.setData({
              isfail: false,
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
    },
    // 网络请求
    requestCity: function(index) {
      var that = this
      wx.showLoading({
        title: '加载中……',
        mask: true
      })
      wx.request({
        url: getApp().appData.host + "novaild_list", //仅为示例，并非真实的接口地址
        data: {
          "json": "{vin:" + that.data.proList[index].proID + "}",
          "mod": "city",
          "token": getApp().md5("{vin:" + that.data.proList[index].proID + "}" + "city")
        },
        header: {
          'content-type': 'application/json', // 默认值
        },
        method: 'POST',
        success: function(res) {
          //请求成功
          if (res.data.state == 1) {
            that.data.multiArray[1] = []
            that.data.multiIndex[1] = 0
            for (let i = 0; i < res.data.data.length; i++) {
              that.data.multiArray[1].push(res.data.data[i].cityName)
            }
            that.setData({
              multiArray: that.data.multiArray,
              multiIndex: that.data.multiIndex,
              cityList: res.data.data,
            })
            wx.hideLoading()
            that.setData({
              isfail: false,
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
    },
  },
})
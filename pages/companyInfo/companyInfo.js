// pages/companyInfo/companyInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    company: "",
    multiArray: [
      ['福建省', '广东省'],
      ['福州市', '厦门市', '莆田市', '泉州市', '漳州市'],
      ['鼓楼区', '闽侯县']
    ],
    multiIndex: [0, 0, 0],
    proList: [],
    cityList: [],
    townList: [],
    qiYeCateData: [],
    qiYeCateData1: [],
    cateName: "",
    scateName: "",
    yearIndex: null,
    yearArray: [],
    natureList: ["国企", "集体", "股份", "外商独资", "中外合资", "国有体制", "私营", "不详"],
    natureIndex: null,
    modeList: ["制造商", "贸易商", "代理商", "采购办事处", "分销商/批发商", "其他"],
    mode: '',
    numberList: [
      "5人以下",
      "5-10人",
      "11-50人",
      "51-100人",
      "101-500人",
      "501-1000人",
      "1000人以上"
    ],
    numberIndex: null,
    turnoverList: ["人民币 100万元/年以下",
      "人民币 100万元/年-250万元/年",
      "人民币 250万元/年-500万元/年",
      "人民币 500万元/年-1000万元/年",
      "人民币 1000万元/年-5000万元/年",
      "人民币 5000万元/年-1亿元/年",
      "人民币 1亿元/年以上"
    ],
    turnoverIndex: null,
    typeArray: [
      ['包装机械', '叉车'],
      ['捆扎机', '集装机']
    ],
    typeIndex: [0, 0],
    certSplit: [],
    certArr: [
      "HACCP",
      "ISO 9000/9001/9004/19011: 2000",
      "QS-9000",
      "ISO 14000/14001",
      "ISO/TS 16949",
      "SA8000",
      "ISO 17799",
      "OHASA 18001",
      "TL9000",
      "Others"
    ],
    renZhengList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      company: JSON.parse(options.bean)
    })
    if (that.data.company.manageCert) {
      that.data.certSplit = that.data.company.manageCert.split(",")
      console.log(that.data.certSplit)
    } else {
      that.data.certSplit = []
    }
    that.setData({
      certSplit: that.data.certSplit
    })

    var arr = [];
    for (var i = 1900; i < 2100; i++) {
      arr.push(i);
    }
    this.setData({
      yearArray: arr
    })

    var date = new Date();
    var curYear = date.getFullYear();
    var index = arr.indexOf(curYear);
    this.setData({
      yearIndex: index
    })
    that.requestSheng()
    that.requestLeiXing01()
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
    if (getApp().shuaXin.manageCert) {
      that.data.company.manageCert = getApp().appData.manageCert
      if (that.data.company.manageCert) {
        that.data.certSplit = that.data.company.manageCert.split(",")
        console.log(that.data.certSplit)
      } else {
        that.data.certSplit = []
      }
      that.setData({
        certSplit: that.data.certSplit
      })
      getApp().shuaXin.manageCert = false
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

  /**
   * 修改
   */
  xiuGaiTap() {
    var that = this
    if (!that.data.company.ToPlace) {
      wx.showToast({
        title: '请选择所在区域',
      })
      return
    }
    if (!that.data.cateName) {
      wx.showToast({
        title: '请选择企业类型',
      })
      return
    }
    if (!that.data.company.businessNature) {
      wx.showToast({
        title: '请选择企业性质',
      })
      return
    }
    if (!that.data.company.businessType) {
      wx.showToast({
        title: '请选择经营模式',
      })
      return
    }
    if (!this.data.company.legalPerson) {
      wx.showToast({
        title: '请输入公司法人',
      })
      return
    }
    if (!this.data.company.emplyStr) {
      wx.showToast({
        title: '请选择员工人数',
      })
      return
    }
    if (!this.data.company.establishment) {
      wx.showToast({
        title: '请选择成立年份',
      })
      return
    }
    if (!this.data.company.overStr) {
      wx.showToast({
        title: '请选择年营业额',
      })
      return
    }
    if (!this.data.company.mainProducts) {
      wx.showToast({
        title: '请输入主营产品',
      })
      return
    }
    if (!this.data.company.intro) {
      wx.showToast({
        title: '请输入公司简介',
      })
      return
    }
    wx.showLoading({
      title: '提交中……',
      mask: true
    })
    var json = new Object()
    var mod = "company"
    json.vin = that.data.company.provin
    json.city = that.data.company.city
    json.town = that.data.company.town
    json.cate = that.data.company.cateID
    json.scate = that.data.company.scateID
    json.nature = that.data.company.businessNature
    json.busstp = that.data.company.businessType
    json.legal = that.data.company.legalPerson
    json.employ = that.data.company.employNum
    json.estab = that.data.company.establishment + ""
    json.turnover = that.data.company.turnOver
    json.mainpro = that.data.company.mainProducts
    json.intro = that.data.company.intro
    json.cert = that.data.company.manageCert

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
          wx.hideLoading()
          that.setData({
            isfail: false,
          })
          getApp().shuaXin.SHUA_XIN_COMPANY = true
          setTimeout(function() {
            wx.showToast({
              title: '修改成功',
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
  },
  /**
   * 法人输入
   */
  faRenInput(e) {
    this.data.company.legalPerson = e.detail.value
    this.setData({
      company: this.data.company
    })
  },
  /**
   * 主营产品输入
   */
  zhuYinInput(e) {
    this.data.company.mainProducts = e.detail.value
    this.setData({
      company: this.data.company
    })
  },
  /**
   * 公司简介输入
   */
  jianJieTap(e) {
    this.data.company.intro = e.detail.value
    this.setData({
      company: this.data.company
    })
  },
  /**
   * 认证管理
   */
  renZhengTap() {
    var that = this
    that.data.renZhengList = []
    for (let i = 0; i < that.data.certArr.length; i++) {
      var renZheng = new Object()
      renZheng.isCheck = false
      renZheng.renZheng = that.data.certArr[i]
      for (let j = 0; j < that.data.certSplit.length; j++) {
        if (that.data.certSplit[j] == that.data.certArr[i]) {
          renZheng.isCheck = true
          break
        }
      }
      that.data.renZhengList.push(renZheng)
    }
    console.log(that.data.renZhengList)
    wx.navigateTo({
      url: '/pages/authentication/authentication?value=' + JSON.stringify(that.data.renZhengList),
    })
  },

  natureChange: function(e) { // 选择企业性质
    this.data.company.businessNature = this.data.natureList[e.detail.value]
    this.setData({
      company: this.data.company
    })
  },

  modeSelect: function() { // 选择经营模式
    var that = this;
    wx: wx.showActionSheet({
      itemList: that.data.modeList,
      success: function(e) {
        that.data.company.businessType = that.data.modeList[e.tapIndex]
        that.setData({
          company: that.data.company
        })
      }
    })
  },

  numberChange: function(e) { // 选择员工人数
  console.log(e.detail.value)
    this.data.company.emplyStr = this.data.numberList[e.detail.value]
    this.data.company.employNum = parseInt(e.detail.value) + 1
    this.setData({
      company: this.data.company
    })
  },

  turnoverChange: function(e) { // 选择年营业额
    this.data.company.overStr = this.data.turnoverList[e.detail.value]
    this.data.company.turnOver = parseInt(e.detail.value) + 1
    this.setData({
      company: this.data.company
    })
  },

  areaChange: function(e) { // 地区选择
    var that = this
    const val = e.detail.value
    console.log(val)
    that.data.company.proName = that.data.proList[val[0]].proName
    that.data.company.provin = that.data.proList[val[0]].proID
    that.data.company.cityName = that.data.cityList[val[1]].cityName
    that.data.company.city = that.data.cityList[val[1]].cityID
    that.data.company.townName = that.data.townList[val[2]].townName
    that.data.company.town = that.data.townList[val[2]].townID
    that.data.company.ToPlace = that.data.proList[val[0]].proName + "-" + that.data.cityList[val[1]].cityName + "-" + that.data.townList[val[2]].townName
    that.setData({
      company: that.data.company
    })
  },

  areaColumnChange: function(e) { // 地区每列选择
    var that = this
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
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
      case 1:
        wx.showLoading({
          title: '加载中……',
          mask: true
        })
        that.requestTown(e.detail.value);
        break
      case 2:
        // that.data.multiIndex[2] = e.detail.value
        // that.setData({
        //   multiIndex: that.data.multiIndex
        // })
        break
    }
  },

  yearChange: function(e) { // 年份选择
    this.data.company.establishment = this.data.yearArray[e.detail.value]
    this.setData({
      company: this.data.company
    })
  },

  typeChange: function(e) { // 企业类型选择
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.data.company.cateID = that.data.qiYeCateData[e.detail.value[0]].sort
    that.data.company.scateID = that.data.qiYeCateData1[e.detail.value[1]].ID
    that.setData({
      typeIndex: e.detail.value,
      cateName: that.data.qiYeCateData[e.detail.value[0]].cateName,
      scateName: that.data.qiYeCateData1[e.detail.value[1]].cateName
    })
  },

  typeColumnChange: function(e) { // 企业类型每列选择
    var that = this
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      typeArray: this.data.typeArray,
      typeIndex: this.data.typeIndex
    };
    data.typeIndex[e.detail.column] = e.detail.value;

    switch (e.detail.column) {
      case 0:
        wx.showLoading({
          title: '加载中……',
          mask: true
        })
        that.requestLeiXing02(e.detail.value);
        break
      case 1:

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
        console.log("获取省份", res.data)
        //请求成功
        if (res.data.state == 1) {
          that.data.multiArray[0] = []
          that.data.multiIndex[0] = 0
          for (let i = 0; i < res.data.data.length; i++) {
            that.data.multiArray[0].push(res.data.data[i].proName)
            if (res.data.data[i].proID == that.data.company.provin) {
              that.data.multiIndex[0] = i
            }
          }
          that.setData({
            multiArray: that.data.multiArray,
            multiIndex: that.data.multiIndex,
            proList: res.data.data
          })
          that.requestCity(that.data.multiIndex[0]);
          // wx.hideLoading()
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
        console.log("获取城市", res.data)
        //请求成功
        if (res.data.state == 1) {
          that.data.multiArray[1] = []
          that.data.multiIndex[1] = 0
          for (let i = 0; i < res.data.data.length; i++) {
            that.data.multiArray[1].push(res.data.data[i].cityName)
            if (that.data.company.city == res.data.data[i].cityID) {
              that.data.multiIndex[1] = i
            }
          }
          that.setData({
            multiArray: that.data.multiArray,
            multiIndex: that.data.multiIndex,
            cityList: res.data.data,
          })
          that.requestTown(that.data.multiIndex[1])
          // wx.hideLoading()
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
  requestTown: function(index) {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    wx.request({
      url: getApp().appData.host + "novaild_list", //仅为示例，并非真实的接口地址
      data: {
        "json": "{city:" + that.data.cityList[index].cityID + "}",
        "mod": "town",
        "token": getApp().md5("{city:" + that.data.cityList[index].cityID + "}" + "town")
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        console.log("获取乡镇", res.data)
        //请求成功
        if (res.data.state == 1) {
          that.data.multiArray[2] = []
          that.data.multiIndex[2] = []
          for (let i = 0; i < res.data.data.length; i++) {
            that.data.multiArray[2].push(res.data.data[i].townName)
            if (that.data.company.town == res.data.data[i].townID) {
              that.data.multiIndex[2] = i
            }
          }
          that.setData({
            multiArray: that.data.multiArray,
            townList: res.data.data,
            multiIndex: that.data.multiIndex
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
  // 网络请求
  requestLeiXing01: function() {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    var json = new Object()
    var mod = "cate"
    wx.request({
      url: getApp().appData.host + "novaild_list", //仅为示例，并非真实的接口地址
      data: {
        "mod": mod,
        "json": "",
        "token": getApp().md5(mod)
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        console.log("获取类型", res.data)
        //请求成功
        if (res.data.state == 1) {
          that.data.typeArray[0] = []
          for (let i = 0; i < res.data.data.length; i++) {
            that.data.typeArray[0].push(res.data.data[i].cateName)
          }
          var qiYeCateData = res.data.data
          var cateName = ""
          that.data.typeIndex[0] = 0
          if (that.data.company.cateID != 0) {
            for (let i = 0; i < qiYeCateData.length; i++) {
              if (qiYeCateData[i].sort == that.data.company.cateID) {
                that.data.typeIndex[0] = i
                cateName = qiYeCateData[i].cateName
                break
              }
            }
          }
          that.setData({
            typeArray: that.data.typeArray,
            qiYeCateData: res.data.data,
            typeIndex: that.data.typeIndex,
            cateName: cateName
          })
          that.requestLeiXing02(that.data.typeIndex[0])
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
  // 网络请求
  requestLeiXing02: function(index) {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    var json = new Object()
    console.log(that.data.qiYeCateData)
    json.cate = that.data.qiYeCateData[index].sort
    console.log(json)
    var mod = "scate"
    wx.request({
      url: getApp().appData.host + "novaild_list", //仅为示例，并非真实的接口地址
      data: {
        "json": JSON.stringify(json),
        "mod": mod,
        "token": getApp().md5(JSON.stringify(json) + mod)
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        console.log("获取分类", res.data)
        //请求成功
        if (res.data.state == 1) {
          that.data.typeArray[1] = []
          for (let i = 0; i < res.data.data.length; i++) {
            that.data.typeArray[1].push(res.data.data[i].cateName)
          }
          that.data.typeIndex[1] = 0
          var qiYeCateData1 = res.data.data
          var scateName = ""
          if (that.data.company.scateID != 0) {
            for (let i = 0; i < qiYeCateData1.length; i++) {
              if (qiYeCateData1[i].ID == that.data.company.scateID) {
                that.data.typeIndex[1] = i
                scateName = qiYeCateData1[i].cateName
                break
              }
            }
          }
          that.setData({
            typeArray: that.data.typeArray,
            qiYeCateData1: res.data.data,
            typeIndex: that.data.typeIndex,
            scateName: scateName
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
})
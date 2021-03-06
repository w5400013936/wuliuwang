// component/toast/toast.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ''
    },
    message: {
      type: String,
      value: ''
    },
    numberList: {
      type: Array,
      value: []
    },
    url: {
      type: String,
      value: ''
    },
    button: {
      type: String,
      value: '确定'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleHideToast:function(){
      console.log(this.data.url)
      if(this.data.url == ''){
        this.setData({
          show: false
        })
      }
      else{
        this.setData({
          show:false
        })
        wx.navigateTo({
          url: this.data.url,
        })
      }
    },
    call(e){
      var that = this
      console.log(e.currentTarget.dataset.index)
      wx.makePhoneCall({
        phoneNumber: that.data.numberList[e.currentTarget.dataset.index],
      })
    }
  }
})
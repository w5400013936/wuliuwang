// component/contact/contact.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    linkman:{
      type:String,
      value: ''
    },
    address: {
      type: String,
      value: ''
    },
    telphone: {
      type: String,
      value: ''
    },
    phone: {
      type: String,
      value: ''
    },
    // fax: {
    //   type: String,
    //   value: ''
    // },
    // email: {
    //   type: String,
    //   value: ''
    // },
    // website: {
    //   type: String,
    //   value: ''
    // },
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
    call(e) {
      getApp().call(e.currentTarget.dataset.mobile)
    },
  }
})

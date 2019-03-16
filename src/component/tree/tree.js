// component/tree/tree.js
Component({

  properties: {
    model: Object,
  },

  relations: {
  },

  data: {
    open: false,
    isBranch: false,
    index: 0,
    paramC2P: [],
    check: true,
    checkBoxList: [],
    sex: ["男", "女"],
    nation: ["汉族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "朝鲜族", "满族", 
    "侗族", "瑶族", "白族", "土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族",
    "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族", "达斡尔族", "仫佬族",
    "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "塔吉克族", "怒族",
    "乌孜别克族", "俄罗斯族", "鄂温克族", "德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族",
    "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族", "其他"]
  },

  methods: {
    _toggle: function (e) {
      if (this.data.isBranch) {
        this.setData({
          open: !this.data.open,
        })
      }
    },
    _tapItem: function (e) {
      var itemid = e.currentTarget.dataset.itemid;
      // console.log('组件里点击的id: ' + itemid);
      this.triggerEvent('tapitem', { itemid: itemid }, { bubbles: true, composed: true });
    },
    _inputChange: function (e) {
      this.triggerEvent(
        'sent', 
        { 
          paramC2P: {
            name: this.properties.model.name,
            value: e.detail.value
          } 
        }
      );
    },
    _inputCheck: function (e) {
      let str
      switch (this.properties.model.type) {
        case 'email':
          str = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/; break;
        case 'phone':
          str = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/g; break;
        case 'qq':
          str = /^[1-9]\d{4,14}$/g; break;
        case 'idcard':
          str = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/g; break;
        case 'GPA':
          str = /^([0-3](\.\d*)?)|(4(\.)?0?)$/g; break;
        default:
          str = '';
      }
      if (str!=''){
        if (!str.test(e.detail.value)) {
          wx.showToast({
            title: '输入格式不正确！',
            icon: 'none'
          })
          this.setData({
            check: false
          })
        } else {
          this.setData({
            check: true
          })
        }
        console.log(this.data.check+'是的')
        this.triggerEvent(
          'check', {
            check: this.data.check
          }
        )
      }
    },
    _onSent: function (e) {
      this.data.paramC2P[e.detail.paramC2P.name] = e.detail.paramC2P.value
      this.setData({
        paramC2P: this.data.paramC2P
      })
      this.triggerEvent('sent', {
          paramC2P: {
            name: this.properties.model.name,
            value: this.data.paramC2P
          }
        }
      );
      // console.log(this.data.paramC2P)
    },
    _onCheck: function (e) {
      this.setData({
        check: e.detail.check
      })
      this.triggerEvent('check', {
        check: this.data.check
      }
      );
    }
  },

  ready: function (e) {
    this.setData({
      isBranch: Boolean(this.data.model.subItem && this.data.model.subItem.length)
    });
  },  

})
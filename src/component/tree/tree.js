// component/tree/tree.js
Component({

  properties: {
    model: Object,
  },

  data: {
    open: false,
    isBranch: false,
  },

  methods: {
    toggle: function (e) {
      if (this.data.isBranch) {
        this.setData({
          open: !this.data.open,
        })
      }
    },

    tapItem: function (e) {
      var itemid = e.currentTarget.dataset.itemid;
      // console.log('组件里点击的id: ' + itemid);
      this.triggerEvent('tapitem', { itemid: itemid }, { bubbles: true, composed: true });
    }
  },

  ready: function (e) {
    this.setData({
      isBranch: Boolean(this.data.model.subItem && this.data.model.subItem.length),
    });
    console.log(this.data);
  },
})
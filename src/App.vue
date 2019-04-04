<template>
  <div class="app">
    <router-view class="main-content"></router-view>
  </div>
</template>

<script>
// import csHeader from '@components/csHeader'
// import csSidebar from '@components/csSidebar/index.vue'

export default {
  name: 'App',
  components: {
    // csSidebar,
    // csHeader,
  },
  data () {
    return {
      topMenu: {}
    }
  },

  computed: {
    topMenuList () {
      let result = this.$root.menuList.filter(item => (item.parentMenu === 1))
      return result
    },
    secondaryMenuTree () {
      let parentId = this.topMenu.id
      let menuList = this.$root.menuList.filter(item => (item.parentMenu === parentId))
      // menuList.push(this.topMenu)
      let menuTree = this.plantToTree(menuList)
      // console.log('menuTree', menuTree)
      return menuTree
    }
  },

  mounted () {
    // console.log('app', this.$root.menuList)
  },
  methods: {
    plantToTree (list) {
      if (list.length === 0) return
      let temp = list.reduce((combin, item) => {
        let id = item.id
        combin[id] = item
        return combin
      }, {})

      let keys = Object.keys(temp)
      let result = []
      keys.forEach(key => {
        let item = temp[key]
        let parentId = item.parentMenu
        let parent = temp[parentId]
        if (parent) {
          parent.children = parent.children || []
          parent.children.push(item)
        } else {
          result.push(item)
        }
      })

      return result
    },
  }
}
</script>

<style lang="less">
html{
  height: 100%;
}
body{
  margin: 0;
  font-size: 12px;
  min-width: 1200px;
  font-family: 'Microsoft Yahei','微软雅黑','Segoe UI','PingFangSC-Regular',Tahoma,Arial,sans-serif;
  height: 100%;
  overflow: auto;
}
.app{
  height: 100%;
}

.flex-end{
  display: flex;
  justify-content: flex-end;
}
.flex-start{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.flex_center{
  display: flex;
  justify-content: center;
  align-items: center;
}

.clearfix:after{
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.clearfix{
  zoom: 1;
}

/*error info 样式 */
.error-info {
  color: red;
  margin-left: 20px;
  font-size: 12px;

  .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    background-image: url(./images/error.png);
    margin-right: 4px;
    position: relative;
    top: 1px;
  }
  p {
    margin-top: 6px;
  }
}
</style>

<style lang="less">
.main-content{
  // margin-left: 210px;
  user-select: text;
  // padding-top: 80px;
  padding-bottom: 80px;
}
.page-title{
  position: relative;
  font-size: 18px;
  color: #283039;
  padding: 30px 0px 20px;
  border-bottom: 2px solid #f0f2f5;
  margin: 0px 30px 30px;
  span{
    font-size: 18px;
    color:#283039;
  }
}
</style>

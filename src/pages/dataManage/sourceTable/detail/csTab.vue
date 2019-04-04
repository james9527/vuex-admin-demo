<template>
  <nav class="cs-tabs">
    <div class="cs-tabs-bar">
      <div class="cs-tabs-nav-container">
        <div class="cs-tabs-nav">
          <div class="cs-tabs-tab" v-for="(item,index) in tabArr" :class="{'cs-active':curTabIndex==index}" @click="changeTab(index)">
            <router-link :to="{name: item.linkTo}">{{item.name}}</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data () {
    return {
      curTabIndex: 0,
      tabArr: [{
        name: '表结构',
        linkTo: 'dataManage_sourceDetail'
      }, {
        name: '监控信息',
        linkTo: 'dataManage_sourceDetail'
      }]
    }
  },
  name: 'csTab',
  methods: {
    changeTab (index) {
      this.curTabIndex = index
      // 执行父组件的loadTableList方法
      this.$emit('setTabIndex', index)
    }
  },
  mounted () {
  }
}
</script>
<style lang="css">
    .cs-tabs {
      margin: 0 0 30px;
    }
    .cs-tabs-bar {
        border-bottom: 1px solid #E0E6ED;
        margin-bottom: 30px;
        outline: 0;
    }

    .cs-tabs-nav-container {
        margin-bottom: -1px;
        line-height: 1.5;
        font-size: 14px;
        box-sizing: border-box;
        white-space: nowrap;
        overflow: hidden;
        position: relative;
        zoom:1
    }

    .cs-tabs-nav-container:after,.cs-tabs-nav-container:before {
        content: "";
        display: table
    }

    .cs-tabs-nav-container:after {
        clear: both;
        visibility: hidden;
        font-size: 0;
        height: 0
    }

    .cs-tabs-nav {
        padding-left: 0;
        margin: 0;
        float: left;
        list-style: none;
        box-sizing: border-box;
        position: relative;
        transition: -webkit-transform .5s ease-in-out;
        transition: transform .5s ease-in-out;
        transition: transform .5s ease-in-out,-webkit-transform .5s ease-in-out
    }

    .cs-tabs-tab.cs-active>a{
        color:#0074FF;
    }

    .cs-tabs-nav:after,.cs-tabs-nav:before {
        display: table;
        content: " "
    }

    .cs-tabs-nav:after {
        clear: both
    }

    .cs-tabs-nav .cs-tabs-tab-disabled {
        pointer-events: none;
        cursor: default;
        color: #ccc
    }

    .cs-tabs-tab a{
        color: #283039;
        text-decoration: none;
        display: inline-block;
        width: 86px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        font-size: 14px;
    }

    .cs-tabs-nav .cs-tabs-tab {
        display: inline-block;
        height: 100%;
        padding: 8px 16px;
        margin-right: 16px;
        box-sizing: border-box;
        cursor: pointer;
        text-decoration: none;
        position: relative;
        transition: color .3s ease-in-out
    }

    .cs-tabs-bar .cs-tabs-nav-container {
        height: 32px
    }

    .cs-tabs-bar .cs-tabs-tab {
        margin: 0;
        margin-right: 4px;
        height: 31px;
        /* padding: 5px 16px 4px; */
        padding: 0;
        border: 1px solid #E0E6ED;
        border-bottom: 0;
        border-radius: 4px 4px 0 0;
        transition: all .3s ease-in-out;
        background: #F6F8FC;
    }

    .cs-tabs-bar .cs-active {
        height: 32px;
        padding-bottom: 5px;
        background: #FFFFFF;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        border-color: #E0E6ED;
    }

    .cs-tabs-bar .cs-tabs-nav-wrap {
        margin-bottom: 0
    }
</style>
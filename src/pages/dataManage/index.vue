<style lang="less">
  .tableInfoWrap {
    margin: 30px;
    .top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      .el-input, .csDropdown {
        margin-right: 15px;
      }
    }
    .pagination {
      display: flex;
      justify-content: flex-end;
      margin: 20px 0 100px;
    }
    /*固定表头背景色*/
    .fixedTitleStyle {
      background-color: #f6f8fc;
    }
  }
</style>

<style lang="less">
@import '../../components/tabs-nav.less';
</style>

<template>
  <div class="main-content">
    <div class="page-title">
      <span>数据管理</span>
    </div>
    <!--tab页签切换-->
    <csSwitchBar :value="activeTab" :switchList="switchList" customClass="tabs-nav" v-if="$route.name !== 'dataManage_sourceDetail'">
      <template slot-scope="scoped">
        <router-link
          :to="scoped.item.to"
          class="linkto"
          :class="{'active': scoped.item.id === activeTab.id}"
        >{{scoped.item.label}}</router-link>
      </template>
    </csSwitchBar>
    <router-view></router-view>
  </div>
</template>

<script>
  import csSwitchBar from '@common/csSwitchBar'

  export default {
    name: 'dataManage',
    components: {
      csSwitchBar
    },
    data () {
      return {
        curSearchParam: '',
        curTabIndex: 1,
        switchList: [{
          id: 'source',
          label: '源表',
          to: {
            name: 'dataManageSource'
          }
        }, {
          id: 'dimension',
          label: '维度',
          to: {
            name: 'dataManageDimension'
          }
        }],
      }
    },
    computed: {
      activeTab () {
        console.log(this.$route)
        let {fullPath} = this.$route
        if (/dataManage\/source/.test(fullPath)) {
          return {
            id: 'source',
            label: '源表'
          }
        }
        if (/dataManage\/dimension/.test(fullPath)) {
          return {
            id: 'dimension',
            label: '维度'
          }
        }
      }
    },
    methods: {
      handleAdd () {

      },
      handleExport () {

      },
      getSearchParam (param) {
        // console.log('curSearchParam '+param);
        this.curSearchParam = param
        this.searchByOrder()
      },
      setTabIndex (index) {
        this.curTabIndex = index
        console.log('index::: ' + index)
      }
    }
  }
</script>
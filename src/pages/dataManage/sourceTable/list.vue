<style lang="less" scoped>
</style>

<template>
  <div class="tableInfoWrap">
    <div class="top">
      <button type="button" name="button" class="csButton" @click="handleAdd">添加源表</button>
      <div class="flex-start">
          <blurSearch :inputWidth="360" :txtPlaceholder="'输入源表名'" v-on:getParam="getSearchParam"></blurSearch>
          <button type="button" name="button" class="csButton-ghost" @click="handleExport">导出</button>
      </div>
    </div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="index"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="tableName"
          label="源表名"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="statusText"
          label="启用状态"
          width="80">
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容说明"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="creator"
          label="创建人"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          min-width="120">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="100">
          <template slot-scope="scope">
            <el-button @click="routerGo(scope.row.id, 'dataManage_sourceDetail')" type="text" size="small">详情</el-button>
            <el-button @click="routerGo(scope.row.id, 'dataManage_sourceEdit')" type="text" size="small">编辑</el-button>
            <el-button @click="handleChangeStatus(scope.row.id, scope.row.status)" type="text" size="small">{{scope.row.status === 1 ? '停用' : '启用'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
          <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="curPageIndex"
                  :page-sizes="[10, 20, 30, 50]"
                  :page-size="curPageSize"
                  layout="prev,pager,next,sizes,total"
                  :total="totalCount">
          </el-pagination>
      </div>
  </div>
</template>

<script>
  import blurSearch from '@/common/blurSearch'
  import csSearch from '@/common/csSearch'
  import { FindSourceTableByPage, UpdateSourceTableStatus } from '@api/dataManage'
  import url from '@api/url/dataManage'
  import parseDate from '@/utils/parseDate'

  const findSourceTableByPage = new FindSourceTableByPage()
  const updateSourceTableStatus = new UpdateSourceTableStatus()

  export default {
    components: {
      blurSearch,
      csSearch
    },
    data () {
      return {
        curSearchParam: '',
        curPageIndex: 1,
        curPageSize: 10,
        totalCount: 0,
        tableData: [],
        sourceTableName: ''
      }
    },
    methods: {
      routerGo (id, routeName) {
        this.$router.push({
          name: routeName,
          params: { id: id }
        })
      },
      handleAdd () {
        console.log('handleAdd...')
        this.$router.push({
          name: 'dataManage_sourceEdit',
          params: {id: '0'}
        })
      },
      handleExport () {
        let src = url.ExportSourceTable + `?sourceTableName=${this.sourceTableName}`
        console.log(src)
        if (window.navigator.appVersion.indexOf('QQBrowser') > -1) {
          window.open(src)
          // console.log('QQBrowser 下载成功...');
        } else {
          window.open(src, '_self', '')
          // console.log('下载成功...');
        }
      },
      handleDetail (id) {
        let params = {
          id: id,
          page: 1,
          size: 10
        }
        // findSourceTableDetail.isMock = false
        findSourceTableDetail.fetch(params).then(res => {

        })
      },
      async handleChangeStatus (id, status) {
        let params = {
          id: id,
          status: status === 1 ? 0 : 1,
          erp: 'liujingfa'
        }
        // updateSourceTableStatus.isMock = false
        await updateSourceTableStatus.fetch(params).then(res => {
          if (res.data.code === '0000') {
            this.loadTableList()
          }
        })
      },
      handleSizeChange (val) {
        this.curPageIndex = 1
        this.curPageSize = val
        this.loadTableList()
        setTimeout(function () {
          scrollTo(0, 0)
        }, 100)
      },
      handleCurrentChange (val) {
        this.curPageIndex = val
        this.loadTableList()
      },
      getSearchParam (param) {
        this.curSearchParam = param
      },
      async loadTableList () {
        let params = {
          sourceTableName: '',
          page: this.curPageIndex,
          size: this.curPageSize
        }
        // findSourceTableByPage.isMock = false
        await findSourceTableByPage.fetch(params).then(res => {
          if (res.code !== '0000' || !res.data) return
          let arr = []
          res.data.list.forEach((item, index) => {
            arr.push({
              index: index + 1,
              id: item.id,
              tableName: item.sourceTableName,
              status: item.upOrDown,
              statusText: item.upOrDown === 1 ? '启用' : '停用',
              content: item.content || '--',
              creator: item.createdPerson,
              createTime: parseDate(item.createdTime, true),
              updateTime: item.modifiedTime ? parseDate(item.modifiedTime, true) : '--',
              remark: item.remark
            })
          })
          this.tableData = arr
          this.totalCount = res.data.totalNum
        })
      },
      setTabIndex (index) {
        console.log('index::: ' + index)
      }
    },
    mounted () {
      this.loadTableList()
    }
  }
</script>
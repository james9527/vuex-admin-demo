<style lang="less">
  .detail_wrapper {
    margin: 0 30px;
    .title {
      font-size: 16px;
      color: #283039;
      font-weight: 400;
      margin-bottom: 22px;
    }
    .label_wrapper {
      display: inline-block;
      margin-bottom: 20px;
      .csInput, .csDropdown {
        width: 380px;
      }
      .label_text {
        font-size: 14px;
        color: #717580;
        line-height: 20px;
        display: inline-block;
        width: 110px;
        text-align: right;
        margin-right: 13px;
        .require {
          font-size: 14px;
          color: #F52F3E;
        }
      }
      .el-textarea {
        .el-textarea__inner {
          width: '20%'
        }
      }
    }
    .pagination {
      display: flex;
      justify-content: flex-end;
      margin: 20px 0 30px;
    }
    .btns {
      text-align: center;
      margin-top: 20px;
    }
  }
</style>
<template>
  <div class="detail_wrapper">
    <h3 class="title">{{'源表详情'}}</h3>
    <div class="line">
      <label class="label_wrapper">
        <span class="label_text">
          源表名：
        </span>
        <span>{{detailInfoObj.sourceTableName}}</span>
      </label>
    </div>
    <div class="line">
      <label class="label_wrapper">
        <span class="label_text">
          内容说明：
        </span>
        <span>{{detailInfoObj.content}}</span>
      </label>
    </div>
    <div class="line">
      <label class="label_wrapper">
        <span class="label_text">
          启用状态：
        </span>
        <span>{{detailInfoObj.status}}</span>
      </label>
    </div>
    <div class="line">
      <label class="label_wrapper">
        <span class="label_text">
          创建时间：
        </span>
        <span>{{detailInfoObj.createdTime}}</span>
      </label>
    </div>
    <div class="line">
      <label class="label_wrapper">
        <span class="label_text">
          创建人：
        </span>
        <span>{{detailInfoObj.createdPersion}}</span>
      </label>
    </div>
    <div class="line">
      <label class="label_wrapper">
        <span class="label_text">
          备注：
        </span>
        <span>{{detailInfoObj.content}}</span>
      </label>
    </div>
    <!--tab页签切换-->
    <csTab @setTabIndex="setTabIndex"></csTab>
    <div v-show="curTabIndex === 0">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="fieldName"
          label="字段名称"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="cnName"
          label="中文名称"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="fieldType"
          label="字段类型"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="字段说明"
          min-width="120">
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
    <div v-show="curTabIndex === 1">
      <p>暂无监控数据</p>
    </div>
    <div class="btns">
      <button type="button" name="button" class="csButton" @click="goBack">返回</button>
    </div>
  </div>
</template>
<script>
  import csTab from './csTab'
  import { FindSourceTableDetail } from '@api/dataManage'

  const findSourceTableDetail = new FindSourceTableDetail()

  export default {
    components: {
      csTab
    },
    data () {
      return {
        curTableId: 0,
        curTabIndex: 0,
        curPageIndex: 1,
        curPageSize: 10,
        totalCount: 0,
        tableData: [],
        detailInfoObj: [],
        switchList: [{
          id: 'tableInfo',
          label: '表结构',
          to: {
            name: 'dataManage_sourceDetail'
          }
        }, {
          id: 'monitorInfo',
          label: '监控信息',
          to: {
            name: 'dataManage_sourceDetail'
          }
        }]
      }
    },
    methods: {
      setTabIndex (val) {
        this.curTabIndex = val
      },
      goBack () {
        window.history.go(-1)
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
      loadTableList () {
        let params = {
          id: this.curTableId,
          page: this.curPageIndex,
          size: this.curPageSize
        }
        findSourceTableDetail.isMock = false
        findSourceTableDetail.fetch(params).then(res => {
          if (res.code !== '0000') return
          this.detailInfoObj = res.data
          this.totalCount = res.data.totalNum
          let arr = []
          if (res.data.tablelist.length === 0) return
          res.data.tablelist.forEach(item => {
            arr.push({
              fieldName: item.fieldName || '--',
              fieldType: item.fieldType || '--',
              cnName: item.chineseName || '--',
              remark: item.fieldInstruction || '--'
            })
          })
          this.tableData = arr
        })
      }
    },
    mounted () {
      this.curTableId = this.$route.params.id
      this.loadTableList()
    }
  }
</script>

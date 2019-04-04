<style lang="less" scoped>
</style>

<template>
  <div class="tableInfoWrap">
      <div class="top">
          <button type="button" name="button" class="csButton" @click="handleAdd">添加维度</button>
          <div class="flex-start">
              <csDropdown
                class="index-list dropdown"
                v-model="selectedStatus"
                :optionList="statusOptionList">
              </csDropdown>
              <blurSearch 
                :inputWidth="360" 
                :txtPlaceholder="'维度字段'" 
                v-on:getParam="getSearchParam">
              </blurSearch>
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
          prop="dKey"
          label="维度字段"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="dName"
          label="维度名称"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="property"
          label="属性"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="enums"
          label="枚举值示例"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="group"
          label="分组"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="status"
          label="维度状态"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="creator"
          label="创建人"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          min-width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          label-class-name="fixedTitleStyle"
          min-width="100">
          <template slot-scope="scope">
            <el-button @click="routerGo(scope.row.id, 'dataManage_dimensionEdit')" type="text" size="small">编辑</el-button>
            <el-button @click="handleChangeStatus(scope.row.id, scope.row.status)" type="text" size="small">{{scope.row.status === 1 ? '下线' : '上线'}}</el-button>
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
  import csDropdown from '@/common/csDropdown'
  import { FindDimensionByPage, UpdateDimensionById } from '@api/dataManage'
  import url from '@api/url/dataManage'
  import parseDate from '@/utils/parseDate'
  
  const findDimensionByPage = new FindDimensionByPage()
  const updateDimensionById = new UpdateDimensionById()

  export default {
    components: {
      blurSearch,
      csDropdown
    },
    data () {
      return {
        curSearchParam: '',
        selectedStatus: {id: 0, label: '不限'},
        statusOptionList: [{
          id: 0, label: '不限'
        }, {
          id: 1, label: '在线'
        }, {
          id: 2, label: '下线'
        }],
        curPageIndex: 1,
        curPageSize: 10,
        totalCount: 0,
        tableData: []
      }
    },
    watch: {
      'selectedStatus': function (newVal, oldVal) {
        if (newVal) {
          this.selectedStatus = newVal
          this.loadTableList()
        }
      }
    },
    computed: {
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
          name: 'dataManage_dimensionEdit',
          params: {id: '0'}
        })
      },
      handleExport () {
        let src = url.ExportDimension + `?dimensionStaus=${this.selectedStatus.id}&dimensionId=${this.curSearchParam}`
        console.log(src)
        if (window.navigator.appVersion.indexOf('QQBrowser') > -1) {
          window.open(src)
          // console.log('QQBrowser 下载成功...');
        } else {
          window.open(src, '_self', '')
          // console.log('下载成功...');
        }
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
      async handleChangeStatus (id, status) {
        let params = {
          id: id,
          dimensionStatus: status === 1 ? 2 : 1,
          erp: 'liujingfa'
        }
        // updateDimensionById.isMock = false
        await updateDimensionById.fetch(params).then(res => {
          if (res.data.code === '0000') {
            this.selectedStatus = this.statusOptionList[0]
            this.loadTableList()
          }
        })
      },
      handleEdit (id) {

      },
      getSearchParam (param) {
        // console.log('curSearchParam '+param);
        this.curSearchParam = param
        this.loadTableList()
        // this.searchByOrder()
      },
      returnPropertyName (val) {
        let str = ''
        switch (val) {
          case 'time':
            str = '时间'
            break
          case 'text':
            str = '文本'
            break
          case 'num':
            str = '数值'
            break
          case 'bool':
            str = '布尔'
            break
          default:
            str = '文本'
            break
        }
        return str
      },
      async loadTableList () {
        let params = {
          dimensionStatus: this.selectedStatus.id === 0 ? '' : this.selectedStatus.id,
          dimensionId: this.curSearchParam,
          page: this.curPageIndex,
          size: this.curPageSize
        }
        // findDimensionByPage.isMock = false
        await findDimensionByPage.fetch(params).then(res => {
          if (res.code === '0000' && !res.data) return
          if (!res.data.list) return
          let arr = []
          res.data.list.forEach((item, index) => {
            arr.push({
              index: index + 1,
              id: item.id,
              dKey: item.dimensionId,
              dName: item.dimensionName,
              property: this.returnPropertyName(item.property) || '--',
              enums: item.enumExample || '--',
              group: item.group || '--',
              status: item.dimensionStatus === 1 ? '在线' : '下线',
              creator: item.createdPerson,
              createTime: parseDate(item.createdTime, true),
              remark: item.remark || '--'
            })
          })
          this.tableData = arr
          this.totalCount = res.data.totalNum
        })
      }
    },
    mounted () {
      this.loadTableList()
    }
  }
</script>
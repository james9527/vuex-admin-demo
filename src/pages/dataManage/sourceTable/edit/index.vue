<style lang='less' scoped>
  .edit_wrapper {
    margin: 30px 30px 0;
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
    .eventTime {
      // overflow-x: hidden;
      // overflow-y: scroll;
      .label_text {
        float: left;
        margin-right: 17px;
      }
      .incre_dropdown {
        float: left;
      }
    }
    .textarea {
      .input {
        width: 380px;
        vertical-align: top;
        height: 122px;
      }
    }
    .btns {
      display: flex;
      justify-content: center;
      margin-top: 40px;
      button:first-child {
        margin-right: 30px;
      }
    }
  }
</style>
<template>
  <div class="edit_wrapper">
    <h3 class="title">{{action === 'add' ? '添加源表' : '编辑源表'}}</h3>
    <div class="line">
      <label class="label_wrapper">
        <span class="label_text">
          <i class="require">*</i>
          源表名：
        </span>
        <csDropdown 
         v-model="sourceTable" 
         prop="id" 
         label="label" 
         :optionList="sourceTableList"
         :disabled="action === 'edit'"
        ></csDropdown>
      </label>
    </div>
    <div class="line">
      <label class="label_wrapper">
        <span class="label_text">
          <i class="require">*</i>
          启用状态：
        </span>
        <csDropdown 
         v-model="enableStatus" 
         prop="id" 
         label="label" 
         :optionList="enableStatusList"
        ></csDropdown>
      </label>
    </div>
    <div class="line">
      <label class="label_wrapper">
        <span class="label_text">
          内容说明：
        </span>
        <input type="text" class="csInput" v-model="content"/>
      </label>
    </div>
    <div class="line">
      <label class="label_wrapper">
        <span class="label_text">
          <i class="require">*</i>
          事件ID字段：
        </span>
        <csDropdown
          v-model="eventID" 
          prop="id" 
          label="label" 
          :optionList="eventIDList" 
          :disabledOptions="disabledOptions"
        ></csDropdown>
        <span class="error-info" v-show="validate.eId"><i class="icon"></i>事件ID不能为空</span>
      </label>
    </div>
    <div class="line">
      <label class="label_wrapper">
        <span class="label_text">
          <i class="require">*</i>
          事件名称字段：
        </span>
        <csDropdown 
          v-model="eventName" 
          prop="id" 
          label="label" 
          :optionList="eventNameList" 
          :disabledOptions="disabledOptions"
        ></csDropdown>
        <span class="error-info" v-show="validate.eName"><i class="icon"></i>事件名称不能为空</span>
      </label>
    </div>
    <div class="line" v-for="(item, index) in eventTimeList" :key="index">
      <label class="label_wrapper eventTime">
        <span class="label_text" v-show="index === 0">
          <i class="require">*</i>
          事件时间字段：
        </span>
        <span class="label_text" v-show="index > 0">
          &nbsp;
        </span>
        <eventTime :curIndex="index" :totalNum="eventTimeList.length"></eventTime>
      </label>
    </div>
    <div class="line">
      <label class="label_wrapper">
        <span class="label_text">
          <i class="require">*</i>
          分区字段：
        </span>
        <csDropdown 
          v-model="partitionField" 
          prop="id" 
          label="label" 
          :optionList="partitionFieldList"
          :disabledOptions="disabledOptions"
        ></csDropdown>
        <span class="error-info" v-show="validate.ePartition"><i class="icon"></i>分区字段不能为空</span>
      </label>
    </div>
    <div class="line">
      <label class="label_wrapper">
        <span class="label_text">
          系统字段：
        </span>
        <csDropdown 
          v-model="systemField" 
          prop="id" 
          label="label" 
          :optionList="systemFieldList"
          :disabledOptions="disabledOptions"
        ></csDropdown>
      </label>
    </div>
    <div class="line textarea">
      <label class="label_wrapper">
        <span class="label_text">
          备注：
        </span>
        <el-input
          resize="none"
          class="input"
          type="textarea"
          :rows="2"
          placeholder="输入备注"
          v-model="remark">
        </el-input>
      </label>
    </div>
    <div class="btns">
      <button type="button" name="button" class="csButton-ghost" @click="handleCancel">取消</button>
      <button type="button" name="button" class="csButton" @click="handleSave">保存</button>
    </div>
  </div>
</template>
<script>
  import csDropdown from '@/common/csDropdown'
  import eventTime from './eventTime'
  import { createNamespacedHelpers } from 'vuex'
  import { FindEventTable, FindEventTableInfo, AddSourceTable, FindSourceTable, UpdateSourceTable } from '@api/dataManage'

  const { mapMutations, mapGetters } = createNamespacedHelpers('sourceEdit')
  const findEventTable = new FindEventTable()
  const findEventTableInfo = new FindEventTableInfo()
  const addSourceTable = new AddSourceTable()
  const findSourceTable = new FindSourceTable()
  const updateSourceTable = new UpdateSourceTable()
  // const TIME = 500

  export default {
    components: {
      csDropdown,
      eventTime
    },
    data () {
      return {
        curTableId: '0',
        curTimeFields: '', // 已选时间字段(编辑)
        sourceTableOptions: [],
        validate: {
          eId: false,
          eName: false,
          ePartition: false
        }
      }
    },
    computed: {
      ...mapGetters({
        currentPage: 'getPageInfo',
        // getItemByIndex: 'getItemByIndex',
      }),
      getUserErp () {
        let erp = this.currentPage.userInfo.erp
        console.log(erp)
        return erp
      },
      disabledOptions () {
        return [
          this.eventID.id,
          this.eventName.id,
          this.partitionField.id,
          this.systemField.id
        ]
      },
      action () {
        if (this.curTableId === '0') return 'add'
        return 'edit'
      },
      sourceTable: {
        get () {
          let sourceTable = this.currentPage.sourceTable
          return sourceTable
        },
        set (val) {
          let payload = {
            sourceTable: val
          }
          this.updateModule(payload)
          this.getEventIdsAndNames(val.label)
        }
      },
      sourceTableList () {
        let list = this.getEventTableList()
        return list
      },
      enableStatus: {
        get () {
          let enableStatus = this.currentPage.enableStatus
          return enableStatus
        },
        set (val) {
          let payload = {
            enableStatus: val
          }
          this.updateModule(payload)
        }
      },
      enableStatusList () {
        let list = this.currentPage.enableStatusList
        return list
      },
      content: {
        get () {
          let content = this.currentPage.content
          return content
        },
        set (val) {
          let payload = {
            content: (val || '').trim()
          }
          this.updateModule(payload)
        }
      },
      eventID: {
        get () {
          let eventID = this.currentPage.eventID
          return eventID
        },
        set (val) {
          console.log(JSON.stringify(val))
          let payload = {
            eventID: val
          }
          this.updateModule(payload)
          this.validate.eId = false
          // this.updateFieldSelectedStatus({id: val.id, label: val.label})
        }
      },
      eventIDList () {
        const source = this.currentPage.globalFieldList
        // return JSON.parse(JSON.stringify(source)) // 深拷贝对象
        // return [...source.map(item => ({...item}))] // 深拷贝对象
        return source
      },
      eventName: {
        get () {
          let eventName = this.currentPage.eventName
          return eventName
        },
        set (val) {
          console.log(JSON.stringify(val))
          let payload = {
            eventName: val
          }
          this.updateModule(payload)
          this.validate.eName = false
          // this.updateFieldSelectedStatus({id: val.id, label: val.label})
        }
      },
      eventNameList () {
        return this.currentPage.globalFieldList
      },
      eventTimeList () {
        return this.currentPage.selectedTimeFields || []
      },
      partitionField: {
        get () {
          let partitionField = this.currentPage.partitionField
          return partitionField
        },
        set (val) {
          let payload = {
            partitionField: val
          }
          this.updateModule(payload)
          this.validate.ePartition = false
        }
      },
      partitionFieldList () {
        return this.currentPage.globalFieldList
      },
      systemField: {
        get () {
          let systemField = this.currentPage.systemField
          return systemField
        },
        set (val) {
          let payload = {
            systemField: val
          }
          this.updateModule(payload)
        }
      },
      systemFieldList () {
        return this.currentPage.globalFieldList
      },
      remark: {
        get () {
          let remark = this.currentPage.remark
          return remark
        },
        set (val) {
          let payload = {
            remark: (val || '').trim()
          }
          this.updateModule(payload)
        }
      }
    },
    methods: {
      ...mapMutations({
        updateModule: 'updateModule',
        updateFieldSelectedStatus: 'updateFieldSelectedStatus'
      }),
      handleCancel () {
        window.history.go(-1)
      },
      validateFields () {
        let obj = this.currentPage
        let hasError = false

        if (obj.eventID.id === -1) {
          hasError = true
          this.validate.eId = true
        } else {
          this.validate.eId = false
        }

        if (obj.eventName.id === -1) {
          hasError = true
          this.validate.eName = true
        } else {
          this.validate.eName = false
        }

        if (obj.partitionField.id === -1) {
          hasError = true
          this.validate.ePartition = true
        } else {
          this.validate.ePartition = false
        }

        return hasError
      },
      handleSave () {
        // 校验必填字段
        let hasError = this.validateFields()
        if (hasError) return

        if (this.action === 'add') {
          this.addSourceTable()
        } else {
          this.editSourceTable()
        }
      },
      async addSourceTable () {
        let params = this.getParams()
        // addSourceTable.isMock = false
        await addSourceTable.fetch(params).then(res => {
          if (res.data.code === '0000') window.history.go(-1)
        })
      },
      async editSourceTable () {
        let params = this.getParams()
        params.id = parseInt(this.curTableId)
        // updateSourceTable.isMock = false
        await updateSourceTable.fetch(params).then(res => {
          if (res.data.code === '0000') window.history.go(-1)
        })
      },
      getEventIdsAndNames (tableName) {
        let param = { table: tableName }
        // findEventTableInfo.isMock = false
        findEventTableInfo.fetch(param).then(res => {
          let arr = []
          if (!res.data || res.code !== '0000') return
          res.data.map((item, index) => {
            arr.push({
              id: index,
              label: item.fieldName
            })
          })
          if (this.curTableId === '0') {
            let payload = {
              content: '',
              eventID: {id: -1, label: '请选择事件ID'},
              eventName: {id: -1, label: '请选择事件名称'},
              partitionField: {id: -1, label: '请选择分区字段'},
              systemField: {id: -1, label: '请选择系统字段'},
              remark: '',
              globalFieldList: arr,
              selectedTimeFields: [{eventTime: {}, fieldList: []}]
              // eventIDList: arr,
              // eventNameList: arr,
              // partitionFieldList: arr,
              // systemFieldList: arr
            }
            this.updateModule(payload)
            this.currentPage.selectedTimeFields[0].eventTime = arr[0]
            this.currentPage.selectedTimeFields[0].fieldList = arr
          } else {
            let payload = {
              globalFieldList: arr,
              // eventIDList: arr,
              // eventNameList: arr,
              // partitionFieldList: arr,
              // systemFieldList: arr
            }
            this.updateModule(payload)
            this.currentPage.selectedTimeFields[0].eventTime = arr[0]
            this.currentPage.selectedTimeFields[0].fieldList = arr
            this.getTimeFields(arr)
          }
        })
      },
      getTimeFields (list) {
        console.log(this.curTimeFields)
        // console.log(JSON.stringify(list))
        let eNames = this.curTimeFields.split(',')
        console.log(eNames)
        let arr = []
        list.map((item, index) => {
          eNames.map((child) => {
            if (item.label === child) {
              arr.push({
                eventTime: {id: item.id, label: item.label},
                fieldList: list
              })
            }
          })
        })
        let payload = {
          selectedTimeFields: arr
        }
        this.updateModule(payload)
      },
      getEventTableList () {
        let list = []
        // findEventTable.isMock = false
        findEventTable.fetch({}).then(res => {
          if (!res.data || res.code !== '0000') return
          res.data.map((item, index) => {
            list.push({
              id: index,
              label: item
            })
          })
          // 新增操作 初始化数据
          if (this.curTableId === '0') {
            this.getEventIdsAndNames(list[0].label)
            let payload = {
              sourceTable: list[0],
            }
            this.updateModule(payload)
          }
        })
        return list
      },
      getSourceTableInfo () {
        let param = { id: this.curTableId }
        // findSourceTable.isMock = false
        findSourceTable.fetch(param).then(res => {
          if (!res.data || res.code !== '0000') return
          let obj = res.data[0] // 接口数据
          this.getEventIdsAndNames(obj.sourceTableName)
          this.curTimeFields = obj.eventTime
          let payload = {
            sourceTable: {id: obj.sourceTableName, label: obj.sourceTableName},
            content: obj.content,
            eventID: {id: obj.eventId, label: obj.eventId},
            eventName: {id: obj.eventName, label: obj.eventName},
            partitionField: {id: obj.partition, label: obj.partition},
            systemField: {id: obj.system || '-1', label: obj.system || '暂无字段'},
            remark: obj.remark || '--'
          }
          this.updateModule(payload)
        })
      },
      getParams () {
        let obj = this.currentPage.selectedTimeFields
        let timeFields = []
        obj.map((item, index) => {
          timeFields.push(item.eventTime.label)
        })
        console.log(timeFields.join(','))
        let params = {
          sourceTableName: this.sourceTable.label,
          status: this.enableStatus.id,
          content: this.content,
          eventId: this.eventID.label,
          eventName: this.eventName.label,
          eventTime: timeFields.join(','),
          partition: this.partitionField.label,
          system: this.systemField.label,
          remark: this.remark,
          erp: this.getUserErp
        }
        return params
      }
    },
    mounted () {
      this.curTableId = this.$route.params.id
      if (this.curTableId !== '0') this.getSourceTableInfo()
    }
  }
</script>

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
      .csInput, .csDropdown {
        width: 240px;
      }
    }
    .textarea {
      .input {
        width: 328px;
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
    <h3 class="title">{{action === 'add' ? '添加维度' : '编辑维度'}}</h3>
    <div class="line">
      <label class="label_wrapper">
        <span class="label_text">
          <i class="require">*</i>
          维度字段：
        </span>
        <input type="text" class="csInput input" v-model="dimensionId" placeholder="请输入维度字段" @blur="judgeIsExist"/>
        <span class="error-info" v-show="validate.dId"><i class="icon"></i>维度字段不能为空</span>
        <span class="error-info" v-show="validate.isExist"><i class="icon"></i>此维度字段已存在</span>
      </label>
    </div>
    <div class="line">
      <label class="label_wrapper">
        <span class="label_text">
          <i class="require">*</i>
          维度名称：
        </span>
        <input type="text" class="csInput" v-model="dimensionName"/>
        <span class="error-info" v-show="validate.dName"><i class="icon"></i>维度名称不能为空</span>
      </label>
    </div>
    <div class="line">
      <label class="label_wrapper">
        <span class="label_text">
          <i class="require">*</i>
          属性：
        </span>
        <csDropdown v-model="property" prop="id" label="label" :optionList="propertyList"></csDropdown>
        <span class="error-info" v-show="validate.dProp"><i class="icon"></i>属性不能为空</span>
      </label>
    </div>
    <div class="line">
      <label class="label_wrapper">
        <span class="label_text">
          枚举值示例：
        </span>
        <input type="text" class="csInput" v-model="enumExample"/>
      </label>
    </div>
    <div class="line">
      <label class="label_wrapper">
        <span class="label_text">
          <i class="require">*</i>
          分组：
        </span>
        <input type="text" class="csInput" v-model="group"/>
        <span class="error-info" v-show="validate.dGroup"><i class="icon"></i>分组不能为空</span>
      </label>
    </div>
    <div class="line">
      <label class="label_wrapper">
        <span class="label_text">
          <i class="require">*</i>
          维度状态：
        </span>
        <csDropdown v-model="dimensionStatus" prop="id" label="label" :optionList="dimensionStatusList"></csDropdown>
        <span class="error-info" v-show="validate.dStatus"><i class="icon"></i>维度状态不能为空</span>
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
  import { createNamespacedHelpers } from 'vuex'
  import { IsExistDimension, AddDimension, FindDimensionById, UpdateDimensionById } from '@api/dataManage'
  
  const { mapMutations, mapGetters } = createNamespacedHelpers('dimensionEdit')
  const isExistDimension = new IsExistDimension()
  const addDimension = new AddDimension()
  const findDimensionById = new FindDimensionById()
  const updateDimensionById = new UpdateDimensionById()

  export default {
    components: {
      csDropdown
    },
    data () {
      return {
        curDimensionId: 0,
        validate: {
          dId: false,
          isExist: false,
          dName: false,
          dProp: false,
          dGroup: false,
          dStatus: false
        }
      }
    },
    computed: {
      ...mapGetters({
        currentPage: 'getPageInfo',
      }),
      getUserErp () {
        let erp = this.currentPage.userInfo.erp
        console.log(erp)
        return erp
      },
      action () {
        if (this.curDimensionId === '0') return 'add'
        return 'edit'
      },
      dimensionId: {
        get () {
          let dimensionId = this.currentPage.dimensionId
          return dimensionId
        },
        set (val) {
          let payload = {
            dimensionId: (val || '').trim()
          }
          this.updateModule(payload)
          this.validate.dId = false
        }
      },
      dimensionName: {
        get () {
          let dimensionName = this.currentPage.dimensionName
          return dimensionName
        },
        set (val) {
          let payload = {
            dimensionName: (val || '').trim()
          }
          this.updateModule(payload)
          this.validate.dName = false
        }
      },
      property: {
        get () {
          let property = this.currentPage.property
          return property
        },
        set (val) {
          let payload = {
            property: val
          }
          this.updateModule(payload)
          this.validate.dProp = false
        }
      },
      propertyList () {
        let property = this.currentPage.propertyList
        return property
      },
      enumExample: {
        get () {
          let enumExample = this.currentPage.enumExample
          return enumExample
        },
        set (val) {
          let payload = {
            enumExample: (val || '').trim()
          }
          this.updateModule(payload)
        }
      },
      group: {
        get () {
          let group = this.currentPage.group
          return group
        },
        set (val) {
          let payload = {
            group: (val || '').trim()
          }
          this.updateModule(payload)
          this.validate.dGroup = false
        }
      },
      dimensionStatus: {
        get () {
          let dimensionStatus = this.currentPage.dimensionStatus
          return dimensionStatus
        },
        set (val) {
          let payload = {
            dimensionStatus: val
          }
          this.updateModule(payload)
          this.validate.dStatus = false
        }
      },
      dimensionStatusList () {
        let statusList = this.currentPage.dimensionStatusList
        return statusList
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
      }),
      handleCancel () {
        window.history.go(-1)
      },
      validateFields () {
        let params = this.getParams()
        let hasError = false

        if (!params.dimensionId) {
          hasError = true
          this.validate.dId = true
        } else {
          this.validate.dId = false
        }

        if (!params.dimensionName) {
          hasError = true
          this.validate.dName = true
        } else {
          this.validate.dName = false
        }

        if (params.property === -1) {
          hasError = true
          this.validate.dProp = true
        } else {
          this.validate.dProp = false
        }

        if (!params.group) {
          hasError = true
          this.validate.dGroup = true
        } else {
          this.validate.dGroup = false
        }

        if (params.dimensionStatus === -1) {
          hasError = true
          this.validate.dStatus = true
        } else {
          this.validate.dStatus = false
        }

        return hasError
      },
      handleSave () {
        // 校验必填字段
        let hasError = this.validateFields()
        if (hasError || this.validate.isExist) return
        
        if (this.action === 'add') {
          this.addDimension()
        } else {
          this.editDimension()
        }
      },
      async addDimension () {
        let params = this.getParams()
        // addDimension.isMock = false // 禁用mock数据
        await addDimension.fetch(params).then(res => {
          if (res.data.code === '0000') window.history.go(-1)
        })
      },
      async editDimension () {
        let params = this.getParams()
        params.id = parseInt(this.curDimensionId)
        // updateDimensionById.isMock = false // 禁用mock数据
        await updateDimensionById.fetch(params).then(res => {
          if (res.data.code === '0000') window.history.go(-1)
        })
      },
      async judgeIsExist () {
        this.validate.isExist = false
        if (!this.dimensionId) return
        let param = { dimensionId: this.dimensionId }
        // isExistDimension.isMock = false
        await isExistDimension.fetch(param).then(res => {
          if (res.code !== '0000') {
            this.validate.isExist = true
          }
        })
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
      getDimensionInfoById () {
        let param = { id: this.curDimensionId }
        // findDimensionById.isMock = false
        findDimensionById.fetch(param).then(res => {
          if (!res.data || res.code !== '0000') return
          let obj = res.data[0]
          let payload = {
            dimensionId: obj.dimensionId,
            dimensionName: obj.dimensionName,
            property: { id: obj.property, label: obj.property ? this.returnPropertyName(obj.property) : '请选择属性' },
            enumExample: obj.enumExample,
            group: obj.group,
            dimensionStatus: { id: obj.dimensionStatus, label: obj.dimensionStatus === 1 ? '在线' : '下线' },
            remark: obj.remark
          }
          this.updateModule(payload)
        })
      },
      getParams () {
        let params = {
          dimensionId: this.dimensionId,
          dimensionName: this.dimensionName,
          property: this.property.id,
          enumExample: this.enumExample,
          group: this.group,
          dimensionStatus: this.dimensionStatus.id,
          remark: this.remark,
          erp: this.getUserErp
        }
        return params
      }
    },
    mounted () {
      this.curDimensionId = this.$route.params.id
      let payload = {
        dimensionId: '',
        dimensionName: '',
        property: { id: -1, label: '请选择属性' },
        enumExample: '',
        group: '',
        dimensionStatus: { id: -1, label: '请选择状态' },
        remark: ''
      }
      this.updateModule(payload)
      if (this.curDimensionId !== '0') this.getDimensionInfoById()
    }
  }
</script>


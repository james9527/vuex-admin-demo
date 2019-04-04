export default {
  sourceTable: {},
  sourceTableList: [],
  enableStatus: {id: 1, label: '启用'},
  enableStatusList: [{
    id: 0, label: '停用'
  }, {
    id: 1, label: '启用'
  }],
  content: '',
  eventID: {},
  eventIDList: [],
  eventName: {},
  eventNameList: [],
  globalFieldList: [],
  selectedTimeFields: [{eventTime: {}, fieldList: []}],
  partitionField: {},
  partitionFieldList: [],
  systemField: {},
  systemFieldList: [],
  remark: '', // 备注
  erp: 'liujingfa' // 新增或修改人的erp
}

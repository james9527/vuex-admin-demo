export default {
  dimensionId: '', // 维度字段
  dimensionName: '', // 维度名称
  property: {},
  propertyList: [// 属性 time 时间 text 文本 num 数值 bool 布尔
    {id: 'time', label: '时间'},
    {id: 'text', label: '文本'},
    {id: 'num', label: '数值'},
    {id: 'bool', label: '布尔'}
  ],
  enumExample: '',
  group: '',
  dimensionStatus: {},
  dimensionStatusList: [// 维度状态 1 在线 2 下线
    {id: 1, label: '在线'},
    {id: 2, label: '下线'}
  ],
  remark: '' // 备注
}

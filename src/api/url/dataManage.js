let host = '/'
if (process.env.NODE_ENV === 'production') {
  host = '/'
}

let url = {
  /* 维度模块相关接口 */
  FindDimensionByPage: host + 'admin/dimensionManage/findDimensionByPage', // 维度列表
  ExportDimension: window.location.protocol + '//qd.jd.com/admin/dimensionManage/exportDimension', // 维度列表导出
  FindDimensionById: host + 'admin/dimensionManage/findDimension', // 编辑查询
  AddDimension: host + 'admin/dimensionManage/addDimension', // 添加维度
  UpdateDimensionById: host + 'admin/dimensionManage/updateDimension', // 编辑维度
  IsExistDimension: host + 'admin/dimensionManage/isExistDimension', // 判断维度字段是否存在
  /* 源表模块相关接口 */
  FindEventTable: host + 'admin/sourceTableManage/findEventTable',
  FindEventTableInfo: host + 'admin/sourceTableManage/findEventTableInfo',
  FindSourceTableByPage: host + 'admin/sourceTableManage/findSourceTableByPage',
  FindSourceTableDetail: host + 'admin/sourceTableManage/findSourceTableDetail', // 源表详情
  FindSourceTable: host + 'admin/sourceTableManage/findSourceTable', // 编辑查询
  AddSourceTable: host + 'admin/sourceTableManage/addSourceTable',
  UpdateSourceTable: host + 'admin/sourceTableManage/updateSourceTable',
  UpdateSourceTableStatus: host + 'admin/sourceTableManage/updateSourceTableStatus',
  ExportSourceTable: window.location.protocol + '//qd.jd.com/admin/sourceTableManage/exportSourceTable',
  FindErpInfo: host + 'admin/authority/findErpInfo'
}

export default url

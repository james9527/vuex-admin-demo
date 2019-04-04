import dimensionEdit from '@pages/dataManage/dimensionTable/edit/__modules__'
import sourceEdit from '@pages/dataManage/sourceTable/edit/__modules__'
export default [{
    rule: /dataManage\/dimension\/edit/,
    name: 'dimensionEdit',
    module: dimensionEdit
  },{
    rule: /dataManage\/source\/edit/,
    name: 'sourceEdit',
    module: sourceEdit
  }
]

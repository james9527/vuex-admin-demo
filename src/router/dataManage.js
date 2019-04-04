const dataManage = () => import(/* webpackChunkName: "dataManage" */ '@pages/dataManage')
const dataManageSource = () => import(/* webpackChunkName: "dataManage" */ '@pages/dataManage/sourceTable/list.vue')
const sourceEdit = () => import(/* webpackChunkName: "dataManage" */ '@pages/dataManage/sourceTable/edit/index.vue')
const sourceDetail = () => import(/* webpackChunkName: "dataManage" */ '@pages/dataManage/sourceTable/detail/index.vue')
const dataManageDimension = () => import(/* webpackChunkName: "dataManage" */ '@pages/dataManage/dimensionTable/list.vue')
const dimensionEdit = () => import(/* webpackChunkName: "dataManage" */ '@pages/dataManage/dimensionTable/edit/index.vue')

export default {
  path: '/dataManage',
  component: dataManage,
  name: 'dataManage',
  redirect: {
    name: 'dataManageSource'
  },
  children: [
    {
      path: 'source/list',
      name: 'dataManageSource',
      component: dataManageSource
    },
    {
      path: 'source/edit/:id',
      name: 'dataManage_sourceEdit',
      component: sourceEdit
    },
    {
      path: 'source/detail/:id',
      name: 'dataManage_sourceDetail',
      component: sourceDetail
    },
    {
      path: 'dimension/list',
      name: 'dataManageDimension',
      component: dataManageDimension
    },
    {
      path: 'dimension/edit/:id',
      name: 'dataManage_dimensionEdit',
      component: dimensionEdit
    },
  ]
}

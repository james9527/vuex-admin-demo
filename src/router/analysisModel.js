const analysisModel = () => import(/* webpackChunkName: "analysisModel" */ '@pages/analysisModel')
const analysisModelIndex = () => import(/* webpackChunkName: "analysisModel" */ '@pages/analysisModel/eventAnalysis/index.vue')
const basisEventEdit = () => import(/* webpackChunkName: "analysisModel" */ '@pages/analysisModel/eventAnalysis/basisEvent/eventEdit.vue')

export default {
  path: '/analysisModel',
  component: analysisModel,
  name: 'analysisModel',
  redirect: {
    name: 'analysisModelIndex'
  },
  children: [
    {
      path: 'eventAnalysis/index',
      name: 'analysisModelIndex',
      component: analysisModelIndex
    },
    {
      path: 'eventAnalysis/basisEvent/edit/:id',
      name: 'basisEventEdit',
      component: basisEventEdit
    },
  ]
}

const eventAnalysis = () => import(/* webpackChunkName: "eventAnalysis" */ '@pages/eventAnalysis')

export default {
  path: '/eventAnalysis',
  name: 'eventAnalysis',
  component: eventAnalysis
}

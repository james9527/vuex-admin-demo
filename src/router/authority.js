const authority = () => import(/* webpackChunkName: "authority" */ '@pages/authority')
const userList = () => import(/* webpackChunkName: "authority" */ '@pages/authority/userList/index.vue')
const otherList = () => import(/* webpackChunkName: "authority" */ '@pages/authority/otherList/index.vue')
const userEdit = () => import(/* webpackChunkName: "authority" */ '@pages/authority/userEdit/index.vue')
const userDetail = () => import(/* webpackChunkName: "authority" */ '@pages/authority/userDetail/index.vue')
const roleEdit = () => import(/* webpackChunkName: "authority" */ '@pages/authority/roleEdit/index.vue')
const menuEdit = () => import(/* webpackChunkName: "authority" */ '@pages/authority/menuEdit/index.vue')
// const ruleEdit = () => import(/* webpackChunkName: "authority" */ '@pages/authority/ruleEdit')
// const menuDetail = () => import(/* webpackChunkName: "authority" */ '@pages/authority/menuDetail')

export default {
  path: '/authority',
  component: authority,
  name: 'authority',
  redirect: {
    name: 'authorityUserList'
  },
  children: [
    {
      path: 'user/list',
      name: 'authorityUserList',
      component: userList
    },
    {
      path: ':category(role|menu|rule)/list',
      name: 'authorityOtherList',
      component: otherList
    },
    {
      path: 'user/edit/:id?',
      name: 'authorityUserEdit',
      component: userEdit
    },
    {
      path: 'user/detail/:id',
      name: 'authorityUserDetail',
      component: userDetail
    },
    {
      path: 'role/edit/:id?',
      name: 'authorityRoleEdit',
      component: roleEdit
    },
    {
      path: 'role/detail/:id',
      name: 'authorityRoleDetail',
      component: roleEdit
    },
    {
      path: 'menu/edit/:id?',
      name: 'authorityMenuEdit',
      component: menuEdit
    },
    {
      path: 'menu/detail/:id',
      name: 'authorityMenuDetail',
      component: menuEdit
    },
    {
      path: 'menu/subMenu/:id',
      name: 'authorityMenuSubMenu',
      component: menuEdit
    },
    // {
    //   path: 'rule/edit/:id?',
    //   name: 'authorityRuleEdit',
    //   component: ruleEdit
    // },
    // {
    //   path: 'rule/detail/:id',
    //   name: 'authorityRuleDetail',
    //   component: ruleEdit
    // }
  ]
}

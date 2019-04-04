/**
 * 根据用户权限,配置路由
 * @param  {Object} routerMap eg: { 页面:路由配置 }
 * @param  {Array} menuList  当前用户具有权限的菜单列表
 * @return {routes}           用于生成路由的routes
 */
export default function filterByAuthority (routerMap, menuList) {
  function toString (any) {
    return Object.prototype.toString.call(any).slice(8, -1)
  }

  function pushToRoutes (collection) {
    if (toString(collection) === 'Object') {
      routes.push(collection)
    }
    if (toString(collection) === 'Array') {
      routes.push(...collection)
    }
  }

  const routes = []
  if (process.env.NODE_ENV === 'development') {
    let keys = Object.keys(routerMap)
    keys.forEach(key => {
      pushToRoutes(routerMap[key])
    })
  } else {
    menuList.forEach(item => {
      let key = item.path
      if (routerMap[key]) {
        pushToRoutes(routerMap[key])
      }
    })
  }

  return routes
}

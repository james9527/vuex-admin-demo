export default {
  updateModule (state, payload = {}) {
    state = Object.assign(state, payload)
  },
  addItem (state, payload = {}) {
    let {key, val} = payload
    // console.log('val::: ' + JSON.stringify(val))
    state[key].push(val)
  },
  delItemByIndex (state, payload = {}) {
    let {key, index} = payload
    state[key].splice(index, 1)
  },
  updateItemByIndex (state, payload = {}) {
    let {key, index} = payload
    let oldVal = state[key][index]
    // console.log('oldVal:::: ' + JSON.stringify({...oldVal}))
    // console.log(JSON.stringify({...payload.val}))
    let newVal = {
      ...oldVal,
      ...payload.val // 更新eventTime
    }
    // console.log('newVal:::' + JSON.stringify(newVal))
    state[key].splice(index, 1, newVal)
  },
  updateFieldSelectedStatus (state, payload = {}) {
    let {id, label} = payload
    console.log(id + ' , ' + label)
    let globalFields = state.globalFieldList
    let arr = []
    for (let item of globalFields) {
      if (item.id === id) {
        item.isDisabled = true
      }
      arr.push(item)
    }
    state['globalFieldList'] = arr
    console.log(state['globalFieldList'])
  }
}

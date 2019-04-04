function createId () {
  let id = 0

  return function () {
    id++
    return 'init' + id
  }
}

export default createId()

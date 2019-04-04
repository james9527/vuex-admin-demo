/**
 * 输入日期,返回 对象形式的日期
 * 当输入为空时,返回当前时间的 对象形式的日期
 */
export default function (date) {
  let d
  if (!date) {
    d = new Date()
    console.warn('date_to_obj, 传入时间为空')
  } else {
    try {
      d = new Date(date)
    } catch (e) {
      console.error('date parse error: ', e)
      return {
        y: NaN,
        m: NaN,
        d: NaN,
        hh: NaN,
        mm: NaN,
        ss: NaN
      }
    }
  }
  let d_obj = {
    y: d.getFullYear(),
    m: d.getMonth() + 1,
    d: d.getDate(),
    hh: d.getHours(),
    mm: d.getMinutes(),
    ss: d.getSeconds()
  }

  d_obj.y = '' + d_obj.y
  d_obj.m = d_obj.m < 10 ? '0' + d_obj.m : '' + d_obj.m
  d_obj.d = d_obj.d < 10 ? '0' + d_obj.d : '' + d_obj.d
  d_obj.hh = d_obj.hh < 10 ? '0' + d_obj.hh : '' + d_obj.hh
  d_obj.mm = d_obj.mm < 10 ? '0' + d_obj.mm : '' + d_obj.mm
  d_obj.ss = d_obj.ss < 10 ? '0' + d_obj.ss : '' + d_obj.ss

  return d_obj
}

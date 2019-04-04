/**
 * 添加千分位分隔符
 * @Number num
 * @format string 格式化字符串,默认值','
 */
function kFormat (num, format = ',') {
  return num && num.toString()
    .replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, format))
}
export default kFormat

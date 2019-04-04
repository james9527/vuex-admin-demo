/**
 * 四舍五入,默认保留一位小数
 */
export default function toFixed (num, bit = 1) {
  if (!num || isNaN(num)) return 0
  if (bit < 0) return num

  let temp = num.toString().split('.')
  let integer = temp[0]
  let decimals = temp[1]

  // 保留0位小数
  if (bit === 0) {
    if (!decimals || decimals[0] < 5) return integer
    return (Number(integer) + 1).toString()
  }

  if (!decimals || !decimals[bit] /* 小数部分不存在或者不够保留位数 */) {
    decimals = decimals || ''
    let added = '0'.repeat(bit - decimals.length)
    decimals += added
  } else if (decimals[bit] < 5 /* 判断是否进位 */) {
    decimals = decimals.substring(0, bit)
  } else {
    decimals = Number(decimals.substring(0, bit)) + 1
  }

  return `${integer}.${decimals}`
}

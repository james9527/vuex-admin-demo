import dateToObj from './dateToObj'

export default function (timestamp, second) {
  if (!timestamp) return ''
  let time = dateToObj(timestamp)
  // console.log('time', time);
  if (!second) return `${time.y}-${time.m}-${time.d} 00:00:00`
  return `${time.y}-${time.m}-${time.d} ${time.hh}:${time.mm}:${time.ss}`
}


const app = getApp();
const p_c = require("time.js");

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function isAvalible(value) {
  if (undefined != value && "undefined" != value && value != null && value != "" && value != "null") {
    return true;
  }

  return false;
}

module.exports = {
  province: p_c.province,
  city: p_c.city,
  formatTime: formatTime
}

module.exports.isAvalible = isAvalible;



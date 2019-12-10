/* eslint-disable no-undef */
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-30 12:28:10
 * @LastEditTime: 2019-12-10 11:36:46
 * @LastEditors: Please set LastEditors
 */
const STORAGE_USER_KEY = 'STORAGE_USER_KEY'

export default {
  // 获取
  getLocal (key = STORAGE_USER_KEY) {
    // console.log('get local operation')
    return JSON.parse(window.localStorage.getItem(key))
  },
  // 设置用
  setLocal (res, key = STORAGE_USER_KEY, isSaveOldData = false) {
    // 第三个参数是true的话,会增加数据而不是重新设置,res必须是数组
    if (isSaveOldData) {
      if (this.getLocal(key)) {
        let oldData = this.getLocal(key)
        return window.localStorage.setItem(key, JSON.stringify(oldData.concat(res)))
      }
    }
    return window.localStorage.setItem(key, JSON.stringify(res))
  },
  deepClone (obj) {
    var o
    if (typeof obj === 'object') {
      if (obj === null) {
        o = null
      } else {
        if (obj instanceof Array) {
          o = []
          for (var i = 0, len = obj.length; i < len; i++) {
            o.push(this.deepClone(obj[i]))
          }
        } else {
          o = {}
          for (var j in obj) {
            o[j] = this.deepClone(obj[j])
          }
        }
      }
    } else {
      o = obj
    }
    return o
  },
  getGuid () {
    function S4 () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
  },
  getGuid2 () {
    function S4 () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return S4() + S4()
  },
  isEmpty (value) {
    let result = false
    if (value == null || value === undefined) {
      result = true
    }
    if (typeof value === 'string' && (value.replace(/\s+/g, '') === '' || value === '')) {
      result = true
    }
    if (typeof value === 'object' && value instanceof Array && value.length === 0) {
      result = true
    }
    return result
  },
  formatTime (time) {
    //   格式：yyyy-MM-dd hh:mm:ss
    let date = new Date(Number(time))
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
    let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
    let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return Y + M + D + h + m + s
  },
  formatTime2 (time) {
    //   格式：yyyy-MM-dd hh:mm:ss
    let date = new Date(Number(time))
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
    let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
    let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    return Y + M + D + h + m
  },
  formatDate (time) {
    //   格式：yyyy-MM-dd
    let date = new Date(Number(time))
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
    return Y + M + D
  },
  formatDateCN (time) {
    //   格式：yyyy-MM-dd
    let date = new Date(Number(time))
    let Y = date.getFullYear() + '年'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
    let D = date.getDate() < 10 ? '0' + date.getDate() + '日' : date.getDate() + '日'
    return Y + M + D
  },
  /**
    * 字符串转数组
    * @param {*} value
    * @returns
    */
  stringToArray (value) {
    if (this.isEmpty(value)) return []
    if (typeof value !== 'string') return []
    if (value.indexOf(',') < 0) return [value]
    let array = value.split(',')
    return array
  },
  /**
   * 数组转字符串
   * @param {*} value
   * @returns
   */
  arrayToString (value) {
    if (typeof value === 'object' && value instanceof Array) {
      if (value.length === 0) return ''
      let str = ''
      value.forEach(element => {
        str += element + ','
      })
      return str.substr(0, str.length - 1)
    } else {
      return ''
    }
  },
  isPhone (value) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!myreg.test(value)) {
      return false
    } else {
      return true
    }
  },
  isIDCardNo (value) {
    var myreg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
    if (!myreg.test(value)) {
      return false
    } else {
      return true
    }
  },
  /**
     * resultFul的返回码判断
     * @param {*} res
     * @returns boolean
     */
  isOk (res) {
    if (this.isEmpty(res.data)) {
      // Modal.warning({
      //     title: '系统提示',
      //     content: "未能获取数据",
      // });
      console.error('接口返回的结果集为空')
      return false
    } else {
      if (res.data.resultCode !== 0) {
        this.$message({
          message: res.data.msg,
          type: 'warning'
        })
        return false
      } else {
        return true
      }
    }
  },
  loading: {
    show () {
      if (window.layer) {
        layer.load(2, {
          shade: [0.2, '#fff']
        })
      }
    },
    hide () {
      if (window.layer) {
        layer.closeAll('loading')
      }
    }
  }
}

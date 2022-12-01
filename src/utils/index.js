// 过滤掉 value 为 0 的情况，为 0 时不认为是 false，其余场景下才认为是 false
import {useEffect, useState} from "react";

const isFalsy = (value) => value === 0 ? false : !value;

// 将空值从传入的 object 中清除，返回拷贝到新对象，不修改源数据
export const cleanObject = (object) => {
  const result = {...object}
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback) => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue;
}

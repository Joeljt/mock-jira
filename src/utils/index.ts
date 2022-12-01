// 过滤掉 value 为 0 的情况，为 0 时不认为是 false，其余场景下才认为是 false
import {useEffect, useState} from "react";

const isFalsy = (value: unknown) => value === 0 ? false : !value;

// 将空值从传入的 object 中清除，返回拷贝到新对象，不修改源数据
export const cleanObject = (object: object) => {
  const result = {...object}
  Object.keys(result).forEach(key => {
    // @ts-ignore
    const value = result[key]
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
}

// 声明为 any 的返回值，让类型检查可以通过，之后再用泛型
export const useDebounce = <T>(value: T, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue;
}

export const useMyArray = <T>(sourceArray: T[]) => {
  const [newArray, setNewArray] = useState([...sourceArray])

  const add = (newValue: T) => {
    const newList = [newValue, ...sourceArray]
    setNewArray(newList);
  }

  const removeIndex = (index: number) => {
    const newList = [...sourceArray].splice(index)
    setNewArray(newList);
  }

  const clear = (newValue: T) => {
    setNewArray([]);
  }

  return [newArray, add, removeIndex, clear];
}

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray)
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copyValue = [...value]
      copyValue.splice(index, 1)
      setValue(copyValue)
    }
  }
}

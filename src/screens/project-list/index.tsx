import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useEffect, useState} from "react";
import qs from "qs";
import {cleanObject, useDebounce, useMount} from "../../utils";

// 利用 .env 来实现正式环境和测试环境的区分，webpack 打包的时候会直接使用 .env 的值
// 这样就不用在代码中对 develop url 做硬编码，避免出错
const apiUrl = process.env.REACT_APP_URL
export const ProjectListScreen = () => {
  // 将 param、list 等数据都提升到父组件，保证可以将数据正确传递给 List 组件
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  const debouncedParam = useDebounce(param, 1000)

  // 获取用户列表的数据和 setter
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])

  // 每次当 param 发生变化的时候，都重新请求接口，刷新列表
  // 使用 cleanObject 工具方法过滤掉空值
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [debouncedParam])

  // 初始化用户列表的数据，只初始化一次，因为这个数据不会发生变化
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  })

  return <div>
    <SearchPanel users={users} param={param} setParam={setParam}/>
    <List users={users} list={list}/>
  </div>
}

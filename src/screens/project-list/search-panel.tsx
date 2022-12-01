// 写一个 react 组件：先找组件状态

export interface User {
  id: string,
  name: string
}

// 声明 SearchPanel 组件的参数类型
export interface SearchPanelProps {
  users: User[],
  param: {
    name: string,
    personId: string
  },
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({users, param, setParam}: SearchPanelProps) => {
  return <form>
    <div>
      {/*setParam(Object.assign({}, param, {name: event.target.value}))*/}
      <input type="text" onChange={event => {
        setParam({
          ...param,
          name: event.target.value
        })
      }}/>
      <select value={param.personId} onChange={event => {
        setParam({
          ...param,
          personId: event.target.value
        })
      }}>
        <option value="">负责人</option>
        {
          users.map(user => (<option value={user.id}>{user.name}</option>))
        }
      </select>
    </div>
  </form>
}

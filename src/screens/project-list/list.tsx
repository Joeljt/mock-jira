import {User} from "./search-panel";

interface Project {
  id: string,
  name: string,
  personId: string,
  pin: string,
  organization: string
}

interface ListProps {
  users: User[],
  list: Project[]
}

export const List = ({users, list}: ListProps) => {
  return <table>
    <thead>
    <tr>
      <th>名称</th>
      <th>负责人</th>
    </tr>
    </thead>
    <tbody>
    {/*  这里就需要遍历 list，使用 map 生成 tr 的数组结构了 */}
    {
      list.map(project => <tr>
        <td>{project.name}</td>
        <td>{users.find(user => user.id === project.personId)?.name}</td>
      </tr>)
    }
    </tbody>
  </table>
}

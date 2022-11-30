import React from 'react';

export const List = ({users, list}) => {
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

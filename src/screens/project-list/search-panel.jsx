// 写一个 react 组件：先找组件状态
import React from 'react';
import {useState} from "react";

export const SearchPanel = ({users, param, setParam}) => {

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

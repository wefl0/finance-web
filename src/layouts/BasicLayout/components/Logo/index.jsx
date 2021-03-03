import React from 'react';
import { message } from 'antd';
import { useHistory } from 'ice';
import style from './style.scss';
import { checkLogin, logout } from '@/api';
import { useMount, useSetState } from 'ahooks';

export default function Logo() {
  const history = useHistory();
  const [state, setState] = useSetState({ userName: '未登录', });
  const tryCheckLogin = function () {
    if (history.location.pathname != '/login') {
      checkLogin()
        .then((res) => {
          if (res.data.code != 200) {
            // 未登录，并跳转到登录页
            message.warn('请先登录');
            setState({ userName: '未登录', });
            history.push('/login');
          } else {
            setState({ userName: res.data.data });
          }
        });
    }
  }
  // 由于浏览器中输入锚点进入layout组件的子路由时，并不会触发layout的生命周期函数（而是触发子路由的生命周期
  // 函数），所以采用定时任务的方式来判断登录（当然也可以将判断逻辑写在每个子路由的生命周期里面，这样会很繁琐），
  // 另外发现，如果用redux存储用户名，然后使用store.subscribe()的方式来重新渲染右上角的用户名，页面运行30秒
  // 左右之后就会卡死，暂时不清楚原因，所以不再使用redux存储用户名，而是使用state
  useMount(() => {
    tryCheckLogin();
    setInterval(tryCheckLogin, 3000);
  });
  const tryLogout = function () {
    logout()
      .then((res) => {
        message.success('注销登录');
        setState({ userName: '未登录', });
        history.push('/login');
      });
  };
  return (
    <div className="logo">
      <span className="title">智能风控系统</span>
      <div className="userInfo">
        <span>欢迎您：{state.userName}</span>
        {state.userName == '未登录' ? null : <a className="logout" onClick={tryLogout}>退出</a>}
      </div>
    </div>
  );
}

import React from 'react';
import 'antd/dist/antd.css';
import style from './style.scss';
import { Select, message } from 'antd';
import { getDatasets, showHtml } from '@/api';
import { useMount, useSetState } from 'ahooks';

const Component = () => {
  const { Option } = Select;
  const [state, setState] = useSetState({
    datasets: [],
    htmlPath: '',
  });
  useMount(() => {
    getDatasets()
      .then((res) => {
        setState({
          datasets: res.data.data,
        });
      });
  });
  const onChange = function (htmlPath) {
    message.info('加载较慢，请耐心等待');
    showHtml(htmlPath)
      .then((res) => {
        if (res.headers['content-type'] == 'application/json; charset=utf-8') {
          setState({
            htmlPath: '',
          });
          message.warn('后台分析中，请稍后查看');
        } else {
          setState({
            htmlPath,
          });
        }
      });
  };
  return (
    <div id="query">
      <div id="select">
        <span id="tips">请选择数据集：</span>
        <Select style={{ width: 200 }} onChange={onChange}>
          {
            state.datasets.map((item) => (<Option key={item._id} value={item.html_path}>{item.name}</Option>))
          }
        </Select>
        <div id="msg">* 分析报告文件较大，根据服务器压力与网络情况，选择后需要加载30秒~200秒左右，请耐心等待</div>
      </div>
      <iframe id="iframe" src={state.htmlPath} frameBorder="0" />
    </div>
  );
};

export default Component;

import React from 'react';
import 'antd/dist/antd.css';
import { Col, Row } from 'antd';
import style from './style.scss';
import { useMount } from 'ahooks';
import store from '@/utils/redux/store';
import { Chart, Geom, Axis } from 'bizcharts';
import { setChartData } from '@/utils/redux/action';

const Component = () => {
  useMount(() => {
    store.dispatch(setChartData({
      model: '',
      dataset: '',
      accuracy: [],
      recall: [],
      fscore: [],
      auc: [],
    }));
  });
  return (
    <div id="analysis">
      <div id="analysisTitle">
        {store.getState().handle.chartData.model == '' ?
          <div>请从【模型训练】页点击查看</div> :
          <div>
            模型：{store.getState().handle.chartData.model}
            &ensp;&ensp;&ensp;
            数据集：{store.getState().handle.chartData.dataset}
          </div>
        }
      </div>
      <Row>
        <Col span={1} />
        <Col span={10}>
          <h3>准确率</h3>
          <Chart
            height={300}
            autoFit
            padding={[30, 30, 90, 30]}
            data={store.getState().handle.chartData.accuracy}
            interactions={['element-active']}
          >
            <Axis name="model" label={{ autoRotate: true }} />
            {/* position传入的参数为x*y的形式，表示点的x坐标和y坐标 */}
            <Geom
              type="interval"
              position="model*value"
              color="#4cb7e0"
              tooltip={['model*value', (model, value) => ({
                name: '准确率',
                value: `${value }%`,
              })]}
            />
          </Chart>
        </Col>
        <Col span={2} />
        <Col span={10}>
          <h3>召回率</h3>
          <Chart
            height={300}
            autoFit
            padding={[30, 30, 90, 30]}
            data={store.getState().handle.chartData.recall}
            interactions={['element-active']}
          >
            <Axis name="model" label={{ autoRotate: true }} />
            <Geom
              type="interval"
              position="model*value"
              color="#80d771"
              tooltip={['model*value', (model, value) => ({
                name: '召回率',
                value: `${value }%`,
              })]}
            />
          </Chart>
        </Col>
        <Col span={1} />
      </Row>
      <Row>
        <Col span={1} />
        <Col span={10}>
          <h3>F-Score</h3>
          <Chart
            height={300}
            autoFit
            padding={[30, 30, 90, 30]}
            data={store.getState().handle.chartData.fscore}
            interactions={['element-active']}
          >
            <Axis name="model" label={{ autoRotate: true }} />
            <Geom
              type="interval"
              position="model*value"
              color="#FFBC1A"
              tooltip={['model*value', (model, value) => ({
                name: 'F-Score',
                value: `${value }%`,
              })]}
            />
          </Chart>
        </Col>
        <Col span={2} />
        <Col span={10}>
          <h3>AUC值</h3>
          <Chart
            height={300}
            autoFit
            padding={[30, 30, 90, 30]}
            data={store.getState().handle.chartData.auc}
            interactions={['element-active']}
          >
            <Axis name="model" label={{ autoRotate: true }} />
            <Geom
              type="interval"
              position="model*value"
              color="#e94f62"
              tooltip={['model*value', (model, value) => ({
                name: 'AUC',
                value,
              })]}
            />
          </Chart>
        </Col>
        <Col span={1} />
      </Row>
    </div>
  );
};

export default Component;

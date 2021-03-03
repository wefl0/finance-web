import React from 'react';
import 'antd/dist/antd.css';
import { useHistory } from 'ice';
import store from '@/utils/redux/store';
import { useSetState, useMount } from 'ahooks';
import { setChartData } from '@/utils/redux/action';
import { Button, message, Select, Table, Progress, Input, Form, Col, Row } from 'antd';
import { getDatasets, getModels, createTrain, getTrainData, createModel } from '@/api';

const Component = () => {
  const { Option } = Select;
  const history = useHistory();
  const updateTrainData = function () {
    getTrainData()
      .then((res) => {
        if (res.data.code == 200) {
          setState({
            tableData: res.data.data,
          });
        }
      });
  };
  const [state, setState] = useSetState({
    model: '',
    dataset: '',
    modelsOb: {}, // 这个对象是为了根据id快速获取相应的属性
    datasetsOb: {},
    modelsArr: [], // 这个数组是为了方便渲染下拉框的选项
    datasetsArr: [],
    tableData: [],
  });
  useMount(() => {
    getModels()
      .then((res) => {
        const modelsOb = {};
        for (const item of res.data.data) {
          modelsOb[item._id] = item;
        }
        setState({
          modelsOb,
          modelsArr: res.data.data,
        });
      });
    getDatasets()
      .then((res) => {
        const datasetsOb = {};
        for (const item of res.data.data) {
          datasetsOb[item._id] = item;
        }
        setState({
          datasetsOb,
          datasetsArr: res.data.data,
        });
      });
    updateTrainData();
  });
  const onModelChange = function (newValue) {
    setState({
      model: newValue,
    });
  };
  const onDatasetChange = function (newValue) {
    setState({
      dataset: newValue,
    });
  };
  const onTrain = async function () {
    try {
      const values = await form.validateFields();
      createTrain({
        modelId: values.model,
        datasetId: values.dataset,
        modelName: state.modelsOb[values.model].name,
        datasetName: state.datasetsOb[values.dataset].name,
        modelFilter: state.modelsOb[values.model].model_filter,
        modelBase: state.modelsOb[values.model].model_base,
        modelStacking: state.modelsOb[values.model].model_stacking,
      })
        .then((res) => {
          if (res.data.code == 200) {
            setState({
              model: '',
              dataset: '',
            });
            updateTrainData();
            message.success('创建成功');
          } else {
            message.error('创建失败');
          }
        });
    } catch (e) {
      message.error('请选择模型和数据集');
    }
  };


  const lookAnalysis = function (chart_data, row) {
    chart_data.model = row.model_name;
    chart_data.dataset = row.dataset_name;
    store.dispatch(setChartData(chart_data));
    history.push('/analysis');
  };

  const [form] = Form.useForm();
  return (
    <div>
      <div style={{ marginBottom: 20, marginTop: -40 }}>
        <Form
          form={form}
          layout="inline"
          initialValues={{
            model: '',
            dataset: ''
          }}
        >
          <Row>
            <Col span={10}>
              <Form.Item
                label="选用模型"
                name="model"
                rules={[
                  {
                    required: true,
                    message: '请选择训练使用的模型',
                  },
                ]}
              >
                <Select style={{ width: 160 }} value={state.model} onChange={onModelChange}>
                  {
                    state.modelsArr.map((item) => (<Option key={item._id} value={item._id}>{item.name}</Option>))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label="选用数据集"
                name="dataset"
                rules={[
                  {
                    required: true,
                    message: '请选择训练使用的数据集',
                  },
                ]}
              >
                <Select style={{ width: 160 }} value={state.dataset} onChange={onDatasetChange}>
                  {
                    state.datasetsArr.map((item) => (<Option key={item._id} value={item._id}>{item.name}</Option>))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item>
                <Button type="primary" htmlType="button" style={{ marginLeft: 20 }} onClick={onTrain}>
                  开始训练
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <Button
        type="primary"
        size="small"
        htmlType="button"
        onClick={updateTrainData}
        style={{
          float: 'right',
          marginBottom: '5px',
        }}
      >刷新
      </Button>
      <Table
        columns={[
          {
            title: '模型名称',
            dataIndex: 'model_name',
            align: 'center',
            width: '10%',
          },
          {
            title: '数据集名称',
            dataIndex: 'dataset_name',
            align: 'center',
            width: '15%',
          },
          {
            title: '筛选模型',
            dataIndex: 'model_filter',
            align: 'center',
            width: '10%',
          },
          {
            title: '基学习器',
            dataIndex: 'model_base',
            align: 'center',
            // width: '35%', 这列不设置宽度，由总宽度减去其他列的宽度自动生成
          },
          {
            title: '堆叠模型',
            dataIndex: 'model_stacking',
            align: 'center',
            width: '10%',
          },
          {
            title: '训练进度',
            dataIndex: 'percent',
            render: (percent) => <Progress style={{ width: 120 }} percent={percent}/>,
            align: 'center',
            width: '200px',
          },
          {
            title: '可视化分析',
            dataIndex: 'chart_data',
            render: (chart_data, row) => (row.percent >= 100 ?
              <Button type="primary" size="small" htmlType="button" onClick={() => lookAnalysis(chart_data, row)}>查看</Button>
              : <div style={{ color: 'red' }}>训练中</div>),
            align: 'center',
            width: '10%',
          },
        ]}
        dataSource={state.tableData}
        pagination={false}
        size={'small'}
        bordered
      />
    </div>
  );
};

export default Component;

import React from 'react';
import 'antd/dist/antd.css';
import style from './style.scss';
import { createModel } from '@/api';
import { useSetState } from 'ahooks';
import { Button, Form, Input, message, Select, Transfer } from 'antd';

const Component = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const allModel = ['逻辑回归', '支持向量机', '朴素贝叶斯', 'KNN', 'K-Means', '决策树',
    'XGBoost', '人工神经网络', '随机森林', 'AdaBoost', 'GBDT', 'LightGBM', 'Apriori',
    'CatBoost', '深度信念网络', '卷积神经网络', 'RNN'];
  const models = [];
  for (let i = 0; i < allModel.length; i++) {
    models.push({
      key: i,
      name: allModel[i],
    });
  }
  const [state, setState] = useSetState({
    targetKeys: [],
    selectedKeys: [],
  });
  const onChange = (nextTargetKeys, direction, moveKeys) => {
    setState({
      targetKeys: nextTargetKeys,
    });
  };
  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setState({
      selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys],
    });
  };
  const create = async function () {
    try {
      const values = await form.validateFields();
      createModel({
        modelName: values.modelName,
        modelFilter: values.modelFilter,
        modelBase: values.modelBase.map((index) => allModel[index])
          .join(','),
        modelStacking: values.modelStacking,
      })
        .then((res) => {
          if (res.data.code == 200) {
            setState({
              targetKeys: [],
            });
            form.resetFields();
            message.success('创建成功');
          } else {
            message.error('创建失败');
          }
        });
    } catch (e) {
      // 前端参数校验未通过，则无事发生，使用catch语法只是为了避免报错
    }
  };
  return (
    <Form
      id="manage"
      form={form}
      name="basic"
      initialValues={{
        modelName: '',
        modelFilter: '',
        modelBase: '',
        modelStacking: '',
      }}
    >
      <Form.Item
        label="模型名称"
        name="modelName"
        rules={[
          {
            required: true,
            message: '请输入要创建的模型名称',
          },
        ]}
      >
        <Input style={{ width: 200 }} />
      </Form.Item>

      <Form.Item
        label="特征筛选"
        name="modelFilter"
        rules={[
          {
            required: true,
            message: '请选择筛选特征用的模型',
          },
        ]}
      >
        <Select style={{ width: 200 }}>
          {
            allModel.map((item) => (<Option key={item} value={item}>{item}</Option>))
          }
        </Select>
      </Form.Item>

      <Form.Item
        label="基学习器"
        name="modelBase"
        rules={[
          {
            required: true,
            message: '请选择集成训练使用的各个基模型',
          },
        ]}
      >
        <Transfer
          dataSource={models}
          onChange={onChange}
          onSelectChange={onSelectChange}
          selectedKeys={state.selectedKeys}
          render={(item) => item.name}
          targetKeys={state.targetKeys}
          oneWay
          style={{
            marginBottom: 16,
          }}
          locale={{
            itemUnit: '项',
            itemsUnit: '项',
          }}
          listStyle={{
            width: 200,
          }}
        />
      </Form.Item>

      <Form.Item
        label="堆叠集成"
        name="modelStacking"
        rules={[
          {
            required: true,
            message: '请选择Stacking集成用的模型',
          },
        ]}
      >
        <Select style={{ width: 200 }}>
          {
            allModel.map((item) => (<Option key={item} value={item}>{item}</Option>))
          }
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" style={{ float: 'right' }} htmlType="button" onClick={create}>
          创建模型
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Component;

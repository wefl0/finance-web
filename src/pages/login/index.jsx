import React from 'react';
import 'antd/dist/antd.css';
import { login } from '@/api';
import style from './style.scss';
import { useHistory } from 'ice';
import store from '@/utils/redux/store';
import Footer from '@/components/Footer';
import { setUser } from '@/utils/redux/action';
import { Form, Input, Button, message } from 'antd';

const Component = () => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const [form] = Form.useForm();
  const history = useHistory();

  const tryLogin = async function () {
    try {
      const values = await form.validateFields();
      login({
        username: values.username,
        password: values.password,
      })
        .then((res) => {
          if (res.data.code == 200) {
            message.success('登录成功');
            store.dispatch(setUser(values.username));
            history.push('/input');
          } else {
            message.error('登录失败');
          }
        });
    } catch (e) {
      message.warn('请填写用户名和密码');
    }
  };

  return (
    <div id="login">
      <Form
        {...layout}
        form={form}
        name="basic"
        initialValues={{
          username: '',
          password: '',
        }}
      >
        <div id="title">
          智能风控系统
        </div>

        <Form.Item
          label="账户"
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="button" onClick={tryLogin}>
            登录
          </Button>
        </Form.Item>
      </Form>
      <Footer/>
    </div>
  );
};

export default Component;

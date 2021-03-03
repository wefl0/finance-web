import React from 'react';
import 'antd/dist/antd.css';
import style from './style.scss';
import { checkLogin } from '@/api';
import store from '@/utils/redux/store';
import { config, useHistory } from 'ice';
import { setUser } from '@/utils/redux/action';
import { useMount, useSetState } from 'ahooks';
import { InboxOutlined } from '@ant-design/icons';
import { Input, Row, Col, Select, Upload, message } from 'antd';

// 实际点击上传时，后端仅保存了文件，其他地方输入的信息并没有被后台保存，
// 其他按钮和输入框仅仅是为了丰富页面样式而添加的
const Component = () => {
  const { Option } = Select;
  const { TextArea } = Input; // 定义变量时使用大括号，这是ES6语法，等价于const TextArea = Input.TextArea
  const { Dragger } = Upload;
  const [state, setState] = useSetState({
    format: '',
    separator: '',
    description: '',
  });
  const onFormatChange = function (newValue) {
    setState({
      format: newValue,
    });
  };
  const onSeparatorChange = function (newValue) {
    setState({
      separator: newValue,
    });
  };
  const onDescriptionChange = function (e) {
    setState({
      description: e.target.value,
    });
  };
  const onLabelChange = function (e) {
    setState({
      label: e.target.value,
    });
  };
  const props = {
    name: 'dataset',
    multiple: true,
    withCredentials: true,
    action: `${config.baseUrl}/api/upload`,
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success('上传成功');
      }
      if (status === 'error') {
        message.error('上传失败');
      }
      setState({
        format: '',
        separator: '',
        description: '',
        label: '',
      });
    },
  };
  const history = useHistory();
  useMount(() => {
    checkLogin()
      .then((res) => {
        if (res.data.code != 200) {
          // 未登录，并跳转到登录页
          message.warn('请先登录');
          history.push('/login');
        }
      });
  });
  return (
    <div id="input">
      <Row>
        <Col span={7}/>
        <Col span={3}>数据集格式：</Col>
        <Col span={7}>
          <Select style={{ width: 200 }} value={state.format} onChange={onFormatChange}>
            <Option value="xls">xls</Option>
            <Option value="xlsx">xlsx</Option>
            <Option value="csv">csv</Option>
            <Option value="txt">txt</Option>
          </Select>
        </Col>
        <Col span={7}/>
      </Row>
      <Row>
        <Col span={7}/>
        <Col span={3}>数据集分隔符：</Col>
        <Col span={7}>
          <Select style={{ width: 200 }} value={state.separator} onChange={onSeparatorChange}>
            <Option value="逗号">逗号</Option>
            <Option value="冒号">冒号</Option>
            <Option value="空格">空格</Option>
          </Select>
        </Col>
        <Col span={7}/>
      </Row>
      <Row>
        <Col span={7}/>
        <Col span={3}>标签属性名：</Col>
        <Col span={7}>
          <Input style={{ width: 200 }} placeholder="请输入标签属性名" value={state.label} onChange={onLabelChange}/>
        </Col>
        <Col span={7}/>
      </Row>
      <Row>
        <Col span={7}/>
        <Col span={3}>数据集描述：</Col>
        <Col span={7}>
          <TextArea
            showCount
            maxLength={200}
            placeholder="请输入数据集描述"
            value={state.description}
            onChange={onDescriptionChange}
            rows={6}
          />
        </Col>
        <Col span={7}/>
      </Row>
      <Row>
        <Col span={7}/>
        <Col span={3}>数据集上传：</Col>
        <Col span={7}>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined/>
            </p>
            <p className="ant-upload-text">点击或将文件拖拽到此区域</p>
            <p className="ant-upload-hint">
              请上传数据集文件，其他文件将无法解析
            </p>
          </Dragger>
        </Col>
        <Col span={7}/>
      </Row>
    </div>
  );
};

export default Component;

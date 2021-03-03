import reducer from './reducer';
import { createStore } from 'redux';

// redux初始值
const initialStore = {
  handle: {
    userName: '未登录',
    chartData: {
      model: '',
      dataset: '',
      accuracy: [],
      recall: [],
      fscore: [],
      auc: [],
    },
  },
};

export default createStore(reducer, initialStore);

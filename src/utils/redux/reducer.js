import { combineReducers } from 'redux';
import { SET_USER, SET_CHART_DATA } from './action';

function handle(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userName: action.userName,
      };
    case SET_CHART_DATA:
      return {
        ...state,
        chartData: action.chartData,
      };
    default:
      return state;
  }
}

// 因为业务可能较多，导致handle函数过长，有时需要将不同
// 业务拆分到几个不同的handle函数内，然后在下面合并导出
export default combineReducers({
  handle,
});

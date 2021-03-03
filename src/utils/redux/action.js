export const SET_USER = 'SET_USER';
export const SET_CHART_DATA = 'SET_CHART_DATA';

export function setUser(userName) {
  return {
    type: SET_USER,
    userName,
  };
}

export function setChartData(chartData) {
  return {
    type: SET_CHART_DATA,
    chartData,
  };
}

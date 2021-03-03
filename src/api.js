import request from './utils/request';

export function login(params) {
  return request({
    url: '/user/login',
    method: 'get',
    params,
  });
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get',
  });
}

export function checkLogin() {
  return request({
    url: '/api/query/checklogin',
    method: 'get',
  });
}

export function showHtml(url) {
  return request({
    url,
    method: 'get',
  });
}

export function getDatasets() {
  return request({
    url: '/api/query/dataset',
    method: 'get',
  });
}

export function getModels() {
  return request({
    url: '/api/query/model',
    method: 'get',
  });
}

export function getTrainData() {
  return request({
    url: '/api/query/train',
    method: 'get',
  });
}

export function createModel(data) {
  return request({
    url: '/api/add/model',
    method: 'post',
    data,
  });
}

export function createTrain(data) {
  return request({
    url: '/api/add/train',
    method: 'post',
    data,
  });
}

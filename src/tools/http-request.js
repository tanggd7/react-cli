import { localKeys } from 'Tools/storage-keys';

// 请求头
const creatHeader = (Content = {}, token, source) => {
  const Header = new Headers();
  Header.append('Content-Type', 'application/json;charset=UTF-8');
  Header.append('Accept', 'application/json');
  Header.append('token', token);
  Header.append('source', source);
  Content['headers'] = Header;
  return Content;
};

// 请求类型
const creatMethod = (Content = {}, method = 'GET') => {
  Content['method'] =
    !!method && method.toUpperCase() === 'POST' ? 'POST' : 'GET';
  return Content;
};

// 请求体
const creatBody = (Content = {}, params = {}) => {
  if (Content['method'] === 'POST') {
    Content['body'] = params && JSON.stringify(params);
  }
  return Content;
};

// 请求所需所有参数
const createContent = () => ({ token, source, method, params }) =>
  creatBody(creatMethod(creatHeader({}, token, source), method), params);

// 获取url
const creatUrl = (method, url, params = {}) => {
  if (method === 'GET') {
    let args = '';
    for (let key of Object.keys(params)) {
      args += `&${key}=${params[key].toString() || ''}`;
    }
    url += args && `?${args.substring(1)}`;
  }
  return url;
};

// 请求接口
const asyncRequest = ({ Url, Content }) =>
  new Promise((resolve, reject) => {
    fetch(Url, Content)
      .then((response) => response.json)
      .then((data) => {
        const { code, message } = data;
        // 对服务器级错误抛出异常
        if (code != 200 && code <= 999) {
          throw new Error(message);
        }
        resolve(data);
      })
      .catch((error) => {
        console.log(`error:${Url}`, error);
        reject(error);
      });
  });

// 异步请求
const httpRequest = ({ url = '', method = 'GET', params = {} }) => {
  const Content = createContent()({
    token: localStorage.getItem(localKeys['token']) || '',
    source: localStorage.getItem(localKeys['source']) || '',
    method,
    params,
  });
  return asyncRequest({
    Url: creatUrl(Content['mothod'], url, params),
    Content,
  });
};

export default httpRequest;

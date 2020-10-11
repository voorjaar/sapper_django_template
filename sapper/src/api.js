const request = ({ method, path, data, token }) => {
  const base = process.env.API_URL;
  const fetch = process.browser ? window.fetch : require('node-fetch').default;
  const options = { method, headers: {} };
  
  if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  if (token) {
    options.headers['Authorization'] = `Token ${token}`;
  }

  return fetch(`${base}/${path}`, options)
    .then(res=> res.text())
    .then(json => {
      try {
        return JSON.parse(json);
      } catch (err) {
        return json;
      }
    });
}

const get = (path, token) => request({ method: 'GET', path, token});
const del = (path, token) => request({ method: 'DELETE', path, token});
const post = (path, data, token) => request({ method: 'POST', path, data, token});
const put = (path, data, token) => request({ method: 'PUT', path, data, token});

const API ={
    get,
    del,
    post,
    put
};

export default API;
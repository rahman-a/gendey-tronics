import fetch from 'node-fetch';


const request = async (url, method, body) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  const response = await fetch(url, options);
  const json = await response.json();
  return json;
}

const output = await request('http://localhost:5000/api/courses', 'GET')

console.log(output);
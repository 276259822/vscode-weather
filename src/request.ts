import axios from 'axios';

const KEY = 'd36653a4863746c3b204e78316d3a578';

const instance = axios.create({
  baseURL: 'https://devapi.qweather.com/',
  timeout: 5000,
  headers: { 'content-type': 'application/json;charset=UTF-8' }
});

export const getWeatherData = async (id: string) => {
  return await instance.get('v7/weather/now', {
    params: {
      key: KEY,
      location: id
    }
  }).then(res => res.data);
};


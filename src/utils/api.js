import axios from "axios";
import md5 from 'md5';

const baseUrl = 'http://gateway.marvel.com/v1/public';

const PRIVATE_KEY='b84727c4bf53cd2157c50ab7f50834d59e1f6a36';
const PUBLIC_KEY='5a1e5579792033a911999998ff52eecf';

//https://gateway.marvel.com:443/v1/public/characters?apikey=5a1e5579792033a911999998ff52eecf


export default function makeRequest(path, body) {
  return new Promise((resolve, reject) => {
    let url = `${baseUrl}/${path}`;

    const ts = Number(Date.now());
    const hash = md5(ts+ PRIVATE_KEY + PUBLIC_KEY );

    url=`${url}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;

    console.log('yusuf',url);


    axios
      .get(url, {
        params: body
      })
      .then(response => {
        
        resolve(response.data.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

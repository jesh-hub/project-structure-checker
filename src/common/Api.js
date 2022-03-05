import axios from 'axios';

const instance = axios.create({
    timeout: 1000,
    headers: { 'X-Api-Key': 'ShEJGOWN462FbdH9Wl7141qcoJR6m06r7a6Kq5Pn' }
});

export async function get(url) {
    const {data} = await instance.get(url);
    return data;
}

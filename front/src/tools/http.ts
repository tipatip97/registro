
export class Http {

  get(url: string) {
    return fetch(url)
      .then(r => r.json());
  }

  put(url: string, payload: any) {
    return fetch(url, {
      method: 'put',
      body: payload,
    })
      .then(r => r.json());
  }

  post(url: string, payload: any) {
    return fetch(url, {
      method: 'post',
      body: payload,
    })
      .then(r => r.json());
  }
}
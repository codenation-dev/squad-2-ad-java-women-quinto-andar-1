import axios from 'axios';
export class BaseService {
  static handleError(error) {
    // TODO: implementar sistema de notificações de erro
    console.log(error)
  }

  static header = {
    headers: { Authorization: sessionStorage.getItem("authToken") }
  }

  static get = async (url, callback) => await axios.get(url, this.header).then(callback)
    .catch(e => this.handleError(e));

  static post = async (url, body) => {
    if (url.includes('user')) {
     return await axios.post(url, body)
      .catch(e => this.handleError(e)); 
    }
    
    return await axios.post(url, { ...this.header, ...body })
      .catch(e => this.handleError(e));
  }

  static put = async (url, body) => await axios.put(url, { ...this.header, body })
  .catch(e => this.handleError(e));

  static patch = async (url, body) => await axios.patch(url, { ...this.header, body })
  .catch(e => this.handleError(e));
}
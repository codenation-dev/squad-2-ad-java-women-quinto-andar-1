import axios from 'axios';
export class BaseService {
  static handleError(error) {
    // TODO: implementar sistema de notificações de erro
    // user intercept do axios ?
    console.log(error)
  }

  static header = () => {
    const authToken = sessionStorage.getItem("authToken")

    if (authToken) {
      return {
        headers: { Authorization: authToken }
      }
    } else {
      this.header()
    }
  }

  static get = async (url, callback) => await axios.get(url, this.header()).then(callback)
    .catch(e => this.handleError(e));

  static post = async (url, body, callback) => {
    if (url.includes('user')) {
     return await axios.post(url, body).then(callback)
      .catch(e => this.handleError(e)); 
    }
    
    return await axios.post(url, body, this.header()).then(callback)
      .catch(e => this.handleError(e));
  }

  static put = async (url, body) => await axios.put(url, body, this.header())
    .catch(e => this.handleError(e));

  static patch = async (url, body) => await axios.patch(url, body, this.header())
    .catch(e => this.handleError(e));
}
import axios from 'axios';
export class BaseService {
  static handleError(error) {
    return {
      status: error.response.status,
      error: error.response.data.error,
      message: error.response.data.message,
    }
  }

  static header = () => {
    const authToken = sessionStorage.getItem("authToken")
    
    return {
      headers: { Authorization: authToken }
    }
  }

  static get = async (url) => await axios.get(url, this.header())
    .catch(e => this.handleError(e));

  static post = async (url, body) => {
    if (url.includes('user')) {
     return await axios.post(url, body)
      .catch(e => this.handleError(e)); 
    }
    
    return await axios.post(url, body, this.header())
      .catch(e => this.handleError(e));
  }

  static put = async (url, body) => await axios.put(url, body, this.header())
    .catch(e => this.handleError(e));

  static patch = async (url, body) => await axios.patch(url, body, this.header())
    .catch(e => this.handleError(e));
}
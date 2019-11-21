import { BaseService } from "./BaseService";

export class RequestService extends BaseService {
  static BASE_URL = 'https://sherlog-api.herokuapp.com';

  static login = async (body, callback) => this.post(`${this.BASE_URL}/user/login`, body, callback)

  static signUp = async (body, callback) => this.post(`${this.BASE_URL}/user`, body, callback)

  static getLogsByEnvironment = async (env, callback) => this.get(`${this.BASE_URL}/log/${env}`, callback)

  static searchLogs = async (env, filter, query, callback) => this.get(`${this.BASE_URL}/log/${env}?filter=${filter}&value=${query}`, callback)

  static orderLogs =  async (env, order, callback) => this.get(`${this.BASE_URL}/log/${env}?order=${order}`, callback)

  static changeStatus = async (body) => this.patch(`${this.BASE_URL}/log/status`, body)

  static getLogById = async (id, callback) => this.get(`${this.BASE_URL}/log?id=${id}`, callback)
}
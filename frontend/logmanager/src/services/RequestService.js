import { BaseService } from "./BaseService";

export class RequestService extends BaseService {
  static BASE_URL = 'https://sherlog-api.herokuapp.com';

  static login = async (body) => this.post(`${this.BASE_URL}/user/login`, body).catch(e => e)

  static signUp = async (body) => this.post(`${this.BASE_URL}/user`, body)

  static getLogsByEnvironment = async (env, callback) => this.get(`${this.BASE_URL}/log/${env}`, callback)

  static searchLogs = async (env, filter, query, callback) => this.get(`${this.BASE_URL}/log/${env}?filter=${filter}&value=${query}`, callback)

  static orderLogs =  async (env, order, callback) => this.get(`${this.BASE_URL}/log/${env}?order=${order}`, callback)

  static changeStatus = async (body) => this.patch(`${this.BASE_URL}/log/status`, body)

  static getLogById = async (id, callback) => this.get(`${this.BASE_URL}/log?id=${id}`, callback)
}
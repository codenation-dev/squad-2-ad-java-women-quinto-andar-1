import { BaseService } from "./BaseService";

export class RequestService extends BaseService {
  static BASE_URL = 'https://sherlog-api.herokuapp.com';

  static login = async (body) => this.post(`${this.BASE_URL}/user/login`, body)

  static signUp = async (body) => this.post(`${this.BASE_URL}/user`, body)

  static getLogsByEnvironment = async (env) => this.get(`${this.BASE_URL}/log/${env}`)

  static searchLogs = async (env, filter, query) => this.get(`${this.BASE_URL}/log/${env}?filter=${filter}&value=${query}`)

  static orderLogs = async (env, order) => this.get(`${this.BASE_URL}/log/${env}?order=${order}`)

  static changeStatus = async (body) => this.patch(`${this.BASE_URL}/log/status`, body)

  static getLogById = async (id) => this.get(`${this.BASE_URL}/log?id=${id}`)
}
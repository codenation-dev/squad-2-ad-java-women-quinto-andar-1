import { BaseService } from "./BaseService";

export class RequestService extends BaseService {
  static BASE_URL = 'https://sherlog-api.herokuapp.com';

  static login = async (body) => this.post(`${this.BASE_URL}/user/login`, body)

  static signUp = async (body) => this.post(`${this.BASE_URL}/user`, body)

  static listLogs = async () => this.get(`${this.BASE_URL}/log`)

  static getLogById = async (id) => this.get(`${this.BASE_URL}/${id}`)
}
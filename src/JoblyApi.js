import axios from "axios";
import { TOKEN_STORAGE_ID } from "./App";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = "get") {
    paramsOrData._token = JSON.parse(
      window.localStorage.getItem(TOKEN_STORAGE_ID)
    );

    console.debug("API Call:", endpoint, paramsOrData, verb);

    try {
      return (
        await axios({
          method: verb,
          url: `${BASE_URL}/${endpoint}`,
          [verb === "get" ? "params" : "data"]: paramsOrData,
        })
      ).data;
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCompanies(params = {}) {
    let res = await this.request(`companies/`, params);
    return res.companies;
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getJobs(params = {}) {
    let res = await this.request(`jobs/`, params);
    return res.jobs;
  }

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res;
  }

  static async registerUser(data) {
    let res = await this.request(`users/`, data, "post");
    return res;
  }

  static async loginUser(data) {
    let res = await this.request(`login/`, data, "post");
    return res;
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res;
  }

  static async applyToJob(id) {
    let res = await this.request(`jobs/${id}/apply`, {}, "post");
    return res;
  }
}

export default JoblyApi;

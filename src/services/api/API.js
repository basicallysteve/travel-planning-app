import Interface from "interface";
import axios from "axios";
import _ from "lodash";
import pluralize from "pluralize";

axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

class API {
    model = null;
    constructor({ driver, baseUrl, headers, model }) {
        this.driver = driver;
        this.baseUrl = baseUrl;
        this.headers = headers;
        this.model = model;
        this.adapter = null;
        switch(this.driver) {
            case "axios":
                this.adapter = new AxiosAdapter({ baseUrl, headers });
                break;
            case "test":
                this.adapter = new TestAdapter({ baseUrl, headers, model });
                break;
            default:
                throw new Error("Invalid driver");
        }
    }

    _getPrimaryKey(payload){
        return payload[_.snakeCase(this.model)][`${_.snakeCase(this.model)}_id`];
    }

    repo(){
        return {
            ["fetch"+_.upperFirst(this.model)]: (payload)=>{
                return this.adapter.get({ id: this._getPrimaryKey(payload), params: payload.params});
            },
        
            ["fetch"+(pluralize(_.upperFirst(this.model)))]: ({ params }) => {
                return this.adapter.getAll({ params });
            },
        
            ["create"+_.upperFirst(this.model)]: (payload)=> {
                return this.adapter.post(payload);
            },
        
            ["update"+_.upperFirst(this.model)]: (payload) => {
                return this.adapter.put({ id: this._getPrimaryKey(payload), data: payload });
            },
        
            ["delete"+_.upperFirst(this.model)]: (id) => {
                return this.adapter.delete({ id });
            }
        }
    }


}

const ApiAdapterInterface = Interface.create(...["getAll", 'get', "post", "put", "delete"]);

class AxiosAdapter extends ApiAdapterInterface {;
    constructor({ baseUrl, headers }) {
        super();
        this.baseUrl = baseUrl;
        this.headers = headers;
        this._axios = axios;
    }

    getAll({params = {}}) {
        let url = new URL(this.baseUrl);
        url.search = new URLSearchParams(params).toString();
        return this._axios.get(url);
    }

    get({ id, params = {} }) {
        let url = new URL(`${this.baseUrl}/${id}`);
        url.search = new URLSearchParams(params).toString();
        return this._axios.get(url);
    }

    post(payload) {
        return this._axios.post(this.baseUrl, payload);
    }

    put({ id, data }) {
        return this._axios.put(`${this.baseUrl}/${id}`, data);
    }

    delete({ id }) {
        return this._axios.delete(`${this.baseUrl}/${id}`);
    }

}

class TestAdapter extends ApiAdapterInterface {
    constructor({ baseUrl, headers, model }) {
        super();
        this.baseUrl = baseUrl;
        this.headers = headers;
        this.model = model;
    }

    get primaryKey(){
        return `${_.snakeCase(this.model)}_id`;
    }


    getAll({params = {}}) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ data: { data: [{ [this.primarKey]: 1, name: "test" }] } });
            }, 1000);
        });
    }

    get({ id, params = {} }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ data: { data: { [this.primarKey]: 1, name: "test" } } });
            }, 1000);
        });
    }

    post(payload) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ data: { data: { [this.primarKey]: 1, name: "test" } } });
            }, 1000);
        });
    }

    put({ id, data }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ data: { data: { [this.primarKey]: 1, name: "test" } } });
            }, 1000);
        });
    }

    delete({ id }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ data: { data: { [this.primarKey]: 1, name: "test" } } });
            }, 1000);
        });
    }
}


export default API;
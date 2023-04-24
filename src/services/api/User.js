import API from "./API";

export default class User extends API {
    constructor() {
        super({ driver: "axios", baseUrl: "http://localhost:3000/api/users", model: "user" });
    }
}
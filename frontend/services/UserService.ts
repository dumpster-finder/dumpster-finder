import { AxiosInstance } from "axios";

export default class UserService {
    axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    /**
     * Fetches a user ID from the API server
     */
    getUserID(): Promise<string> {
        return this.axios.get("/users").then(response => response.data);
    }

    /**
     * Authenticates a user with an ID, returns a token
     */
    authenticate(userID: string): Promise<string> {
        return this.axios
            .get(`/users/validation/${userID}`)
            .then(response => response.headers["JWTToken"]);
    }
}

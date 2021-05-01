import { AxiosInstance } from "axios";

interface UserResponse {
    userID: number;
    userName: string;
}

export default class UserService {
    axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    /**
     * Fetches a user ID from the API server
     */
    getUserID(): Promise<UserResponse> {
        return this.axios.post("/users").then(response => response.data);
    }

    /**
     * Authenticates a user with an ID, returns a token
     */
    authenticate(userID: number, userName: string): Promise<string> {
        return this.axios
            .post(`/users/validation/${userID}`, { userName })
            .then(response => response.headers["x-access-token"]);
    }
}

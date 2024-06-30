import axios, { AxiosInstance } from 'axios';

export class apiClient {
     axiosInstane: AxiosInstance;
    
    constructor() {
        this.axiosInstane = axios.create({
            baseURL: 'http://jsonplaceholder.typicode.com',
            timeout: 1000
        });
    }
}




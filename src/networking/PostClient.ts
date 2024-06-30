import { Post } from "../model/Post";
import { apiClient } from "./ApiClient";

export class PostClient extends apiClient {
    constructor() {
        super();
    }
    async fetchPost(): Promise<Post[]>{
        let response = await this.axiosInstane.get<Post[]>('posts');
        if(response.status ==200){
            return response.data;
        }
        else{
           throw new Error('Error');
        }
    }
}
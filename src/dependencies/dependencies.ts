import {Container} from 'inversify';
import userSevices from '../services/UserService';
import { PostClient } from '../networking/PostClient';
const container = new Container();
container.bind<userSevices>('userSevices').toConstantValue(new userSevices());
container.bind<PostClient>('PostClient').toConstantValue(new PostClient());
export default container;
import { Container } from "inversify";
import { loginRepo } from "../../data/repositories/loginrepo";
import { LoginRepoImpl } from "../../data/repositories/loginrepoimpl";

const container = new Container();
container.bind<loginRepo>('LoginRepo').toConstantValue(new LoginRepoImpl());

export default container;
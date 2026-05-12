import {Container} from 'inversify';
import IAuthRepository from './src/domain/repository/IAuthRepository';
import AuthRepositoryPocketBase from './src/infrastructure/repository/AuthRepositoryPocketBase';
import LoginUser from "./src/application/usecase/LoginUser";
import CreateUser from "./src/application/usecase/CreateUser";
import UserRepositoryPocketBase from "./src/infrastructure/repository/UserRepositoryPocketBase";
import IUserRepository from "./src/domain/repository/IUserRepository";
import DisplayEventDetails from "./src/application/usecase/DisplayEventDetails";
import IEventsRepository from "./src/domain/repository/IEventsRepository";
import EventsRepositoryPocketBase from "./src/infrastructure/repository/EventsRepositoryPocketBase";
import GetAvaiblesEvents from "./src/application/usecase/GetAvaiblesEvents";

const container = new Container({defaultScope: "Singleton"});
// repository
container.bind(IAuthRepository).to(AuthRepositoryPocketBase);
container.bind(IUserRepository).to(UserRepositoryPocketBase);
container.bind(IEventsRepository).to(EventsRepositoryPocketBase);


// usecases
container.bind(CreateUser).toSelf();
container.bind(LoginUser).toSelf();
container.bind(DisplayEventDetails).toSelf();
container.bind(GetAvaiblesEvents).toSelf();


export {container};
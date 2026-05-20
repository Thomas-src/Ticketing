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
import CreateNewEvent from "./src/application/usecase/CreateNewEvent";
import GetOwnerEvents from "./src/application/usecase/GetOwnerEvents";
import ITagRepository from "./src/domain/repository/ITagRepository";
import TagRepositoryPocketBase from "./src/infrastructure/repository/TagRepositoryPocketBase";
import {TagManager} from "./src/domain/core/services/TagManager";
import LocationRepositoryMapBox from "./src/infrastructure/repository/LocationRepositoryMapBox";
import ILocationRepository from "./src/domain/repository/ILocationRepository";
import {LocationFinder} from "./src/domain/core/services/LocationFinder";
import UpdateEvent from "./src/application/usecase/UpdateEvent";
import IReservationRepository from "./src/domain/repository/IReservationRepository";
import ReservationRepositoryPocketBase from "./src/infrastructure/repository/ReservationRepositoryPocketBase";
import VerifyTickets from "./src/application/usecase/VerifyTickets";
import SaveReservation from "./src/application/usecase/SaveReservation";
import UserTickets from "./src/application/usecase/UserTickets";
import GetTicket from "./src/application/usecase/GetTicket";


const container = new Container({defaultScope: "Singleton"});
// repository
container.bind(IAuthRepository).to(AuthRepositoryPocketBase);
container.bind(IUserRepository).to(UserRepositoryPocketBase);
container.bind(IEventsRepository).to(EventsRepositoryPocketBase);
container.bind(ITagRepository).to(TagRepositoryPocketBase);
container.bind(ILocationRepository).to(LocationRepositoryMapBox);
container.bind(IReservationRepository).to(ReservationRepositoryPocketBase);

// services
container.bind(TagManager).toSelf();
container.bind(LocationFinder).toSelf();


// usecases
container.bind(CreateUser).toSelf();
container.bind(LoginUser).toSelf();
container.bind(DisplayEventDetails).toSelf();
container.bind(GetAvaiblesEvents).toSelf();
container.bind(CreateNewEvent).toSelf();
container.bind(GetOwnerEvents).toSelf();
container.bind(UpdateEvent).toSelf();
container.bind(VerifyTickets).toSelf();
container.bind(SaveReservation).toSelf();
container.bind(UserTickets).toSelf();
container.bind(GetTicket).toSelf();

export {container};
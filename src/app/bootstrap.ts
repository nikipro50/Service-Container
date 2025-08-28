import Container from "../core/container";
import EventBus from "../core/event-bus";
import User from "../models/user";
import LoggerService from "../services/logger.service";
import UserService from "../services/user.service";

export async function bootstrap() {
    const bus = new EventBus();

    const logger = Container.register(LoggerService);
    const users = Container.register(UserService);

    bus.on<User>("user:created", (user) => {
        logger.log(`Nuovo utente creato: ${user.name} (#${user.id})`);
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    const u1 = users.addUser("Down");
    bus.emit("user:created", u1);

    const u2 = users.addUser("StoCazzo");
    bus.emit("user:created", u2);

    logger.log("Totale Utenti: " + users.getAll().length);
}


function Service<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        __serviceId = Symbol(constructor.name);
    };
}

class Container {
    private static services = new Map<symbol, any>();

    static register<T>(service: new (...args: any[]) => T): T {
        const instance = new service();

        // @ts-ignore
        this.services.set(instance.__serviceId, instance);

        return instance;
    }

    static get<T>(service: new (...args: any[]) => T): T {
        const temp = new service();

        // @ts-ignore
        return this.service.get(temp.__serviceId);
    }
}

type EventHandler<T> = (payload: T) => void;

class EventBus {
    private listeners = new Map<string, Set<EventHandler<any>>>();

    on<T>(event: string, handler: EventHandler<T>) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }

        this.listeners.get(event)!.add(handler);
    }

    emit<T>(event: string, payload: T) {
        this.listeners.get(event)?.forEach(handler => handler(payload));
    }
}

@Service
class LoggerService {
    log(message: string) {
        console.log(`[LOG] ${message}`);
    }
}

interface User {
    id: number;
    name: string;
}

@Service
class UserService {
    private users: User[] = [];

    addUser(name: string): User {
        const user = { id: Date.now(), name };
        this.users.push(user);
        return user;
    }

    getAll(): ReadonlyArray<User> {
        return this.users;
    }
}

async function bootstrap() {
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

bootstrap();
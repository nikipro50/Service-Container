
export function Service<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        __serviceId = Symbol(constructor.name);
    };
}

export default class Container {
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
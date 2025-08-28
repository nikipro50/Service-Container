export type EventHandler<T> = (payload: T) => void;

export default class EventBus {
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
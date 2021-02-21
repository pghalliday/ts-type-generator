export type Listener<T> = (event: T) => void;

export class Event<T> {
    private listeners: Listener<T>[] = [];

    on(listener: Listener<T>): void {
        this.listeners.push(listener);
    }

    emit(event: T): void {
        this.listeners.forEach((listener) => listener(event));
    }
}

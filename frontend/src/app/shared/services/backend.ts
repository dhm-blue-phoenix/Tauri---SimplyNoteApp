import { Service, Signal, signal, WritableSignal } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { Note, Notes, Method, BackendResult, RequestData, AddNote } from '../interfaces/services/backend';


@Service()
export class Backend {
    private readonly url: RequestInfo = `${environment['BACKEND_URL']}/api/`;

    private readonly _notes: WritableSignal<Notes> = signal<Notes>([]);
    public readonly notes: Signal<Notes> = this._notes.asReadonly();

    private readonly _note: WritableSignal<Note | null> = signal<Note | null>(null);
    public readonly note: Signal<Note | null> = this._note.asReadonly();

    constructor() {
        this.testing();
    }

    /*
    * Hierbei handelt es sich um eine Test funktion um die Backend API
    * beim Implementiren gleich Testen zu können!
    * */
    private async testing(): Promise<void> {
    }

    public async load_notes(): Promise<BackendResult> {
        const request_data: RequestData = {
            method: 'GET',
            endpoint: 'notes'
        };
        const result: BackendResult = await this.request(request_data);

        if (!result['is_ok']) throw new Error(`Backend Error: ${result['status']}`);

        return result;
    }

    public async load_note(id: string): Promise<void> {
        let note: Note | undefined = this.notes().find(note => note.id === id);
        this._note.set(note ?? null);
    }

    public async add_note(data: AddNote) {
        const request_data: RequestData = {
            method: 'POST',
            endpoint: 'notes',
            body: data
        };
        const result: BackendResult = await this.request(request_data);
        console.log('add_note result', result);
        if (!result['is_ok']) throw new Error(`Backend Error: ${result['status']}`);
        const created = result['content'];
        if (created && typeof created === 'object' && 'id' in created) {
            this._notes.update((items) => [...items, created as Note]);
        }
    }

    public async edit_note(id: string, data: Partial<AddNote>) {
        const request_data: RequestData = {
            method: 'PATCH',
            endpoint: 'notes',
            id: id,
            body: data
        };
        const result: BackendResult = await this.request(request_data);
        console.log('edit_note result', result);
        if (!result['is_ok']) throw new Error(`Backend Error: ${result['status']}`);
        const updated = result['content'];
        if (updated && typeof updated === 'object' && 'id' in updated) {
            this._notes.update((items) => items.map((item) => item.id === updated.id ? updated as Note : item));
        }
    }

    public async delete_note(id: string) {
        const request_data: RequestData = {
            method: 'DELETE',
            endpoint: 'notes',
            id: id
        };
        const result: BackendResult = await this.request(request_data);
        console.log('delete_note result', result);
        if (!result['is_ok']) throw new Error(`Backend Error: ${result['status']}`);
        this._notes.update((items) => items.filter((item) => item.id !== id));
    }

    private async request(request_data: RequestData): Promise<BackendResult> {
        const url: RequestInfo = `${this.url}${request_data['endpoint']}${request_data['id'] ? `/${request_data['id']}` : ''}`;
        try {
            const resp: Response = await fetch(url, this.return_request_data(request_data['method'], request_data['body']));
            const result: unknown = await resp.json();

            if (request_data.method === 'GET' && Array.isArray(result)) {
                this._notes.set(result);
            }

            return {
                is_ok: resp.ok,
                status: resp.status,
                content: result
            };
        } catch (error) {
            return {
                is_ok: false,
                status: 'error',
                content: error
            };
        }
    }

    private return_request_data(method: Method, body?: unknown): RequestInit {
        const request: RequestInit = {
            method: method,
        };
        return method !== 'GET' ? {
            ...request,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        } : request;
    }
}

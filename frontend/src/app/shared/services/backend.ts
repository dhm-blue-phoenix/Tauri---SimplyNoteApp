import { Service, Signal, signal, WritableSignal } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { Note, Notes, Method, BackendResult, RequestData } from '../interfaces/services/backend';


@Service()
export class Backend {
    private readonly url: RequestInfo = `${environment['BACKEND_URL']}/api/`;
    private readonly _notes: WritableSignal<Note[] | []> = signal<Note[] | []>([]);
    public readonly notes: Signal<Note[] | []> = this._notes.asReadonly();

    constructor() {
        this.testing();
    }

    /*
    * Hierbei handelt es sich um eine Test funktion um die Backend API
    * beim Implementiren gleich Testen zu können!
    * */
    private async testing(): Promise<void> {
    }

    public async load_notes(): Promise<void | BackendResult> {
        const request_data: RequestData = {
            method: "GET",
            endpoint: "notes"
        };
        const result: void | BackendResult = await this.request(request_data);
        
        if (!result['is_ok']) throw new Error(`Backend Error: ${result['status']}`);
        
        return result;
    }

    public async add_note() {}

    public async edit_note() {}

    public async delete_note() {}

    private async request(request_data: RequestData): Promise<BackendResult> {
        const url: RequestInfo = `${this.url}${request_data['endpoint']}${request_data['id'] ? `/${request_data['id']}` : ''}`;
        try {
            const resp: Response = await fetch(url, this.return_request_data(request_data['method'], request_data['body']));
            const result: Notes = await resp.json();
            return {
                is_ok: resp.ok,
                status: resp.status,
                content: result
            };
        } catch (error) {
            return {
                is_ok: false,
                status: "error",
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

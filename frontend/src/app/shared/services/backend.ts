import { Service, Signal, signal, WritableSignal } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { Note, Notes, Endpoint, BackendResult } from '../interfaces/services/backend';


@Service()
export class Backend {
    private readonly url: RequestInfo = `${environment.BACKEND_URL}/api/`;
    private readonly _notes: WritableSignal<Note[] | []> = signal<Note[] | []>([]);
    public readonly notes: Signal<Note[] | []> = this._notes.asReadonly();

    constructor() {
        //this.testing();
    }

    /*
    * Hierbei handelt es sich um eine Test funktion um die Backend API
    * beim Implementiren gleich Testen zu können!
    * */
    private async testing(): Promise<void> {
        const data: BackendResult = await this.get_data('notes');
        const data2: BackendResult = await this.get_data('note');
        console.debug(data);
        console.debug(data2);
    }

    public async load_notes() {
        const data: BackendResult = await this.get_data('notes');
        console.debug(data);
    }

    private async get_data(endpoint: Endpoint): Promise<BackendResult> {
        const url: RequestInfo = `${this.url}${endpoint}`;
        try {
            const resp: Response = await fetch(url, {
                method: 'GET'
            });
            const result: Notes = await resp.json();
            this._notes.set(result);
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
}

import {Component, inject, computed, Signal} from '@angular/core';
import {Notes} from '../../shared/interfaces/services/backend';
import {Backend} from '../../shared/services/backend';
import {BtnAdd} from '../../shared/components/btn/btn-add/btn-add';
import {Navigate} from '../../shared/services/navigate';

@Component({
    imports: [BtnAdd],
    selector: 'app-main',
    styleUrl: './main.css',
    templateUrl: './main.html',
})
export class Main {
    private backend: Backend = inject(Backend);
    private navigate: Navigate = inject(Navigate);
    public notes: Signal<[] | Notes> = this.backend.notes;
    public openTrash: boolean = false;

    async ngOnInit(): Promise<void> {
        await this.backend.load_notes();
        const notes: Signal<[] | Notes> = computed(() => this.notes());
        console.debug('DEBUG', notes());
    }

    public navigate_to_show(id: string): void {
        this.navigate.set_switch('show', id);
    }

    public open_context_menu(event: MouseEvent, noteId: string): void {
        event.preventDefault();
        this.openTrash = !this.openTrash;
    }

    public delete_note(noteId: string): void {
        this.backend.delete_note(noteId);
    }
}

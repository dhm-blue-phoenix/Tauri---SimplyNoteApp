import {Component, inject, WritableSignal, computed} from '@angular/core';
import {Note} from '../../shared/interfaces/backend';
import {Backend} from '../../shared/services/backend';
import {BtnAdd} from '../../shared/components/btn/btn-add/btn-add';

@Component({
    imports: [BtnAdd],
    selector: 'app-main',
    styleUrl: './main.css',
    templateUrl: './main.html',
})
export class Main {
    private backend = inject(Backend);
    public notes: WritableSignal<[] | Note[]> = this.backend.notes;

    async ngOnInit(): Promise<void> {
        await this.backend.load_notes();
        const notes = computed(() => this.notes());
        console.debug("DEBUG", notes());
    }
}

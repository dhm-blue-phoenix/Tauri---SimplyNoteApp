import {Component, inject, computed, Signal} from '@angular/core';
import {Notes} from '../../shared/interfaces/services/backend';
import {Backend} from '../../shared/services/backend';
import {BtnAdd} from '../../shared/components/btn/btn-add/btn-add';

@Component({
    imports: [BtnAdd],
    selector: 'app-main',
    styleUrl: './main.css',
    templateUrl: './main.html',
})
export class Main {
    private backend: Backend = inject(Backend);
    public notes: Signal<[] | Notes> = this.backend.notes;

    async ngOnInit(): Promise<void> {
        await this.backend.load_notes();
        const notes: Signal<[] | Notes> = computed(() => this.notes());
        console.debug("DEBUG", notes());
    }
}

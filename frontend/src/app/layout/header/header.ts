import {Component, computed, inject, Signal} from '@angular/core';

import {BtnHeader} from '../../shared/components/btn/btn-header/btn-header';
import {Navigate} from '../../shared/services/navigate';
import { Switch } from '../../shared/interfaces/services/navigate';
import { BtnTypes } from '../../shared/interfaces/components/btn';

@Component({
    imports: [BtnHeader],
    selector: 'app-header',
    styleUrl: './header.css',
    templateUrl: './header.html',
})
export class Header {
    private navigate: Navigate = inject(Navigate);
    public switch: Signal<Switch> = this.navigate.switch;

    ngOnInit(): void {
        const switch_value: Signal<Switch> = computed(() => this.switch());
        console.debug("DEBUG", switch_value());
        this.navigate.set_switch('main');
    }

public navigate_to_main(): void {
        this.navigate.set_switch('main');
    }


    public set_btn(type: BtnTypes): BtnTypes {
        return type;
    }
}

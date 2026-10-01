import { Component, computed, inject, Signal } from '@angular/core';

import { BtnHeader } from '../../shared/components/btn/btn-header/btn-header';
import { Navigate } from '../../shared/services/navigate';
import { Switch } from '../../shared/interfaces/services/navigate';
import { BtnTypes } from '../../shared/interfaces/components/btn';
import { test } from '../editor/editor';


@Component({
    imports: [BtnHeader],
    selector: 'app-header',
    styleUrl: './header.css',
    templateUrl: './header.html',
})
export class Header {
    private readonly navigate: Navigate = inject(Navigate);
    public readonly switch: Signal<Switch> = this.navigate.switch;
    public readonly save_is_disable: boolean = test;

    ngOnInit(): void {
        const switch_value: Signal<Switch> = computed(() => this.switch());
        console.debug('DEBUG', switch_value());
        this.navigate.set_switch('main', '');
    }

    public to_navigate(value: Switch): void {
        const state_value: string = value === 'editor' ? history.state['state'] : '';
        this.navigate.set_switch(value, state_value);
    }

    public save(): void {
        console.log(test)
    }

    public set_btn(type: BtnTypes): BtnTypes {
        return type;
    }
}

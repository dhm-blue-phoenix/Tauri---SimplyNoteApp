import { inject, Service, Signal, signal, WritableSignal } from '@angular/core';
import { Switch } from '../interfaces/services/navigate';
import { Router } from '@angular/router';

@Service()
export class Navigate {
    private router = inject(Router);
    
    private readonly _switch: WritableSignal<Switch> = signal<Switch>('main');
    public readonly switch: Signal<Switch> = this._switch.asReadonly();

    public set_switch(value: Switch, state_value: string): void {
        this._switch.set(value);
        this.router.navigate([value], {
            state: {state: state_value}
        });
        console.debug('DEBUG', `Navigated to ${value}`);
    }
}

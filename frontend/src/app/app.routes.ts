import { Routes } from "@angular/router";
import { Main } from './layout/main/main';
import { Show } from './layout/show/show';
import { Editor } from './layout/editor/editor';

export const routes: Routes = [
    { path: '', children: [
        { path: '', component: Main },
        { path: 'show', component: Show },
        { path: 'editor', component: Editor },
    ]},
    { path: '**', redirectTo: '' },
];

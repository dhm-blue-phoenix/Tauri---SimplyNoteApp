import { Routes } from "@angular/router";
import { Main } from './layout/main/main';
import { Editor } from './layout/editor/editor';

export const routes: Routes = [
    { path: '', children: [
        { path: '', component: Main },
        { path: 'editor', component: Editor },
    ]},
    { path: '**', redirectTo: '' },
];

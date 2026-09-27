import { Component, inject } from '@angular/core';
import { Backend } from '../../shared/services/backend';

@Component({
  imports: [],
  selector: 'app-editor',
  styleUrl: './editor.css',
  templateUrl: './editor.html',
})
export class Editor {
  private backend: Backend = inject(Backend);
  
}
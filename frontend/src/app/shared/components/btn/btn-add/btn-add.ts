import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-btn-add',
  styleUrl: './btn-add.css',
  templateUrl: './btn-add.html',
})
export class BtnAdd {
  private router = inject(Router);

  public navigateToEditor() {
    console.log('Navigating to editor...');
    this.router.navigate(['editor']);
  }
}

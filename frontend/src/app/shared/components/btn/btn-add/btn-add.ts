import { Component, inject } from '@angular/core';
import { Navigate } from '../../../services/navigate';

@Component({
  imports: [],
  selector: 'app-btn-add',
  styleUrl: './btn-add.css',
  templateUrl: './btn-add.html',
})
export class BtnAdd {
  private navigate = inject(Navigate);

  public navigate_to_editor(): void {
    this.navigate.set_switch('editor', '');
  }
}

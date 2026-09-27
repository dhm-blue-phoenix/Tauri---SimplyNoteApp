import {Component, input, InputSignal} from '@angular/core';

export type BtnTypes = "search" | "info" | 'arrow-back' | 'edit';

@Component({
  imports: [],
  selector: 'app-btn-header',
  styleUrl: './btn-header.css',
  templateUrl: './btn-header.html',
})
export class BtnHeader {
  public setBtnType: InputSignal<BtnTypes | undefined> = input<BtnTypes>();
}

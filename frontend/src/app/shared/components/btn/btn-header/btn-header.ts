import {Component, input, InputSignal} from '@angular/core';
import {BtnTypes} from '../../../interfaces/components/btn';

@Component({
  imports: [],
  selector: 'app-btn-header',
  styleUrl: './btn-header.css',
  templateUrl: './btn-header.html',
})
export class BtnHeader {
  public setBtnType: InputSignal<BtnTypes | undefined> = input<BtnTypes>();
}

import { Component, inject, Signal } from '@angular/core';
import { Backend } from '../../shared/services/backend';
import { Note } from '../../shared/interfaces/services/backend';

@Component({
  imports: [],
  selector: 'app-show',
  styleUrl: './show.css',
  templateUrl: './show.html',
})
export class Show {
  private readonly backend: Backend = inject(Backend);
  public readonly note: Signal<Note | null> = this.backend.note;

  async ngOnInit(): Promise<void> {
    await this.backend.load_note(history.state['state'])
  }
}

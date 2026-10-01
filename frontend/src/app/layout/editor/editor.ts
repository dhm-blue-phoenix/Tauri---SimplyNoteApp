import { Component, inject, Signal } from '@angular/core';
import { Backend } from '../../shared/services/backend';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddNote, Note, Notes } from '../../shared/interfaces/services/backend';

interface FormData {
  title: FormControl<string>;
  content: FormControl<string | null>;
}

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-editor',
  styleUrl: './editor.css',
  templateUrl: './editor.html',
})
export class Editor {
  private readonly backend: Backend = inject(Backend);
  public readonly note: Signal<Note | null> = this.backend.note;
  public disable_save: boolean = true;
  private readonly note_id: string = history.state['state'] || '';

  async ngOnInit(): Promise<void> {
    await this.backend.load_note(this.note_id);
    this.set_form_values();
  }

  private set_form_values(): void {
    const currentNote: Note | null = this.note();
    this.note_form.setValue({
      title: currentNote?.title ?? '',
      content: currentNote?.content ?? ''
    });
  }

  public note_form: FormGroup<FormData> = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(5)] }),
    content: new FormControl('', { nonNullable: false })
  });

  get title(): AbstractControl<string> | null {
    return this.note_form.get('title');
  }

  get content(): AbstractControl<string | null> | null {
    return this.note_form.get('content');
  }

  public on_submit(): void {
    if (this.note_form.invalid) return;

    const formValue = this.note_form.getRawValue();
    const payload: AddNote = {
      title: formValue.title.trim(),
      content: formValue.content?.trim() ?? ''
    };

    if (this.note_id) {
      this.backend.edit_note(this.note_id, payload);
      return;
    }

    const current_notes = Array.isArray(this.backend.notes()) ? this.backend.notes() : [];
    const existing_note = current_notes.find(note =>
      note.title.toLowerCase() === payload.title.toLowerCase()
    );

    if (existing_note) {
      this.backend.edit_note(existing_note.id, payload);
      return;
    }

    this.backend.add_note(payload);
  }
}
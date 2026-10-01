import { Component, inject, Signal, computed } from '@angular/core';
import { Backend } from '../../shared/services/backend';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Note } from '../../shared/interfaces/services/backend';

export let test = true;

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

  async ngOnInit(): Promise<void> {
    await this.backend.load_note(history.state['state']);
    this.set_form_values();
  }

  private set_form_values() {
    const note: Signal<Note | null> = computed(this.note);
    this.note_form.setValue({
      title: note()?.title || '',
      content: note()?.content || ''
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
    if (this.note_form.invalid) return console.error('form not valid');

    console.log(this.note_form)
  }
}
import { Component, OnInit } from '@angular/core';
import { NotesService } from './../../services/notes.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  allNotes: any = null;
  isLoading: boolean = false;
  NoteId: any;
  constructor(private _NotesService: NotesService) {
  }
  ngOnInit(): void {
    this.getAllNotes()
  }
  getAllNotes() {
    if(this.allNotes === null){
      this.isLoading = false ;
    }else{
      this.isLoading = true;
    }
    this._NotesService.getAllNotes().subscribe({
      next: res => {
        this.isLoading = false;
        this.allNotes = res.Notes;
      }
    })
  }
  addNoteForm: FormGroup = new FormGroup({
    title : new FormControl(null , [Validators.required]) ,
    desc : new FormControl(null , [Validators.required])
  })
  addNote() {
    let data = {
      title: this.addNoteForm.value.title,
      desc: this.addNoteForm.value.desc,
      userID: this._NotesService.userID ,
      token: this._NotesService.token
    }
    if (this.addNoteForm.valid) {
      this.isLoading = true ;
      this._NotesService.addNote(data).subscribe(res => {
        if (res.message === "success") {
          this.isLoading = false;
          $("#addNote").modal("hide");
          this.getAllNotes();
          this.addNoteForm.reset();
        } else {
          this.isLoading = false;
        }
      });
    }
  }
  getId(id: string) {
    this.NoteId = id ;
  }
  deleteNote() {
    let data = {
      NoteID:this.NoteId ,
      token:this._NotesService.token
    }
    this.isLoading = true
    this._NotesService.deleteNote(data).subscribe({
      next: res => {
        if (res.message === "deleted") {
          this.isLoading = false;
          $("#deleteNote").modal("hide");
          this.getAllNotes();
        }
      }
    })
  }
  updateNoteForm: FormGroup = new FormGroup({
    title : new FormControl(null , [Validators.required]) ,
    desc : new FormControl(null , [Validators.required])
  })
  setNoteDetails() {
    for (let note of this.allNotes) {
      if (note._id === this.NoteId) {
        this.updateNoteForm.controls['title'].setValue(note.title);
        this.updateNoteForm.controls['desc'].setValue(note.desc);
      }
    }
  }

  updateNote() {
    let data = {
      title: this.updateNoteForm.value.title,
      desc: this.updateNoteForm.value.desc,
      NoteID: this.NoteId ,
      token: this._NotesService.token
    }
    if (this.updateNoteForm.valid) {
      this.isLoading = true;
      this._NotesService.updateNote(data).subscribe({
        next: res => {
          if(res.message === "updated")
          this.isLoading = false;
          $("#editNote").modal("hide");
          this.getAllNotes();
        }
      })
    }
  }
}

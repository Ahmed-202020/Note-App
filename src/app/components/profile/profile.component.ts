import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id: any;
  ls:any = localStorage.getItem("notes");
  allNotes:any[] = JSON.parse(this.ls) || [];

  constructor() {
  }
  ngOnInit(): void {
    this.getAllNotes()
  }
  getAllNotes() {
    return this.allNotes;
  }
  addNoteForm: FormGroup = new FormGroup({
    title : new FormControl(null , [Validators.required]) ,
    desc : new FormControl(null , [Validators.required])
  })

  addNote() {
    let note = {
      title: this.addNoteForm.value.title,
      desc: this.addNoteForm.value.desc
    }
    if (this.addNoteForm.valid) {
      this.allNotes.push(note);
      this.getAllNotes();
      $("#addNote").modal("hide");
      this.addNoteForm.reset();
    }
    localStorage.setItem("notes", JSON.stringify(this.allNotes));
  }
  getNote(note:any) {
    let index = this.allNotes.indexOf(note);
    this.id = index;
  }
  deleteNote() {
    console.log(this.id);
    this.allNotes.splice(this.id , 1);
    $("#deleteNote").modal("hide");
    localStorage.setItem("notes", JSON.stringify(this.allNotes));
  }
  updateNoteForm: FormGroup = new FormGroup({
    title : new FormControl(null , [Validators.required]) ,
    desc : new FormControl(null , [Validators.required])
  })
  setNoteDetails(note:any) {
    let index = this.allNotes.indexOf(note);
    if (this.id == index) {
      this.updateNoteForm.controls['title'].setValue(note.title);
      this.updateNoteForm.controls['desc'].setValue(note.desc);
    }
  }

  updateNote() {
    let newNote = {
      title: this.updateNoteForm.value.title,
      desc: this.updateNoteForm.value.desc,
    }
    this.allNotes[this.id].title = newNote.title;
    this.allNotes[this.id].desc = newNote.desc;
    $("#editNote").modal("hide");
    this.getAllNotes();
    localStorage.setItem("notes", JSON.stringify(this.allNotes));
  }
}

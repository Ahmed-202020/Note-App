export interface AddNote {
  title: string ,
  desc:string ,
  userID: string,
  token: string
}
export interface DeleteNote {
  NoteID:string ,
  token:string
}
export interface UpdateNote {
  title: string ,
  desc:string ,
  NoteID: string,
  token: string
}

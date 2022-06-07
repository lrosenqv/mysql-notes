import axios from "axios";
import { INewNote } from "../models/INewNote";
import { INote } from "../models/INote";

let url = "http://localhost:4000/notes"

export class NoteService{
  async getNoteById(noteId: number){
    let response = await axios.get<INote[]>(`${url}/${noteId}`)
      .then(res => {
        return res.data
      })
    return response
  }

  async getFolderNotes(folderId: number){
    let response = await axios.get<INote[]>(`${url}/f/${folderId}`)
      .then(res => {
        return res.data
      })
    return response
  }

  async getNotesByUser(userId: number){
    let response = await axios.get<INote[]>(`${url}/u/${userId}`)
    .then(res => {
      return res.data
    })
    return response
  }

  createNote(newNote: INewNote, folderId: string){
    console.log(newNote, folderId);
    
    axios.post<INewNote>(`${url}/f/${folderId}`, newNote)
    .then(res => {
      console.log(res);
    })
  }

  changeNote(){}

  changeFolder(){}

  deleteNote(){}
}
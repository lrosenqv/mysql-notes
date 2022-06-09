import axios from "axios";
import { ICreateNote } from "../models/ICreateNote";
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

  createNote(newNote: ICreateNote){
    axios.post<INewNote>(`${url}/f/${newNote.folderId}`, {title: newNote.title, text: newNote.text})
    .then(res => {
      console.log(res);
    })
  }

  changeNote(noteId: number, noteChanges: ICreateNote){
    axios.put<ICreateNote>(`${url}/change/${noteId}`, noteChanges)
    .then(res => console.log(res))
  }

  changeFolder(noteId: number, newFolderId: number){
    let response = axios.put(`${url}/switchFolder/${noteId}`, {folderId: newFolderId})
    .then(res => {
      console.log(res);
      
      return res
    })
    .catch(err => console.error(err)
    )
    console.log(response);
    
    return response
  }

  deleteNote(noteId: number){
    axios.delete(`${url}/delete/${noteId}`)
    .then(res => {
      console.log(res.data);
      console.log(res.statusText);
      
    })
  }
}
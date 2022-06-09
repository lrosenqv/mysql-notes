import axios from "axios";
import { ICreateNote } from "../models/ICreateNote";
import { INewNote } from "../models/INewNote";
import { INote } from "../models/INote";

let url = "http://localhost:4000/notes"

export class NoteService{
  //Get one note by id
  async getNoteById(noteId: number){
    let response = await axios.get<INote[]>(`${url}/${noteId}`)
      .then(res => {
        return res.data
      })
    return response
  }

  //Get all notes in a folder
  async getNotesByFolder(folderId: number){
    let response = await axios.get<INote[]>(`${url}/f/${folderId}`)
      .then(res => {
        return res.data
      })
    return response
  }

  //Get all notes by user
  async getNotesByUser(userId: number){
    let response = await axios.get<INote[]>(`${url}/u/${userId}`)
    .then(res => {
      return res.data
    })
    return response
  }

  //Create new note
  createNote(newNote: ICreateNote){
    axios.post<INewNote>(`${url}/f/${newNote.folderId}`, {title: newNote.title, text: newNote.text})
    .then(res => {
      console.log(res);
    })
    .catch(err => console.error(err))
  }

  //Change values in note
  changeNote(noteId: number, noteChanges: ICreateNote){
    axios.put<ICreateNote>(`${url}/change/${noteId}`, noteChanges)
    .then(res => console.log(res))
    .catch(err => console.error(err))
  }

  //Change notes folder
  changeFolder(noteId: number, newFolderId: number){
    let response = axios.put(`${url}/switchFolder/${noteId}`, {folderId: newFolderId})
    .then(res => {
      return res
    })
    .catch(err => console.error(err))
    return response
  }

  //Delete one note
  deleteNote(noteId: number){
    axios.delete(`${url}/delete/${noteId}`)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.error(err))
  }
}
import axios from "axios";
import { INote } from "../models/INote";

let url = "http://localhost:4000/notes"

export class NoteService{
  getNoteById(){}

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

  createNote(){}

  changeNote(){}

  changeFolder(){}

  deleteNote(){}
}
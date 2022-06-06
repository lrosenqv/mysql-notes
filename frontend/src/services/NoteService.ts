import axios from "axios";
import { INote } from "../models/INote";

export class NoteService{
  getNoteById(){}

  async getFolderNotes(folderId: number){
    console.log(folderId);
    
    let response = await axios.get<INote[]>(`http://localhost:4000/notes/folder/${folderId}`)
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
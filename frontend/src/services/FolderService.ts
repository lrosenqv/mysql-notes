import axios from "axios";
import { IFolder } from "../models/IFolder";

export class FolderService{
  getFolderById(){}

  async getUserFolders(userId: number | string){
    let response = axios.get<IFolder[]>(`http://localhost:4000/folders/user/${userId}`)
      .then(res => {
        return res.data
      })
    return response
  }

  createFolder(){}

  changeFolder(){}

  deleteFolder(){}
}
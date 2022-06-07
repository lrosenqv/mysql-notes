import axios from "axios";
import { IFolder } from "../models/IFolder";
import { NewFolder } from "../models/NewFolder";

let url = "http://localhost:4000/folders"
let userId = localStorage.getItem('onlineUserKey') || "";

export class FolderService{
  getFolderById(){}

  async getUserFolders(userId: number){
    let response = axios.get<IFolder[]>(`${url}/u/${userId}`)
      .then(res => {
        return res.data
      })
    return response
  }

  createFolder(newFolder: NewFolder){
    axios.post<NewFolder>(`${url}/u/${JSON.parse(userId)}`, newFolder)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    })
  }

  async getFoldersById(folderId: number){
    let response = await axios.get<IFolder[]>(`${url}/all/${folderId}`)
    .then(res => {
      return res.data
    })
    return response
  }

  changeFolder(){}

  deleteFolder(){}
}
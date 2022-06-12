import axios from "axios";
import { IFolder } from "../models/IFolder";
import { NewFolder } from "../models/NewFolder";

let url = "http://localhost:4000/folders"
let userId = localStorage.getItem('onlineUserKey') || "";

export class FolderService{

  //GET folder by folderId
  async getFolderById(folderId: number){
    let response = await axios.get<IFolder[]>(`${url}/${folderId}`)
      .then(res => {
        return res.data
      })
    return response
  }

  //Get all folders by userId
  async getFoldersByUser(userId: number){
    let response = axios.get<IFolder[]>(`${url}/u/${userId}`)
      .then(res => {
        return res.data
      })
    return response
  }

  //Create new folder
  createFolder(newFolder: NewFolder){
    axios.post<NewFolder>(`${url}/u/${JSON.parse(userId)}`, newFolder)
    .then(res => {
      console.log(res.data);
    })
  }

  //Delete folder
  deleteFolder(folderId: number){
    axios.delete(`${url}/delete/${folderId}`)
    .then(res => {
      console.log(res);
    })
  }
}
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

  //Get all folders made by the user by one folderId
  async getFoldersById(folderId: number){
    let response = await axios.get<IFolder[]>(`${url}/all/${folderId}`)
    .then(res => {
      return res.data
    })
    return response
  }

  //Gett all folders by userId
  async getFoldersByUser(userId: number){
    let response = axios.get<IFolder[]>(`${url}/u/${userId}`)
      .then(res => {
        return res.data
      })
    return response
  }

  //Create new folder
  async createFolder(newFolder: NewFolder){
    let response = await axios.post<NewFolder>(`${url}/u/${JSON.parse(userId)}`, newFolder)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.error(err);
    })
    console.log(response);
    
    return response
  }

  //Delete folder
  deleteFolder(folderId: number){
    axios.delete(`${url}/delete/${folderId}`)
    .then(res => {
      console.log(res);
    })
  }
}
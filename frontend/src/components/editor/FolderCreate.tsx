import { FormEvent, useState } from "react"
import { NewFolder } from "../../models/NewFolder"
import { FolderService } from "../../services/FolderService"

const fService = new FolderService();

export const FolderCreate = () => {
  const [newFolder, setNewFolder] = useState<NewFolder>({title: ""})

  function create(e: FormEvent<HTMLFormElement>){
    e.preventDefault(); 
    fService.createFolder(newFolder)
    window.location.assign('/dashboard')
  }

  return(
    <form id="newFolderForm" onSubmit={(e) => create}>
      <label htmlFor="title">New Folder</label>
      <input type="text" name="title" placeholder="Title" onChange={(e) => { setNewFolder({...newFolder, title: e.target.value})}} />
      <button className="saveBtn">Save</button>
    </form>
  )
}
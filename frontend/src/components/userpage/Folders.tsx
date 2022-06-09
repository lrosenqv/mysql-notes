import { useEffect, useState } from "react";
import { IFolder } from "../../models/IFolder";
import { FolderService } from "../../services/FolderService";
import { NoteService } from "../../services/NoteService";
import { UserService } from "../../services/UserService";
import { FolderCreate } from "../editor/FolderCreate";
import "../../styles/dashboard.scss"

const fService = new FolderService();
const uService = new UserService();
const nService = new NoteService();

export const Folders = () => {
  const [folders, setFolders] = useState<IFolder[]>();
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    let userId = uService.getLSKey()
    fService.getUserFolders(userId)
    .then(res => {
      setFolders(res)      
    })
  }, [])

  function openFolder(id: number){
    window.location.assign(`/folder/${id}`)
  }

  let printFolders = folders?.map(folder => { 
    let createdDate = new Date(folder.createdDate).toLocaleDateString('En-EN', { weekday: "short", month: "long", day: "numeric", year: "2-digit" })
    return(<li className="folderListItem" key={folder.id} onClick={() => openFolder(folder.id)}>
      <p>{folder.title}</p>
      <div className="detailsHover">
        <p>{createdDate}</p>
      </div>
    </li>)
  })

  return(<>
      <ul id="folderList">
        <li onClick={() => setCreateOpen(true)} className="folderListItem createNewItem">
          <p>Create new...</p>
        </li>
        {printFolders}
      </ul>
    
    {createOpen && 
    <div className="bgBlur">
      <button className="closeBtn" type="button" onClick={() => setCreateOpen(false)}>Close</button>
      <FolderCreate />
    </div>
    }
  </>)
}
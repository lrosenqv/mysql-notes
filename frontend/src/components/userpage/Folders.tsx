import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IFolder } from "../../models/IFolder";
import { FolderService } from "../../services/FolderService";
import { NoteService } from "../../services/NoteService";
import { FolderCreate } from "./FolderCreate";

const fService = new FolderService();
const nService = new NoteService();

export const Folders = () => {
  const [folders, setFolders] = useState<IFolder[]>();
  const [createOpen, setCreateOpen] = useState(false);

  let ls = localStorage.getItem('onlineUserKey') || "";

  useEffect(() => {
    fService.getUserFolders(JSON.parse(ls))
    .then(res => {
      setFolders(res)      
    })
  }, [])

  function openFolder(id: number){
    window.location.assign(`/folder/${id}`)
  }

  let printFolders = folders?.map(folder => {
    let createdDate = new Date(folder.createdDate).toLocaleDateString('En-EN', { weekday: "short", month: "long", day: "numeric", year: "2-digit" })

    return(<li key={folder.id} className="listItem" onClick={() => openFolder(folder.id)}>
      <p>{folder.title}</p>
      <p>{createdDate}</p>
    </li>)
  })

  return(<>
    {!createOpen && 
      <ul>
        <li onClick={() => setCreateOpen(true)} className="listItem">
          <p>Create new...</p>
        </li>
        {printFolders}
      </ul>
    }
    
    {createOpen && <>
      <button onClick={() => setCreateOpen(false)}>Close</button>
      <FolderCreate />
    </>}
  </>)
}
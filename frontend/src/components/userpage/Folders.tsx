import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IFolder } from "../../models/IFolder";
import { FolderService } from "../../services/FolderService";
import { NoteService } from "../../services/NoteService";
import { FolderCreate } from "./FolderCreate";

const fService = new FolderService();
const nService = new NoteService();

export const Folders = () => {
  const [userId, setUserId] = useState<number>(0)
  const [folders, setFolders] = useState<IFolder[]>();

  let ls = localStorage.getItem('onlineUserKey') || ""


  useEffect(() => {
    fService.getUserFolders(ls)
    .then(res => {
      setFolders(res)      
    })
  }, [])

  const [createOpen, setCreateOpen] = useState(false);

  let printFolders = folders?.map(folder => {
    let createdDate = new Date(folder.createdDate).toLocaleDateString('En-EN', { weekday: "short", month: "long", day: "numeric", year: "2-digit" })

    return(<li key={folder.id}>
      <Link to={`/folder/${folder.id}`}>{folder.title}</Link>
      <span>{createdDate}</span>
    </li>)
  })


  return(<>
    <section>
      <ul>
        {printFolders}
        <li><button onClick={() => setCreateOpen(true)}>Create new...</button></li>
      </ul>
    </section>

    {createOpen && <>
      <button onClick={() => setCreateOpen(false)}>Close</button>
      <FolderCreate />
    </>}
  </>)
}
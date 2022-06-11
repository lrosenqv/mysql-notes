import { useContext, useState } from "react";
import { FolderCreate } from "../editor/FolderCreate";
import "../../styles/dashboard.scss"
import { Outlet, useNavigate } from "react-router-dom";
import { FoldersContext } from "./Dashboard";

export const Folders = () => {
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = useState<boolean>(false);
  const f = useContext(FoldersContext)

  let printfolders = f.map((folder) => {
    let createdDate = new Date(folder.createdDate).toLocaleDateString('En-EN', { weekday: "short", month: "long", day: "numeric", year: "2-digit" })
    return(<li className="folderListItem" key={folder.id} onClick={() => navigate(`/dashboard/folders/${folder.id}`)}>
      <p>{folder.title}</p>
      <div className="detailsHover">
        <p>{createdDate}</p>
      </div>
    </li>)
  })

  return(<>
    <ul id="folderList">
      <li onClick={() => setCreateOpen(true)} className="folderListItem createNewItem">
        <p>...New Folder</p>
      </li>
      {printfolders}
    </ul>

    <Outlet/>    

    {createOpen && 
    <div className="bgBlur">
      <FolderCreate />
      <button className="closeBtn" type="button" onClick={() => setCreateOpen(false)}>Close</button>
    </div>
    }
  </>)
}
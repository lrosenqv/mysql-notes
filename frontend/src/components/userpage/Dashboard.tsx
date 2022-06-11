import { createContext, useContext, useEffect, useState } from "react"
import "../../styles/dashboard.scss"
import { Outlet, useNavigate } from "react-router-dom"
import { IFolder } from "../../models/IFolder"
import { UserService } from "../../services/UserService"
import { FolderService } from "../../services/FolderService"

let uService = new UserService();
let fService = new FolderService();
const FoldersContext = createContext<IFolder[]>([])

export const Dashboard = () => {
  const navigate = useNavigate()
  const [showFolders, setShowFolders] = useState(true)
  const [showNotes, setShowNotes] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [folders, setFolders] = useState<IFolder[]>([]);
  
  useEffect(() => {
    if(window.location.href.endsWith("notes")){
      setShowNotes(true)
      setShowFolders(false)
    }
  }, [])

  useEffect(() => {
    let userId = uService.getLSKey()
    fService.getFoldersByUser(userId)
    .then(res => {
      setFolders(res)      
    })
  }, [])

  return(<>
  <section id="dashboard">
    <div className="tabs">
      <button type="button" onClick={() => { 
        navigate('/dashboard/folders');
        setShowFolders(true)
        setShowNotes(false)
        setShowEditor(false)
      }} className={showFolders ? "active" : ""}>Folders</button>
      
      <button type="button" onClick={() => {
        navigate('/dashboard/notes');
        setShowFolders(false); 
        setShowNotes(true);
        setShowEditor(false);
      }} className={showNotes ? "active" : ""}>Notes</button>

      <button type="button" onClick={() => {
        navigate('/dashboard/editor');
        setShowFolders(false); 
        setShowNotes(false);
        setShowEditor(true);
      }} className={showEditor ? "active" : ""}>Editor</button>
    </div>

    <FoldersContext.Provider value={folders}>
      <Outlet />
    </FoldersContext.Provider>
  </section>
  </>)
}
export {FoldersContext}  
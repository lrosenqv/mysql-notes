import { useEffect, useState } from "react"
import { FolderService } from "../../services/FolderService"
import { NoteService } from "../../services/NoteService"
import { Folders } from "./Folders"
import { Notes } from "./Notes"

const fService = new FolderService()
const nService = new NoteService()

let ls = localStorage.getItem('onlineUserKey') || "";

export const Dashboard = () => {
  const id: number = JSON.parse(ls)
  const [showFolders, setShowFolders] = useState(true)
  const [showNotes, setShowNotes] = useState(false)

  useEffect(() => {
    nService.getNotesByUser(id)
    .then(res => {
      
      
    })
    
    //nService.getNotesByUser
  }, [])

  return(<>
    <button type="button" onClick={() => {setShowFolders(true); setShowNotes(false)}}>Folders</button>
    <button type="button" onClick={() => {setShowFolders(false); setShowNotes(true)}}>Notes</button>
    
    {showFolders && <Folders />}
    {showNotes && <Notes />}
  </>)
}
import { useState } from "react"
import { Folders } from "./Folders"
import { Notes } from "./Notes"

export const Dashboard = () => {
  const [showFolders, setShowFolders] = useState(true)
  const [showNotes, setShowNotes] = useState(false)

  return(<>
    <button type="button" onClick={() => {setShowFolders(true); setShowNotes(false)}}>Folders</button>
    <button type="button" onClick={() => {setShowFolders(false); setShowNotes(true)}}>Notes</button>
    
    {showFolders && <Folders />}
    {showNotes && <Notes />}
  </>)
}
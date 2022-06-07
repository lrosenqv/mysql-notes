import { useState } from "react"
import { Folders } from "./Folders"
import { Notes } from "./Notes"
import "../../styles/dashboard.scss"

export const Dashboard = () => {
  const [showFolders, setShowFolders] = useState(true)
  const [showNotes, setShowNotes] = useState(false)

  return(<>
  <section>
    <div className="tabs">
      <button type="button" onClick={() => {setShowFolders(true); setShowNotes(false)}} className={showFolders ? "active" : ""}>Folders</button>
      <button type="button" onClick={() => {setShowFolders(false); setShowNotes(true)}} className={showNotes ? "active" : ""}>Notes</button>
    </div>
    
    {showFolders && <Folders />}
    {showNotes && <> <Notes /></>}
  </section>
  </>)
}
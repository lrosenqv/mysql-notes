import { useEffect, useState } from "react"
import { INote } from "../../models/INote"
import { NoteService } from "../../services/NoteService"
import { NoteEditor } from "./NoteEditor"

const nService = new NoteService();
let ls = localStorage.getItem('onlineUserKey') || "";

export const Notes = () => {
  const [editorOpen, setEditorOpen] = useState(false)
  const [notes, setNotes] = useState<INote[]>();

  useEffect(() => {
    nService.getNotesByUser(JSON.parse(ls))
    .then(res => {
      setNotes(res)
    })
  },[])

  function openNote(noteId: number){
    window.location.assign(`/note/${noteId}`)
  }

  let noteList = notes?.map(note => {
    return (
    <li key={note.id} className="listItem" onClick={() => openNote(note.id)}>
        <p>{note.title}</p>
        <p>{note.text}</p>
    </li>
    )
  })

  return(<>
    {!editorOpen && 
    <ul>
      <li className="listItem"><button onClick={() => setEditorOpen(true)}>Create new...</button></li>
      {noteList}
    </ul>
    }
    
    {editorOpen && <>
      <button onClick={() => setEditorOpen(false)}>Close</button>
      <NoteEditor />
    </>}
  </>)
}
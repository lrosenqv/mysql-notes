import { useEffect, useState } from "react"
import { INote } from "../../models/INote"
import { NoteService } from "../../services/NoteService"
import { UserService } from "../../services/UserService";
import { NoteEditor } from "../editor/NoteEditor"
import { Note } from "./Note";

const nService = new NoteService();
const uService = new UserService();

export const Notes = () => {
  const [editorOpen, setEditorOpen] = useState(false)
  const [notes, setNotes] = useState<INote[]>();
  const [showNote, setShowNote] = useState<INote>({
    id: 0,
    folderId: 0,
    title: "",
    text: "",
    createdDate: new Date()
  });
  const [noteOpen, setNoteOpen] = useState(false);

  useEffect(() => {
    let userId = uService.getLSKey() 
    nService.getNotesByUser(userId)
    .then(res => {
      setNotes(res)
    })
  },[])

  let noteList = notes?.map(note => {
    let createdDate = new Date(note.createdDate).toLocaleDateString('En-EN', { weekday: "short", month: "long", day: "numeric", year: "2-digit" })
    return (
    <li key={note.id} className="noteListItem" onClick={() => {
      setNoteOpen(true)
      setShowNote(note)
    }}><p>{note.title}</p>
      <div className="detailsHover">
        <p>{createdDate}</p>
      </div>
    </li>
    )
  })

  return(<>
    <ul id="noteList">
      <li className="noteListItem createNewItem" onClick={() => setEditorOpen(true)}>
        <p>...New Note</p>
      </li>
      {noteList}
    </ul>
    
    {editorOpen && <div className="bgBlur newNoteForm">
      <NoteEditor/>
      <button className="closeBtn" onClick={() => setEditorOpen(false)}>Close</button>
    </div>}


    {noteOpen && 
      <div className="bgBlur">
        <Note note={showNote} />
        <button className="closeBtn" type="button" onClick={() => setNoteOpen(false)}>Close</button>
      </div>
    }
  </>)
}
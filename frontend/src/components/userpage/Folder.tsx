import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { INote } from "../../models/INote"
import { FolderService } from "../../services/FolderService"
import { NoteService } from "../../services/NoteService"
import { NoteEditor } from "../editor/NoteEditor"
import { Note } from "./Note"

const nService = new NoteService()
const fService = new FolderService();

export const Folder = () => {
  const { id } = useParams();
  let folderId: number = Number(id);
  const [notes, setNotes] = useState<INote[]>();
  const [noteOpen, setNoteOpen] = useState(false);
  const [showNote, setShowNote] = useState<INote>({
    id: 0,
    folderId: 0,
    title: "",
    text: "",
    createdDate: new Date()
  });
  
  useEffect(() => {
    nService.getFolderNotes(folderId)
    .then(data => {
      setNotes(data)
    })

  }, [folderId])

  let printNotes = notes?.map(note => {
    return(
      <li key={note.id} id={note.id.toString()} className="listItem" onClick={() => {setNoteOpen(true); setShowNote(note)}}>
        <p>{note.title}</p>
      </li>
    )
  })

  return(<>
    <section>
      <ul>
        {printNotes}
      </ul>
    </section>

    {noteOpen && 
      <div className="bgBlur">
        <button className="closeBtn" type="button" onClick={() => setNoteOpen(false)}>Close</button>
        <Note note={showNote} />
      </div>
    }
  </>)
}
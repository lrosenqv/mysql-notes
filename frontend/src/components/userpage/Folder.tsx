import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { INote } from "../../models/INote"
import { FolderService } from "../../services/FolderService"
import { NoteService } from "../../services/NoteService"
import { NoteCreate } from "./NoteCreate"

const fService = new FolderService()
const nService = new NoteService()

export const Folder = () => {
  const { id } = useParams();
  let folderId: number = Number(id);
  const [notes, setNotes] = useState<INote[]>();
  const [noteCreateOpen, setNoteCreateOpen] = useState(false);

  useEffect(() => {
    nService.getFolderNotes(folderId)
    .then(data => {
      setNotes(data)
    })
  }, [folderId])

  function openNote(noteId: number){
    window.location.assign(`/note/${noteId}`)
  }

  let printNotes = notes?.map(note => {
    return(
      <li key={note.id} className="listItem" onClick={() => openNote(note.id)}>
        <p>{note.title}</p>
        <p>{note.text}</p>
      </li>
    )
  })

  return(<>
    <section>
      <ul>
        <li className="listItem" onClick={() => setNoteCreateOpen(true)}>
          <p>Create new...</p>
        </li>
        {printNotes}
      </ul>
    </section>

    {noteCreateOpen && <NoteCreate/>}
  </>)
}
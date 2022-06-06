import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { INote } from "../../models/INote"
import { FolderService } from "../../services/FolderService"
import { NoteService } from "../../services/NoteService"
import { Note } from "./Note"

const fService = new FolderService()
const nService = new NoteService()

export const Folder = () => {
  const { id } = useParams();
  let folderId: number = Number(id);
  const [notes, setNotes] = useState<INote[]>();
  const [showNote, setShowNote] = useState<INote>(Object);
  const [openNote, setOpenNote] =  useState(false);

  useEffect(() => {
    nService.getFolderNotes(folderId)
    .then(data => {
      setNotes(data)
    })
  }, [folderId])

  let printNotes = notes?.map(note => {
    return(
      <li key={note.id} onClick={() => {setShowNote(note); setOpenNote(true)}}>
        <p>{note.title}</p>
        <p>{note.text}</p>
      </li>
    )
  })


  return(<>
    <ul>
      {printNotes}
    </ul>
    {openNote && <>
      <Note note={showNote} />
      <button type="button" onClick={() => setOpenNote(false)}>Close</button>
    </>}
  </>)
}
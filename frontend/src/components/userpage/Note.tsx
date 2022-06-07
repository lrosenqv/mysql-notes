import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { INote } from "../../models/INote"
import { NoteService } from "../../services/NoteService"

const nService = new NoteService()

export const Note = () => {
  const { id } = useParams()
  let noteId = Number(id)
  const [note, setNote] = useState<INote>(Object)

  useEffect(() => {
    nService.getNoteById(noteId)
      .then(res => {
        setNote(res[0])        
      })
  }, [])

  return(<div>
    <h2>{note.title}</h2>
    <p>{note.text}</p>
  </div>)
}
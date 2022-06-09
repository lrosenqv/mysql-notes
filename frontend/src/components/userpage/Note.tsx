import { INote } from "../../models/INote"
import { INoteProps } from "../../models/INoteProps"
import { NoteService } from "../../services/NoteService"
import "../../styles/note.scss"

const nService = new NoteService();

export const Note = (props: INoteProps) => {
  let note: INote = props.note
  let createdDate = new Date(note.createdDate).toLocaleDateString('En-EN', { weekday: "short", month: "long", day: "numeric", year: "2-digit" })

  function deleteNote(){
    nService.deleteNote(note.id)
    window.location.assign('/notes')
  }

  return(
    <div className="note">
      <div className="noteBtns">
        <button className="editBtn" onClick={() => {window.location.assign(`/editor/${note.id}`)}}>Edit note</button>
        <button className="deleteBtn" onClick={deleteNote}>Delete</button>
      </div>
      <div className="noteDetails">
        <h2>{note.title}</h2> |
        <p>{createdDate}</p>
      </div>
      <div className="noteText" dangerouslySetInnerHTML={{__html: note.text}}></div>
  </div>)
}
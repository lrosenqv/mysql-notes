import { INote } from "../../models/INote"
import { INoteProps } from "../../models/INoteProps"
import "../../styles/note.scss"

export const Note = (props: INoteProps) => {
  let note: INote = props.note
  let createdDate = new Date(note.createdDate).toLocaleDateString('En-EN', { weekday: "short", month: "long", day: "numeric", year: "2-digit" })

  let textarea = document.querySelector(".noteText")

  if(textarea){
    textarea.innerHTML = note.text
  }
 
  return(
    <div className="note">
      <button className="editBtn" onClick={() => {window.location.assign(`/editor/${note.id}`)}}>Edit note</button>
      <div className="noteDetails">
        <h2>{note.title}</h2> |
        <p>{createdDate}</p>
      </div>
      <div className="noteText">{note.text}</div>
  </div>)
}
import { INoteProps } from "../../models/INoteProps"

export const Note = (props: INoteProps) => {
  let createdDate = new Date(props.note.createdDate).toLocaleDateString('En-EN', { weekday: "short", month: "long", day: "numeric", year: "2-digit" })

  return(<div>
    <h2>{props.note.title}</h2>
    <p>{props.note.text}</p>
    <span>{createdDate}</span>
  </div>)
}
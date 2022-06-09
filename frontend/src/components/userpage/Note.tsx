import { useState } from "react";
import { INote } from "../../models/INote"
import { INoteProps } from "../../models/INoteProps"
import { NoteService } from "../../services/NoteService"
import "../../styles/note.scss"
import { FolderSelect } from "../editor/FolderSelect";

const nService = new NoteService();

export const Note = (props: INoteProps) => {
  let note: INote = props.note
  let createdDate = new Date(note.createdDate).toLocaleDateString('En-EN', { weekday: "short", month: "long", day: "numeric", year: "2-digit" })
  const [selectedFolder, setSelectedFolder] = useState<number>(note.folderId);
  
  function deleteNote(){
    nService.deleteNote(note.id)
    window.location.assign('/notes')
  }

  return(<>
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
  </div>

  <div className="select-btn-wrapper">
      <select name="folderId" className="folderSelect" value={selectedFolder} onChange={(e) => setSelectedFolder(Number(e.target.value))}>
        {<FolderSelect/>}
      </select>
      <button id="saveFchangeBtn" onClick={(e) => {
        nService.changeFolder(note.id, selectedFolder)
        window.location.assign(`/folder/${selectedFolder}`)
      }}>Save</button>
    </div>
  </>)
}
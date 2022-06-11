import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { INote } from "../../models/INote"
import { INoteProps } from "../../models/INoteProps"
import { NoteService } from "../../services/NoteService"
import "../../styles/note.scss"
import { FolderSelect } from "../editor/FolderSelect";

const nService = new NoteService();

export const Note = (props: INoteProps) => {
  let navigate = useNavigate()
  let note: INote = props.note
  let createdDate = new Date(note.createdDate).toLocaleDateString('En-EN', { weekday: "short", month: "long", day: "numeric", year: "2-digit" })
  const [selectedFolder, setSelectedFolder] = useState<number>(note.folderId);
  
  function deleteNote(){
    nService.deleteNote(note.id)
    navigate(-1)
  }

  return(<>
    <div className="note">
      <div className="noteBtns">
        <button className="editBtn" onClick={() => {navigate(`/dashboard/editor/${note.id}`)}}>Edit note</button>
        <button className="deleteBtn" onClick={deleteNote}>Delete</button>
      </div>
      <div className="noteDetails">
        <h2 id="noteHeading">{note.title}</h2> |
        <p id="noteDate">{createdDate}</p>
      </div>
      <div className="noteText" dangerouslySetInnerHTML={{__html: note.text}}></div>
  </div>

  <div className="select-btn-wrapper">
      <select name="folderId" className="folderSelect" value={selectedFolder} onChange={(e) => setSelectedFolder(Number(e.target.value))}>
        {<FolderSelect/>}
      </select>
      <button id="saveFchangeBtn" onClick={(e) => {
        nService.changeFolder(note.id, selectedFolder)
        navigate(`/dashboard/folders/${selectedFolder}`, {replace: true})
      }}>Save</button>
    </div>
  </>)
}
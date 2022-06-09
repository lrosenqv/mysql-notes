import { useEffect, useState } from "react"
import { INote } from "../../models/INote"
import { NoteService } from "../../services/NoteService"
import { UserService } from "../../services/UserService";
import { FolderSelect } from "../editor/FolderSelect";
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
  const [selectedFolder, setSelectedFolder] = useState<number>(0);

  useEffect(() => {
    let userId = uService.getLSKey() 
    nService.getNotesByUser(userId)
    .then(res => {
      setNotes(res)
    })

    if(showNote){
      setSelectedFolder(showNote.folderId)
    }
  },[noteOpen, showNote, selectedFolder])

  let noteList = notes?.map(note => {
    return (
    <li key={note.id} className="noteListItem" onClick={() => {
      setNoteOpen(true)
      setShowNote(note)
      setSelectedFolder(note.folderId)
    }}>
        <p>{note.title}</p>
    </li>
    )
  })

  return(<>
    <ul id="noteList">
      <li className="noteListItem" onClick={() => setEditorOpen(true)}>
        <p>Create new...</p>
      </li>
      {noteList}
    </ul>
    
    {editorOpen && <div className="bgBlur newNoteForm">
      <button onClick={() => setEditorOpen(false)}>Close</button>
      <NoteEditor/> 
    </div>}


    {noteOpen && 
      <div className="bgBlur">
        <div className="select-btn-wrapper">
          <button className="closeBtn" type="button" onClick={() => setNoteOpen(false)}>Close</button>
          <select name="folderId" className="folderSelect" value={selectedFolder} onChange={(e) => {setSelectedFolder(Number(e.target.value))}}>{<FolderSelect/>}</select>
          <button id="saveFchangeBtn" onClick={(e) => {
            nService.changeFolder(showNote.id, selectedFolder)
            window.location.assign(`/folder/${selectedFolder}`)
          }}>Save</button>
        </div>
        <Note note={showNote} />
      </div>
    }
  </>)
}
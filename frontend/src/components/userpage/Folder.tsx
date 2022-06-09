import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IFolder } from "../../models/IFolder"
import { INote } from "../../models/INote"
import { FolderService } from "../../services/FolderService"
import { NoteService } from "../../services/NoteService"
import { FolderSelect } from "../editor/FolderSelect"
import { Note } from "./Note"

const nService = new NoteService()
const fService = new FolderService();

export const Folder = () => {
  const { id } = useParams();
  let folderId: number = Number(id);
  const [selectedFolder, setSelectedFolder] = useState<number>(folderId);
  const [folder, setFolder] = useState<IFolder>({
    id: 0,
    userId: 0,
    title: "",
    createdDate: new Date
  })
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

  useEffect(() => {
    if(id){
      setSelectedFolder(folderId)
      fService.getFolderById(folderId)
        .then(res => {
          setFolder(res[0])
      })
    }
  }, [id, noteOpen])
  
  let printNotes = notes?.map(note => {
    return(
      <li key={note.id} id={note.id.toString()} className="noteListItem" onClick={() => {setNoteOpen(true); setShowNote(note)}}>
        <p>{note.title}</p>
      </li>
    )
  })

  return(<>
    <section>
      <h2>{folder.title}</h2>
      <button type="submit" onClick={() => window.location.assign('/dashboard/folders')}>Back to folders</button>
      <ul id="noteList">
        {printNotes}
      </ul>
    </section>

    {noteOpen && 
      <div className="bgBlur">
        <div className="select-btn-wrapper">
          <button className="closeBtn" type="button" onClick={() => setNoteOpen(false)}>Close</button>
          <select name="folderId" className="folderSelect" value={selectedFolder} onChange={(e) => setSelectedFolder(Number(e.target.value))}>
            {<FolderSelect/>}
          </select>
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
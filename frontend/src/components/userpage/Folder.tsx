import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IFolder } from "../../models/IFolder"
import { INote } from "../../models/INote"
import { FolderService } from "../../services/FolderService"
import { NoteService } from "../../services/NoteService"
import { Note } from "./Note"

const nService = new NoteService()
const fService = new FolderService();

export const Folder = () => {
  const { id } = useParams();
  let folderId: number = Number(id);
  const [folder, setFolder] = useState<IFolder>({
    id: 0,
    userId: 0,
    title: "",
    createdDate: new Date()
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
    if(id){
      fService.getFolderById(folderId)
        .then(res => {
        setFolder(res[0])
      })
    nService.getNotesByFolder(folderId)
      .then(data => {
        setNotes(data)
      })
    }
  }, [id, noteOpen, folderId])
  
  let printNotes = notes?.map(note => {
    let createdDate = new Date(note.createdDate).toLocaleDateString('En-EN', { weekday: "short", month: "long", day: "numeric", year: "2-digit" })
    return(
      <li key={note.id} className="noteListItem" onClick={() => {setNoteOpen(true); setShowNote(note)}}>
        <p>{note.title}</p>
        <div className="detailsHover">
        <p>{createdDate}</p>
      </div>
      </li>
    )
  })

  return(<>
    <section className="dashboard">
    <button className="backBtn" onClick={() => window.location.assign('/dashboard')}>Back to folders</button>
      <h2>{folder.title}</h2>
      <button className="deleteFolderBtn" onClick={() => {
        fService.deleteFolder(folder.id)
        window.location.assign('/dashboard')
        }}>Delete folder</button>
      <ul id="noteList">
        {printNotes}
      </ul>
    </section>

    {noteOpen && 
      <div className="bgBlur">
        <Note note={showNote} />
        <button className="closeBtn" type="button" onClick={() => setNoteOpen(false)}>Close</button>
      </div>
    }
  </>)
}
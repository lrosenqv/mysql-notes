import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { IFolder } from "../../models/IFolder"
import { INote } from "../../models/INote"
import { FolderService } from "../../services/FolderService"
import { NoteService } from "../../services/NoteService"
import { NoteEditor } from "../editor/NoteEditor"
import { FoldersContext } from "./Dashboard"
import { Note } from "./Note"

const nService = new NoteService()
const fService = new FolderService();

export const Folder = () => {
  const navigate = useNavigate();
  const folders = useContext(FoldersContext)

  const { fId } = useParams();
  let folderId: number = Number(fId);
  const [folder, setFolder] = useState<IFolder>({
    id: 0,
    userId: 0,
    title: "",
    createdDate: new Date()
  })

  const [notes, setNotes] = useState<INote[]>();
  const [noteOpen, setNoteOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [showNote, setShowNote] = useState<INote>({
    id: 0,
    folderId: 0,
    title: "",
    text: "",
    createdDate: new Date()
  });

  useEffect(() => {
    let findFolder = folders.find((folder) => {
      return folderId === folder.id
    })
    if(findFolder){
      setFolder(findFolder)
      nService.getNotesByFolder(findFolder.id)
      .then(res => {
        setNotes(res)
      })
    }
  }, [folderId, folders])

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
    <div className="bgBlur">
      <button className="backBtn" onClick={() => navigate(-1)}>Back to folders</button>
      <h2>{folder.title}</h2>
      <button className="deleteFolderBtn" onClick={() => {
        fService.deleteFolder(folder.id)
        navigate('/dashboard/folders', {replace: true})
      }}>Delete folder</button>
      <ul id="noteList">
        <li className="noteListItem createNewItem" onClick={() => setEditorOpen(true)}>
          <p>...New Note</p>
        </li>
        {printNotes}
      </ul>
    </div>

    {noteOpen && 
      <div className="bgBlur">
        <Note note={showNote} />
        <button className="closeBtn" type="button" onClick={() => setNoteOpen(false)}>Close</button>
      </div>
    }

    {editorOpen &&
      <div className="bgBlur">
        <NoteEditor />
        <button className="closeBtn" type="button" onClick={() => setEditorOpen(false)}>Close</button>
      </div>
    }
  </>)
}
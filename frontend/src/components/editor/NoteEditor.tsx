import { FormEvent, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { FolderService } from "../../services/FolderService";
import { NoteService } from "../../services/NoteService";
import { UserService } from "../../services/UserService";
import { FolderSelect } from "./FolderSelect";
import { ICreateNote } from "../../models/ICreateNote";
import { INote } from "../../models/INote";
import "../../styles/editor.scss"

const nService = new NoteService();
const uService = new UserService();
const fService = new FolderService();

export const NoteEditor = () => { 
  const { nId } = useParams();
  const [changeNote, setChangeNote] = useState(false)

  const [orgNote, setOrgNote] = useState<INote>({
    id: 0,
    folderId: 0,
    title: "",
    text: "",
    createdDate: new Date()
  })

  const [noteChanges, setNoteChanges] = useState<ICreateNote>({
    folderId: orgNote.id,
    title: orgNote.title,
    text: orgNote.text
  })


  useEffect(() => {
    if(nId){
      nService.getNoteById(Number(nId))
      .then(res => {   
        setChangeNote(true)        
        setOrgNote(res[0])
        setNoteChanges({...noteChanges, folderId: res[0].folderId, title: res[0].title, text: res[0].text})
      })
    } else {
      let userId = uService.getLSKey()
      fService.getFoldersByUser(userId)
      .then(res => {
        setNoteChanges({...noteChanges, folderId: res[0].id})
      })
    }
    console.log(orgNote.text)
  }, [nId, noteChanges, orgNote.text])

  function updateNote(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    nService.changeNote(orgNote.id, noteChanges)
    window.location.assign(`/folder/${noteChanges.folderId}`)
  }

  function createNote(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    nService.createNote(noteChanges)
    window.location.assign('/dashboard/notes')
  }
  
  return(
    <>
      {changeNote &&
        <section id="showNoteChanges"> 
          <h2>Original</h2>
          <div id="originalNote" dangerouslySetInnerHTML={{__html: orgNote.text}}></div>
          <h2>With changes</h2>
          <div id="changedNote" dangerouslySetInnerHTML={{__html: noteChanges.text}}></div>
        </section> 
      }
      
        <form id="noteEditor" onSubmit={(e) => {changeNote ? updateNote(e) : createNote(e)}}>
          <div className="input-select-wrapper">
            <input type="text" value={noteChanges.title} name="title" placeholder="Title" onChange={(e) => {setNoteChanges({...noteChanges, title: e.target.value})}}/>
            <select value={noteChanges.folderId} onChange={(e) => setNoteChanges({...noteChanges, folderId: Number(e.target.value)})}>
              <FolderSelect/>
            </select>
          </div>
          <ReactQuill onChange={(editor) => { setNoteChanges({...noteChanges, text: editor})}}></ReactQuill>
          <button className="saveBtn" type="submit">Save</button>
        </form>
      </>
  )
}
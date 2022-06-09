import { FormEvent, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { ICreateNote } from "../../models/ICreateNote";
import { INote } from "../../models/INote";
import { FolderService } from "../../services/FolderService";
import { NoteService } from "../../services/NoteService";
import "../../styles/editor.scss"
import { FolderSelect } from "./FolderSelect";

const nService = new NoteService()

export const NoteEditor = () => { 
  const { nId } = useParams();
  const [changeNote, setChangeNote] = useState(false)
  let orgNote: INote;
  const [orgText, setOrgText] = useState<string>("")
  let [orgId, setOrgId] = useState<number>(0);

  const [noteChanges, setNoteChanges] = useState<ICreateNote>({
    folderId: 0,
    title: "",
    text: ""
  })

  useEffect(() => {
    if(nId){
      nService.getNoteById(Number(nId))
      .then(res => {
        orgNote = res[0];      
        setChangeNote(true)        
        setOrgText(orgNote.text)
        setOrgId(orgNote.id)
        setNoteChanges({...noteChanges, folderId: orgNote.folderId, title: orgNote.title, text: orgNote.text})
      })
    }
  }, [])
  function updateNote(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    nService.changeNote(orgId, noteChanges)
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
          <div id="originalNote" dangerouslySetInnerHTML={{__html: orgText}}></div>
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
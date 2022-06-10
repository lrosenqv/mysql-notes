import { FormEvent, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { NoteService } from "../../services/NoteService";
import { FolderSelect } from "./FolderSelect";
import { ICreateNote } from "../../models/ICreateNote";
import { INote } from "../../models/INote";
import "../../styles/editor.scss"

const nService = new NoteService();

export const NoteEditor = () => {
  const {id} = useParams()
  const { nId } = useParams();
  const [changeNote, setChangeNote] = useState(false)
  const [orgNote, setOrgNote] = useState<INote>(Object)

  const [noteChanges, setNoteChanges] = useState<ICreateNote>({
    folderId: 0,
    title: "",
    text: ""
  })

  useEffect(() => {
    if(nId !== undefined ){
      setChangeNote(true)    
      let getNote = nService.getNoteById(Number(nId))
      .then(res => {   
        return res[0]    
      })  
      getNote.then(res => {
        setOrgNote((orgNote) => orgNote = res)
      })
    } 
  }, [nId])


  useEffect(() => {
    if(orgNote.folderId !== undefined){
      setNoteChanges((n) => n = orgNote)
    } else {
      let obj: ICreateNote = {folderId: Number(id), title: "", text: ""}
      setNoteChanges((n) => n = obj)
    }
  }, [nId, id, orgNote])


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
            <input type="text" defaultValue={noteChanges.title} name="title" placeholder="Title" onChange={(e) => {console.log(noteChanges);setNoteChanges({...noteChanges, title: e.target.value})}}/>
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
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { INewNote } from "../../models/INewNote";
import "../../styles/editor.scss"
import { FolderSelect } from "./FolderSelect";

export const NoteEditor = () => { 
  const { id } = useParams()
  const [newNote, setNewNote] = useState<INewNote>({
    title: "",
    text: ""
  });
  const [selectedFolder, setSelectedFolder] = useState<number>(0)

  useEffect(() => {
    if(id){
      setSelectedFolder(Number(id))
    } 
  }, [id])

  return(
    <>
      <form id="noteEditor">
        <input type="text" name="title" placeholder="Title" onChange={(e) => {setNewNote({...newNote, title: e.target.value})}}/>
        <select>
          <FolderSelect folderId={selectedFolder}/>
        </select>
        <ReactQuill onChange={(editor) => {setNewNote({...newNote, text: editor})}}></ReactQuill>
        <button>Save</button>
      </form>
    </>
  )
}
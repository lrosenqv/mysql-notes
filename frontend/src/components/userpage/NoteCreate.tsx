import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { IFolder } from "../../models/IFolder"
import { INewNote } from "../../models/INewNote";
import { FolderService } from "../../services/FolderService";
import { NoteService } from "../../services/NoteService";

const nService = new NoteService()
const fService = new FolderService()

export const NoteCreate = () => {
  const { id } = useParams()
  const [folderId, setFolderId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [selectedFolder, setSelectedFolder] = useState<any>(id);
  const [userFolders, setUserFolders] = useState<IFolder[]>();
  const [newNote, setNewNote] = useState<INewNote>({
    title: "",
    text: ""
  });

  useEffect(() => {
    if(id){
      let nmbr = Number(id)
      setFolderId(nmbr)

      fService.getFoldersById(nmbr)
        .then(res => {
          setUserFolders(res)
        })
    }   
  }, [])

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>){
    let name = e.target.name
    setNewNote({...newNote, [name]: e.target.value})
  }

  function createNote(e: FormEvent<HTMLFormElement>){
    console.log(selectedFolder, newNote);
    
    e.preventDefault()
    nService.createNote(newNote, selectedFolder)
    window.location.assign('/dashboard')
  }

  let selectOpt = userFolders?.map(folder => {
    return(<option key={folder.id} value={folder.id}>
      {folder.title}
    </option>)
  })

  return(<>
    <form onSubmit={createNote}>
        <select name="folderId" onChange={(e) => setSelectedFolder(e.target.value)}>{selectOpt}</select>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} />
        <input type="text" name="text" placeholder="Notes notes notes" onChange={handleChange} />
        <button>Save changes</button>
      </form>
  </>)
}
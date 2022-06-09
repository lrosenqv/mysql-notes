import { useEffect, useState } from "react"
import { IFolder } from "../../models/IFolder"
import { FolderService } from "../../services/FolderService"
import { UserService } from "../../services/UserService"

const fService = new FolderService()
const uService = new UserService()

//Get all folders for select in form
export const FolderSelect = () => {
  const [folders, setFolders] = useState<IFolder[]>()
  
  useEffect(() => {
    let userId = uService.getLSKey()
    fService.getFoldersByUser(userId)
    .then(res => {
      setFolders(res)
    })
  }, [])

  let folderOpt = folders?.map(folder => {
    return(<option key={folder.id} value={folder.id.toString()}>
      {folder.title}
    </option>
    )
  })
  
  return(<>
      {folderOpt}
  </>)
}
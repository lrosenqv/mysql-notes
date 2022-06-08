import { useEffect, useState } from "react"
import { IFolder } from "../../models/IFolder"
import { IFolderProps } from "../../models/IFolderProps"
import { FolderService } from "../../services/FolderService"
import { UserService } from "../../services/UserService"

const fService = new FolderService()
const uService = new UserService()

export const FolderSelect = (props: IFolderProps) => {
  const [folders, setFolders] = useState<IFolder[]>()
  
  useEffect(() => {
    let userId = uService.getLSKey()
    fService.getUserFolders(userId)
    .then(res => {
      setFolders(res)
    })
  }, [])

  let folderOpt = folders?.map(folder => {
    return(<><option key={folder.id} value={folder.id}>
      {folder.title}
    </option>
    {props.folderId === folder.id && <option key={folder.id} value={folder.id} selected>
      {folder.title}
    </option>}
    </>)
  })
  
  return(<>
    {folderOpt}
  </>)
}
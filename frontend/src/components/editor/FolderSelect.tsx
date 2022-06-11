import { useContext } from "react"
import { FoldersContext } from "../userpage/Dashboard"

//Get all folders for select in form
export const FolderSelect = () => {
  const folders = useContext(FoldersContext);
  
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
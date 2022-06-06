import { useState } from "react"
import { NoteEditor } from "./NoteEditor"

export const Notes = () => {
  const [editorOpen, setEditorOpen] = useState(false)

  return(<>
    <ul>
      <li>Jag är en anteckkning</li>
      <li>Jag är också en anteckkning</li>
      <li>Jag är en tredje anteckkning</li>
      <li><button onClick={() => setEditorOpen(true)}>Create new...</button></li>
    </ul>

    {editorOpen && <>
      <button onClick={() => setEditorOpen(false)}>Close</button>
      <NoteEditor />
    </>}
  </>)
}
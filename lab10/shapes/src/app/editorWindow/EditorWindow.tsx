import {useCallback} from 'react'
import {type Document} from '../../model/Document'
import {type ShapeType} from '../../model/types'
import {CanvasView} from '../canvasView/CanvasView'
import {Toolbar} from '../toolbar/Toolbar'
import {useEditor} from '../viewmodel/useEditor'

interface EditorWindowProps {
	document: Document,
	title: string,
}

function EditorWindow({
	document,
	title,
}: EditorWindowProps) {
	const editor = useEditor(document)
	const hasSelection = !!editor.state.selectedId

	const handleAdd = useCallback((type: ShapeType) => {
		editor.addShape(type)
	}, [editor])

	const handleDelete = useCallback(() => {
		editor.deleteSelection()
	}, [editor])

	return (
		<div className="editor-window">
			<Toolbar
				title={title}
				hasSelection={hasSelection}
				onAdd={handleAdd}
				onDelete={handleDelete}
			/>
			<CanvasView
				state={editor.state}
				onDeleteRequest={handleDelete}
				onMouseDown={editor.mouseDown}
				onMouseMove={editor.mouseMove}
				onMouseUp={editor.mouseUp}
				setCanvasLimits={editor.setCanvasLimits}
			/>
		</div>
	)
}

export {
	EditorWindow,
}

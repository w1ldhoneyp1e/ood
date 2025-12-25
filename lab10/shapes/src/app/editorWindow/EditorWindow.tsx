import {useEffect} from 'react'
import {type Document} from '../../model/Document'
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

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
				event.preventDefault()
				if (editor.canUndo()) {
					editor.undo()
				}
			}
			else if ((event.ctrlKey || event.metaKey) && (event.key === 'y' || (event.key === 'z' && event.shiftKey))) {
				event.preventDefault()
				if (editor.canRedo()) {
					editor.redo()
				}
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [editor])

	return (
		<div className="editor-window">
			<Toolbar
				title={title}
				hasSelection={hasSelection}
				canUndo={editor.canUndo()}
				canRedo={editor.canRedo()}
				onAdd={editor.addShape}
				onDelete={editor.deleteSelection}
				onUndo={editor.undo}
				onRedo={editor.redo}
			/>
			<CanvasView
				state={editor.state}
				onDeleteRequest={editor.deleteSelection}
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

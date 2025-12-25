import {useMemo} from 'react'
import {EditorWindow} from './app/editorWindow/EditorWindow'
import {Document as ModelDocument} from './model/Document'
import './styles.css'

function App() {
	const document = useMemo(() => new ModelDocument(), [])

	return (
		<div className="app">
			<EditorWindow document={document} title="Редактор A" />
			<EditorWindow document={document} title="Редактор B" />
		</div>
	)
}

export {
	App,
}

import {Document as ModelDocument} from './model/Document'
import './styles.css'
import {EditorWindow} from './view/EditorWindow'

function App() {
	const document = new ModelDocument()

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

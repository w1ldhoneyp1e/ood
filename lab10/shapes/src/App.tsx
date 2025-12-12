import {DocumentModel} from './model/DocumentModel'
import {EditorPresenter} from './presenter/EditorPresenter'
import './styles.css'
import {EditorWindow} from './view/EditorWindow'

function App() {
	const document = new DocumentModel()
	const presenterA = new EditorPresenter(document)
	const presenterB = new EditorPresenter(document)

	return (
		<div className="app">
			<EditorWindow presenter={presenterA} title="Редактор A" />
			<EditorWindow presenter={presenterB} title="Редактор B" />
		</div>
	)
}

export {
	App,
}


import {type IDocumentItem} from './IDocumentItem'

interface IDocument {
	insertParagraph: (text: string, position?: number) => IDocumentItem,
	insertImage: (path: string, width: number, height: number, position?: number) => IDocumentItem,
	getItemsCount: () => number,
	getItem: (index: number) => IDocumentItem,
	deleteItem: (index: number) => void,
	getTitle: () => string,
	setTitle: (title: string) => void,
	canUndo: () => boolean,
	undo: () => void,
	canRedo: () => boolean,
	redo: () => void,
	save: (path: string) => void,
}

export {
	IDocument,
}

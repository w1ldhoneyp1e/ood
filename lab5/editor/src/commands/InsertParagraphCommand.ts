import {type ICommand} from '../interfaces/ICommand'
import {type IDocument} from '../interfaces/IDocument'
import {type IDocumentItem} from '../interfaces/IDocumentItem'

class InsertParagraphCommand implements ICommand {
	private document: IDocument
	private text: string
	private position: number
	private insertedItem: IDocumentItem | null = null

	constructor(document: IDocument, text: string, position: number) {
		if (position < 0 || position > document.getItemsCount()) {
			throw new Error(`Некорректная позиция. Допустимый диапазон: 0-${document.getItemsCount()}`)
		}

		this.document = document
		this.text = text
		this.position = position
	}

	execute(): void {
		this.insertedItem = this.document.insertParagraph(this.text, this.position)
	}

	undo(): void {
		if (this.insertedItem) {
			this.document.deleteItem(this.position)
		}
	}
}

export {
	InsertParagraphCommand,
}

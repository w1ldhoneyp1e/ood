/* eslint-disable max-params */
import {type ICommand} from '../interfaces/ICommand'
import {type IDocument} from '../interfaces/IDocument'
import {type IDocumentItem} from '../interfaces/IDocumentItem'

class InsertImageCommand implements ICommand {
	private document: IDocument
	private path: string
	private width: number
	private height: number
	private position: number
	private insertedItem: IDocumentItem | null = null

	constructor(document: IDocument, path: string, width: number, height: number, position: number) {
		this.document = document
		this.path = path
		this.width = width
		this.height = height
		this.position = position
	}

	execute(): void {
		this.insertedItem = this.document.insertImage(this.path, this.width, this.height, this.position)
	}

	undo(): void {
		if (this.insertedItem) {
			this.document.deleteItem(this.position)
		}
	}
}

export {
	InsertImageCommand,
}

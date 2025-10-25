/* eslint-disable max-params */
import {type ICommand} from '../interfaces/ICommand'
import {type IDocument} from '../interfaces/IDocument'
import {type IDocumentItem} from '../interfaces/IDocumentItem'
import {copyImageFile, deleteImageFile} from '../utils/ImageFileManager'

class InsertImageCommand implements ICommand {
	private document: IDocument
	private originalPath: string
	private copiedPath: string | null = null
	private width: number
	private height: number
	private position: number
	private insertedItem: IDocumentItem | null = null

	constructor(document: IDocument, path: string, width: number, height: number, position: number) {
		this.document = document
		this.originalPath = path
		this.width = width
		this.height = height
		this.position = position
	}

	execute(): void {
		this.copiedPath = copyImageFile(this.originalPath)
		this.insertedItem = this.document.insertImage(this.copiedPath, this.width, this.height, this.position)
	}

	undo(): void {
		if (this.insertedItem && this.copiedPath) {
			this.document.deleteItem(this.position)

			deleteImageFile(this.copiedPath)
			this.copiedPath = null
		}
	}
}

export {
	InsertImageCommand,
}

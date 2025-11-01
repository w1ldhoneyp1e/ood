/* eslint-disable max-params */
import {type ICommand} from '../interfaces/ICommand'
import {type IDocument} from '../interfaces/IDocument'
import {type IDocumentItem} from '../interfaces/IDocumentItem'
import {
	copyImageFile,
	deleteImageFile,
	fileExists,
} from '../utils/ImageFileManager'

class InsertImageCommand implements ICommand {
	private document: IDocument
	private originalPath: string
	private copiedPath: string | null = null
	private width: number
	private height: number
	private position: number
	private insertedItem: IDocumentItem | null = null

	constructor(document: IDocument, path: string, width: number, height: number, position: number) {
		if (!fileExists(path)) {
			throw new Error(`Файл изображения не найден: ${path}`)
		}

		if (position < 0 || position > document.getItemsCount()) {
			throw new Error(`Некорректная позиция. Допустимый диапазон: 0-${document.getItemsCount()}`)
		}

		if (width <= 0 || height <= 0) {
			throw new Error(`Некорректные размеры изображения: ширина и высота должны быть больше 0`)
		}

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

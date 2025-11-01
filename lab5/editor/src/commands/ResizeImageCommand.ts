import {type ICommand} from '../interfaces/ICommand'
import {type IDocument} from '../interfaces/IDocument'
import {type IImage} from '../interfaces/IImage'

class ResizeImageCommand implements ICommand {
	private document: IDocument
	private newWidth: number
	private newHeight: number
	private oldWidth: number
	private oldHeight: number
	private image: IImage | null = null

	constructor(document: IDocument, position: number, width: number, height: number) {
		if (position < 0 || position >= document.getItemsCount()) {
			throw new Error(`Некорректная позиция. Допустимый диапазон: 0-${document.getItemsCount() - 1}`)
		}

		if (width <= 0 || height <= 0) {
			throw new Error(`Некорректные размеры изображения: ширина и высота должны быть больше 0`)
		}

		this.document = document
		this.newWidth = width
		this.newHeight = height

		const item = this.document.getItem(position)
		this.image = item.getImage()

		if (!this.image) {
			throw new Error('Элемент не является изображением')
		}

		this.oldWidth = this.image.getWidth()
		this.oldHeight = this.image.getHeight()
	}

	execute(): void {
		if (this.image) {
			this.image.resize(this.newWidth, this.newHeight)
		}
	}

	undo(): void {
		if (this.image) {
			this.image.resize(this.oldWidth, this.oldHeight)
		}
	}

}

export {
	ResizeImageCommand,
}

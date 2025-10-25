import {type ICommand} from '../interfaces/ICommand'
import {type IDocument} from '../interfaces/IDocument'
import {type IImage} from '../interfaces/IImage'

class ResizeImageCommand implements ICommand {
	private document: IDocument
	private position: number
	private newWidth: number
	private newHeight: number
	private oldWidth: number
	private oldHeight: number
	private image: IImage | null = null

	constructor(document: IDocument, position: number, width: number, height: number) {
		this.document = document
		this.position = position
		this.newWidth = width
		this.newHeight = height

		const item = this.document.getItem(position)
		this.image = item.getImage()
		this.oldWidth = this.image?.getWidth() || 0
		this.oldHeight = this.image?.getHeight() || 0
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

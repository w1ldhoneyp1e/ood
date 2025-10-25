import {type ICommand} from '../interfaces/ICommand'
import {type IDocument} from '../interfaces/IDocument'
import {type IDocumentItem} from '../interfaces/IDocumentItem'

class DeleteItemCommand implements ICommand {
	private document: IDocument
	private position: number
	private deletedItem: IDocumentItem | null = null

	constructor(document: IDocument, position: number) {
		this.document = document
		this.position = position
	}

	execute(): void {
		this.deletedItem = this.document.getItem(this.position)
		this.document.deleteItem(this.position)
	}

	undo(): void {
		if (this.deletedItem) {
			const paragraph = this.deletedItem.getParagraph()
			const image = this.deletedItem.getImage()

			if (paragraph) {
				this.document.insertParagraph(paragraph.getText(), this.position)
			}
			else if (image) {
				this.document.insertImage(image.getPath(), image.getWidth(), image.getHeight(), this.position)
			}
		}
	}
}

export {
	DeleteItemCommand,
}

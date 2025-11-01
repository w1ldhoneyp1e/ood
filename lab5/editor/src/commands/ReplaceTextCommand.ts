import {type ICommand} from '../interfaces/ICommand'
import {type IDocument} from '../interfaces/IDocument'
import {type IParagraph} from '../interfaces/IParagraph'

class ReplaceTextCommand implements ICommand {
	private document: IDocument
	private newText: string
	private oldText: string
	private paragraph: IParagraph | null = null

	constructor(document: IDocument, position: number, text: string) {
		if (position < 0 || position >= document.getItemsCount()) {
			throw new Error(`Некорректная позиция. Допустимый диапазон: 0-${document.getItemsCount() - 1}`)
		}

		this.document = document
		this.newText = text

		const item = this.document.getItem(position)
		this.paragraph = item.getParagraph()

		if (!this.paragraph) {
			throw new Error('Элемент не является параграфом')
		}

		this.oldText = this.paragraph.getText()
	}

	execute(): void {
		if (this.paragraph) {
			this.paragraph.setText(this.newText)
		}
	}

	undo(): void {
		if (this.paragraph) {
			this.paragraph.setText(this.oldText)
		}
	}
}

export {
	ReplaceTextCommand,
}

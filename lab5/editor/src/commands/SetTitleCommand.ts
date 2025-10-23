import {type ICommand} from '../interfaces/ICommand'
import {type IDocument} from '../interfaces/IDocument'

class SetTitleCommand implements ICommand {
	private document: IDocument
	private newTitle: string
	private oldTitle: string

	constructor(document: IDocument, title: string) {
		this.document = document
		this.newTitle = title
		this.oldTitle = document.getTitle()
	}

	execute(): void {
		this.document.setTitle(this.newTitle)
	}

	undo(): void {
		this.document.setTitle(this.oldTitle)
	}

}

export {
	SetTitleCommand,
}

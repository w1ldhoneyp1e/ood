import {type IParagraph} from '../interfaces/IParagraph'

class Paragraph implements IParagraph {
	private text: string

	constructor(text: string = '') {
		this.text = text
	}

	getText(): string {
		return this.text
	}

	setText(text: string): void {
		this.text = text
	}
}

export {
	Paragraph,
}

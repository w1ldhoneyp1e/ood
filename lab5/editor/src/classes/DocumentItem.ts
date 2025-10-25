import {type IDocumentItem} from '../interfaces/IDocumentItem'
import {type IImage} from '../interfaces/IImage'
import {type IParagraph} from '../interfaces/IParagraph'

class DocumentItem implements IDocumentItem {
	private paragraph: IParagraph | null
	private image: IImage | null

	constructor(paragraph?: IParagraph, image?: IImage) {
		this.paragraph = paragraph || null
		this.image = image || null
	}

	getImage(): IImage | null {
		return this.image
	}

	getParagraph(): IParagraph | null {
		return this.paragraph
	}
}

export {
	DocumentItem,
}

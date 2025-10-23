import {type IConstDocumentItem, type IDocumentItem} from '../interfaces/IDocumentItem'
import {type IImage} from '../interfaces/IImage'
import {type IParagraph} from '../interfaces/IParagraph'

class ConstDocumentItem implements IConstDocumentItem {
	protected paragraph: IParagraph | null
	protected image: IImage | null

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

class DocumentItem extends ConstDocumentItem implements IDocumentItem {
	getImage(): IImage | null {
		return this.image
	}

	getParagraph(): IParagraph | null {
		return this.paragraph
	}
}

export {
	ConstDocumentItem,
	DocumentItem,
}

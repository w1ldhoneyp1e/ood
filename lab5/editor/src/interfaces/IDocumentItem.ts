import {type IImage} from './IImage'
import {type IParagraph} from './IParagraph'

interface IConstDocumentItem {
	getImage: () => IImage | null,
	getParagraph: () => IParagraph | null,
}

interface IDocumentItem extends IConstDocumentItem {
	getImage: () => IImage | null,
	getParagraph: () => IParagraph | null,
}

export {
	IConstDocumentItem,
	IDocumentItem,
}

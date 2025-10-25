import {type IImage} from './IImage'
import {type IParagraph} from './IParagraph'

interface IDocumentItem {
	getImage: () => IImage | null,
	getParagraph: () => IParagraph | null,
}

export {
	IDocumentItem,
}

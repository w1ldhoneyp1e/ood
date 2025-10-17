import {type PictureDraft} from './PictureDraft'

interface IDesigner {
	createDraft: (input: string[]) => PictureDraft,
}

export {
	IDesigner,
}


import {type ICanvas} from '../canvas/ICanvas'
import {type PictureDraft} from '../designer/PictureDraft'

class Painter {
	drawPicture(draft: PictureDraft, canvas: ICanvas): void {
		const shapeCount = draft.getShapeCount()

		for (let i = 0; i < shapeCount; i++) {
			const shape = draft.getShape(i)
			shape.draw(canvas)
		}
	}
}

export {
	Painter,
}


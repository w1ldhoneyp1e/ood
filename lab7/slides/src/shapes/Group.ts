import {type ICanvas} from '../canvas/ICanvas'
import {FillStyle} from '../types/FillStyle'
import {Frame} from '../types/Frame'
import {LineStyle} from '../types/LineStyle'
import {type RGBA} from '../types/RGBA'
import {type IShape} from './IShape'

class Group implements IShape {
	private shapes: IShape[] = []

	addShape(shape: IShape): void {
		this.shapes.push(shape)
	}

	removeShape(shape: IShape): void {
		const index = this.shapes.indexOf(shape)
		if (index !== -1) {
			this.shapes.splice(index, 1)
		}
	}

	getShapes(): IShape[] {
		return this.shapes
	}

	getFrame(): Frame {
		const frames = this.shapes.map(shape => shape.getFrame())
		const unionFrame = Frame.union(frames)

		if (!unionFrame) {
			return new Frame(0, 0, 0, 0)
		}

		return unionFrame
	}

	setFrame(newFrame: Frame): void {
		const currentFrame = this.getFrame()

		if (currentFrame.width === 0 || currentFrame.height === 0) {
			for (const shape of this.shapes) {
				const shapeFrame = shape.getFrame()
				const offsetX = newFrame.left - currentFrame.left
				const offsetY = newFrame.top - currentFrame.top
				shape.setFrame(new Frame(
					shapeFrame.left + offsetX,
					shapeFrame.top + offsetY,
					shapeFrame.width,
					shapeFrame.height,
				))
			}

			return
		}

		const scaleX = newFrame.width / currentFrame.width
		const scaleY = newFrame.height / currentFrame.height

		for (const shape of this.shapes) {
			const shapeFrame = shape.getFrame()
			const newShapeLeft = (shapeFrame.left - currentFrame.left) * scaleX + newFrame.left
			const newShapeTop = (shapeFrame.top - currentFrame.top) * scaleY + newFrame.top
			const newShapeWidth = shapeFrame.width * scaleX
			const newShapeHeight = shapeFrame.height * scaleY

			shape.setFrame(new Frame(newShapeLeft, newShapeTop, newShapeWidth, newShapeHeight))
		}
	}

	private checkCommonStyleProperties(
		getStyle: (shape: IShape) => {
			enabled: boolean,
			color: RGBA | undefined,
		}): {
			enabled: boolean,
			color: RGBA | undefined,
		} {
		const firstStyle = getStyle(this.shapes[0])
		let allEnabledSame = true
		let allColorSame = true

		for (let i = 1; i < this.shapes.length; i++) {
			const style = getStyle(this.shapes[i])
			if (style.enabled !== firstStyle.enabled) {
				allEnabledSame = false
			}
			if (style.color === undefined || firstStyle.color === undefined) {
				if (style.color !== firstStyle.color) {
					allColorSame = false
				}
			}
			else if (!style.color.equals(firstStyle.color)) {
				allColorSame = false
			}
		}

		return {
			enabled: allEnabledSame
				? firstStyle.enabled
				: false,
			color: allEnabledSame && allColorSame
				? firstStyle.color
				: undefined,
		}
	}

	getFillStyle(): FillStyle {
		if (this.shapes.length === 0) {
			return new FillStyle(false, undefined)
		}

		const {enabled, color} = this.checkCommonStyleProperties(
			shape => shape.getFillStyle(),
		)

		return new FillStyle(enabled, color)
	}

	setFillStyle(style: FillStyle): void {
		for (const shape of this.shapes) {
			const currentStyle = shape.getFillStyle()
			shape.setFillStyle(new FillStyle(
				style.enabled,
				style.color ?? currentStyle.color,
			))
		}
	}

	getLineStyle(): LineStyle {
		if (this.shapes.length === 0) {
			return new LineStyle(false, undefined, 0)
		}

		const {enabled, color} = this.checkCommonStyleProperties(
			shape => shape.getLineStyle(),
		)

		const firstStyle = this.shapes[0].getLineStyle()
		let allWidthSame = true
		for (let i = 1; i < this.shapes.length; i++) {
			const style = this.shapes[i].getLineStyle()
			if (style.lineWidth !== firstStyle.lineWidth) {
				allWidthSame = false
			}
		}

		return new LineStyle(
			enabled,
			color,
			enabled && allWidthSame
				? firstStyle.lineWidth
				: 0,
		)
	}

	setLineStyle(style: LineStyle): void {
		for (const shape of this.shapes) {
			const currentStyle = shape.getLineStyle()
			shape.setLineStyle(new LineStyle(
				style.enabled,
				style.color ?? currentStyle.color,
				style.lineWidth !== 0
					? style.lineWidth
					: currentStyle.lineWidth,
			))
		}
	}

	draw(canvas: ICanvas): void {
		for (const shape of this.shapes) {
			shape.draw(canvas)
		}
	}

	clone(): IShape {
		const clonedGroup = new Group()
		for (const shape of this.shapes) {
			clonedGroup.addShape(shape.clone())
		}

		return clonedGroup
	}
}

export {
	Group,
}

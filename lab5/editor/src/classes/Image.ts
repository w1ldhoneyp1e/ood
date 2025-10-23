import {type IImage} from '../interfaces/IImage'

const WIDTH_ERROR = 'Ширина изображения должна быть от 1 до 10000 пикселей'
const HEIGHT_ERROR = 'Высота изображения должна быть от 1 до 10000 пикселей'

class Image implements IImage {
	private path: string
	private width: number
	private height: number

	constructor(path: string, width: number, height: number) {
		if (width < 1 || width > 10000) {
			throw new Error(WIDTH_ERROR)
		}
		if (height < 1 || height > 10000) {
			throw new Error(HEIGHT_ERROR)
		}

		this.path = path
		this.width = width
		this.height = height
	}

	getPath(): string {
		return this.path
	}

	getWidth(): number {
		return this.width
	}

	getHeight(): number {
		return this.height
	}

	resize(width: number, height: number): void {
		if (width < 1 || width > 10000) {
			throw new Error(WIDTH_ERROR)
		}
		if (height < 1 || height > 10000) {
			throw new Error(HEIGHT_ERROR)
		}

		this.width = width
		this.height = height
	}
}

export {
	Image,
}

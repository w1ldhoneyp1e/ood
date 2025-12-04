import {type Image} from './Image'

function print(image: Image, output: NodeJS.WritableStream = process.stdout): void {
	const size = image.getSize()

	for (let y = 0; y < size.height; y++) {
		let line = ''
		for (let x = 0; x < size.width; x++) {
			line += image.getPixel(x, y)
		}
		output.write(line + '\n')
	}
}

export {
	print,
}

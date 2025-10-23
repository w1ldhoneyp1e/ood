import {Image} from '../classes/Image'

describe('Image', () => {
	test('create image with valid dimensions', () => {
		const image = new Image('test.png', 100, 200)
		expect(image.getPath()).toBe('test.png')
		expect(image.getWidth()).toBe(100)
		expect(image.getHeight()).toBe(200)
	})

	test('throw error for invalid width', () => {
		expect(() => new Image('test.png', 0, 100)).toThrow('Ширина изображения должна быть от 1 до 10000 пикселей')
		expect(() => new Image('test.png', 10001, 100)).toThrow('Ширина изображения должна быть от 1 до 10000 пикселей')
	})

	test('throw error for invalid height', () => {
		expect(() => new Image('test.png', 100, 0)).toThrow('Высота изображения должна быть от 1 до 10000 пикселей')
		expect(() => new Image('test.png', 100, 10001)).toThrow('Высота изображения должна быть от 1 до 10000 пикселей')
	})

	test('resize image with valid dimensions', () => {
		const image = new Image('test.png', 100, 200)

		image.resize(300, 400)
		expect(image.getWidth()).toBe(300)
		expect(image.getHeight()).toBe(400)
	})

	test('throw error when resizing to invalid dimensions', () => {
		const image = new Image('test.png', 100, 200)

		expect(() => image.resize(0, 100)).toThrow('Ширина изображения должна быть от 1 до 10000 пикселей')
		expect(() => image.resize(100, 0)).toThrow('Высота изображения должна быть от 1 до 10000 пикселей')
	})
})

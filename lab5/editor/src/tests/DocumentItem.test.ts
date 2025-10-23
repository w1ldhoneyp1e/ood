import {ConstDocumentItem, DocumentItem} from '../classes/DocumentItem'
import {Image} from '../classes/Image'
import {Paragraph} from '../classes/Paragraph'

describe('DocumentItem', () => {
	test('create document item with paragraph', () => {
		const paragraph = new Paragraph('Test text')
		const item = new DocumentItem(paragraph)

		expect(item.getParagraph()).toBe(paragraph)
		expect(item.getImage()).toBeNull()
	})

	test('create document item with image', () => {
		const image = new Image('test.png', 100, 200)
		const item = new DocumentItem(undefined, image)

		expect(item.getImage()).toBe(image)
		expect(item.getParagraph()).toBeNull()
	})

	test('create empty document item', () => {
		const item = new DocumentItem()

		expect(item.getParagraph()).toBeNull()
		expect(item.getImage()).toBeNull()
	})
})

describe('ConstDocumentItem', () => {
	test('create const document item with paragraph', () => {
		const paragraph = new Paragraph('Test text')
		const item = new ConstDocumentItem(paragraph)

		expect(item.getParagraph()).toBe(paragraph)
		expect(item.getImage()).toBeNull()
	})

	test('create const document item with image', () => {
		const image = new Image('test.png', 100, 200)
		const item = new ConstDocumentItem(undefined, image)

		expect(item.getImage()).toBe(image)
		expect(item.getParagraph()).toBeNull()
	})
})

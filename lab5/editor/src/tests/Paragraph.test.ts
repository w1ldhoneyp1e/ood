import {Paragraph} from '../classes/Paragraph'

describe('Paragraph', () => {
	test('create paragraph with empty text', () => {
		const paragraph = new Paragraph()
		expect(paragraph.getText()).toBe('')
	})

	test('create paragraph with initial text', () => {
		const text = 'Hello, World!'
		const paragraph = new Paragraph(text)
		expect(paragraph.getText()).toBe(text)
	})

	test('set and get text', () => {
		const paragraph = new Paragraph()
		const newText = 'New text'

		paragraph.setText(newText)
		expect(paragraph.getText()).toBe(newText)
	})

	test('update text multiple times', () => {
		const paragraph = new Paragraph('Initial')

		paragraph.setText('First update')
		expect(paragraph.getText()).toBe('First update')

		paragraph.setText('Second update')
		expect(paragraph.getText()).toBe('Second update')
	})
})

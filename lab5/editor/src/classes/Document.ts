import * as path from 'path'
import * as fs from 'fs-extra'
import {v4 as uuidv4} from 'uuid'
import {type IDocument} from '../interfaces/IDocument'
import {type IDocumentItem} from '../interfaces/IDocumentItem'
import {DocumentItem} from './DocumentItem'
import {Image} from './Image'
import {Paragraph} from './Paragraph'

const INDEX_ERROR = 'Позиция превышает количество элементов в документе'

class Document implements IDocument {
	private title = ''
	private items: DocumentItem[] = []

	insertParagraph(text: string, position?: number): IDocumentItem {
		const insertPosition = position ?? this.items.length

		if (insertPosition > this.items.length) {
			throw new Error(INDEX_ERROR)
		}

		const paragraph = new Paragraph(text)
		const documentItem = new DocumentItem(paragraph)

		this.items.splice(insertPosition, 0, documentItem)

		return documentItem
	}

	insertImage(imagePath: string, width: number, height: number, position?: number): IDocumentItem {
		const insertPosition = position ?? this.items.length

		if (insertPosition > this.items.length) {
			throw new Error(INDEX_ERROR)
		}

		const imageExtension = path.extname(imagePath)
		const uniqueImageName = `${uuidv4()}${imageExtension}`
		const targetImagePath = path.join('images', uniqueImageName)

		fs.ensureDirSync('images')

		fs.copyFileSync(imagePath, targetImagePath)

		const image = new Image(targetImagePath, width, height)
		const documentItem = new DocumentItem(undefined, image)

		this.items.splice(insertPosition, 0, documentItem)

		return documentItem
	}

	getItemsCount(): number {
		return this.items.length
	}

	getItem(index: number): IDocumentItem {
		if (index >= this.items.length) {
			throw new Error(INDEX_ERROR)
		}

		return this.items[index]
	}

	deleteItem(index: number): void {
		if (index >= this.items.length) {
			throw new Error(INDEX_ERROR)
		}

		this.items.splice(index, 1)
	}

	getTitle(): string {
		return this.title
	}

	setTitle(title: string): void {
		this.title = title
	}

	save(filePath: string): void {
		let html = '<!DOCTYPE html>\n<html>\n<head>\n'
		html += `<title>${this.escapeHtml(this.title)}</title>\n`
		html += '</head>\n<body>\n'

		if (this.title) {
			html += `<h1>${this.escapeHtml(this.title)}</h1>\n`
		}

		for (const item of this.items) {
			const paragraph = item.getParagraph()
			const image = item.getImage()

			if (paragraph) {
				html += `<p>${this.escapeHtml(paragraph.getText())}</p>\n`
			}
			else if (image) {
				html += `<img src="${this.escapeHtml(image.getPath())}" width="${image.getWidth()}" height="${image.getHeight()}" alt="Image">\n`
			}
		}

		html += '</body>\n</html>'

		fs.writeFileSync(filePath, html, 'utf8')
	}

	private escapeHtml(text: string): string {
		return text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;')
	}
}

export {
	Document,
}

import * as path from 'path'
import * as fs from 'fs-extra'
import {v4 as uuidv4} from 'uuid'

const IMAGES_DIR = 'images'

function copyImageFile(sourcePath: string): string {
	const imageExtension = path.extname(sourcePath)
	const uniqueImageName = `${uuidv4()}${imageExtension}`
	const targetImagePath = path.join(IMAGES_DIR, uniqueImageName)

	fs.ensureDirSync(IMAGES_DIR)
	fs.copyFileSync(sourcePath, targetImagePath)

	return targetImagePath
}

function deleteImageFile(imagePath: string): void {
	try {
		if (fs.existsSync(imagePath)) {
			fs.unlinkSync(imagePath)
		}
	}
	catch (error) {
		console.warn(`Не удалось удалить файл изображения: ${imagePath}`, error)
	}
}

function fileExists(filePath: string): boolean {
	return fs.existsSync(filePath)
}

export {
	copyImageFile,
	deleteImageFile,
	fileExists,
}

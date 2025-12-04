import {drawLine} from './DrawLine'
import {Image} from './Image'
import {print} from './Print'

function drawWalls(image: Image): void {
	drawLine(image, {
		x: 5,
		y: 15,
	}, {
		x: 15,
		y: 15,
	}, '#')
	drawLine(image, {
		x: 15,
		y: 15,
	}, {
		x: 15,
		y: 5,
	}, '#')
	drawLine(image, {
		x: 15,
		y: 5,
	}, {
		x: 5,
		y: 5,
	}, '#')
	drawLine(image, {
		x: 5,
		y: 5,
	}, {
		x: 5,
		y: 15,
	}, '#')
}

function drawRoof(image: Image): void {
	drawLine(image, {
		x: 5,
		y: 5,
	}, {
		x: 10,
		y: 0,
	}, '#')
	drawLine(image, {
		x: 10,
		y: 0,
	}, {
		x: 15,
		y: 5,
	}, '#')
}

function drawLeftWindow(image: Image): void {
	drawLine(image, {
		x: 7,
		y: 12,
	}, {
		x: 7,
		y: 8,
	}, '#')
	drawLine(image, {
		x: 7,
		y: 8,
	}, {
		x: 9,
		y: 8,
	}, '#')
	drawLine(image, {
		x: 9,
		y: 8,
	}, {
		x: 9,
		y: 12,
	}, '#')
	drawLine(image, {
		x: 7,
		y: 12,
	}, {
		x: 9,
		y: 12,
	}, '#')
}

function main(): void {
	const image = new Image(40, 20, ' ')

	drawWalls(image)
	drawRoof(image)
	drawLeftWindow(image)

	print(image)
}

main()


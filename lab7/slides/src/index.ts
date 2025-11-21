import {ConsoleCanvas} from './canvas/ConsoleCanvas'
import {Ellipse} from './shapes/Ellipse'
import {Group} from './shapes/Group'
import {Rectangle} from './shapes/Rectangle'
import {Triangle} from './shapes/Triangle'
import {Slide} from './Slide'
import {FillStyle} from './types/FillStyle'
import {Frame} from './types/Frame'
import {LineStyle} from './types/LineStyle'
import {RGBA} from './types/RGBA'

function createHouse(): Group {
	const houseGroup = new Group()

	const wall = new Rectangle(
		new Frame(100, 200, 200, 150),
		new FillStyle(true, new RGBA(139, 69, 19, 1)),
		new LineStyle(true, new RGBA(101, 67, 33, 1), 2),
	)
	houseGroup.addShape(wall)

	const roof = new Triangle(
		new Frame(50, 150, 300, 50),
		new FillStyle(true, new RGBA(139, 0, 0, 1)),
		new LineStyle(true, new RGBA(101, 0, 0, 1), 2),
	)
	houseGroup.addShape(roof)

	const window = new Rectangle(
		new Frame(150, 250, 50, 50),
		new FillStyle(true, new RGBA(135, 206, 250, 1)),
		new LineStyle(true, new RGBA(0, 0, 0, 1), 2),
	)
	houseGroup.addShape(window)

	const door = new Rectangle(
		new Frame(200, 300, 50, 50),
		new FillStyle(true, new RGBA(101, 67, 33, 1)),
		new LineStyle(true, new RGBA(0, 0, 0, 1), 2),
	)
	houseGroup.addShape(door)

	return houseGroup
}

function createSun(): Ellipse {

	return new Ellipse(
		new Frame(400, 50, 80, 80),
		new FillStyle(true, new RGBA(255, 255, 0, 1)),
		new LineStyle(true, new RGBA(255, 200, 0, 1), 3),
	)
}

function createCloud(): Group {
	const cloudGroup = new Group()

	const cloud1 = new Ellipse(
		new Frame(300, 100, 40, 40),
		new FillStyle(true, new RGBA(255, 255, 255, 1)),
		new LineStyle(false, undefined, 0),
	)
	cloudGroup.addShape(cloud1)

	const cloud2 = new Ellipse(
		new Frame(320, 100, 50, 50),
		new FillStyle(true, new RGBA(255, 255, 255, 1)),
		new LineStyle(false, undefined, 0),
	)
	cloudGroup.addShape(cloud2)

	const cloud3 = new Ellipse(
		new Frame(340, 100, 40, 40),
		new FillStyle(true, new RGBA(255, 255, 255, 1)),
		new LineStyle(false, undefined, 0),
	)
	cloudGroup.addShape(cloud3)

	return cloudGroup
}

function main(): void {
	const slide = new Slide()

	const house = createHouse()
	slide.addShape(house)

	const sun = createSun()
	slide.addShape(sun)

	const cloud = createCloud()
	slide.addShape(cloud)

	const canvas = new ConsoleCanvas()
	console.log('=== Рисование слайда ===')
	slide.draw(canvas)
}

main()

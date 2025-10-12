import {
	ANIMAL_EVENT_TYPE,
	AnimalSystem,
	CatObserver,
	DogObserver,
	MouseObserver,
} from './Animals'

function main(): void {
	console.log('Animal system demonstration')

	const animalSystem = new AnimalSystem()

	animalSystem.registerAnimal('fluffy', 'cat', 'living_room')
	animalSystem.registerAnimal('whiskers', 'cat', 'kitchen')
	animalSystem.registerAnimal('tiny', 'mouse', 'basement')
	animalSystem.registerAnimal('squeaky', 'mouse', 'attic')
	animalSystem.registerAnimal('rex', 'dog', 'yard')
	animalSystem.registerAnimal('buddy', 'dog', 'living_room')

	console.log('Creating observers')

	const catObserver1 = new CatObserver('fluffy')
	const catObserver2 = new CatObserver('whiskers')
	const mouseObserver1 = new MouseObserver('tiny')
	const mouseObserver2 = new MouseObserver('squeaky')
	const dogObserver1 = new DogObserver('rex')
	const dogObserver2 = new DogObserver('buddy')

	console.log('Registering observers with different priorities')

	animalSystem.registerObserver(catObserver1, [
		ANIMAL_EVENT_TYPE.mouseSqueak,
		ANIMAL_EVENT_TYPE.foodAvailable,
		ANIMAL_EVENT_TYPE.dogBark,
	], 10)

	animalSystem.registerObserver(catObserver2, [
		ANIMAL_EVENT_TYPE.mouseSqueak,
		ANIMAL_EVENT_TYPE.foodAvailable,
	], 8)

	animalSystem.registerObserver(mouseObserver1, [
		ANIMAL_EVENT_TYPE.catMeow,
		ANIMAL_EVENT_TYPE.dogBark,
		ANIMAL_EVENT_TYPE.predatorNear,
	], 5)

	animalSystem.registerObserver(mouseObserver2, [
		ANIMAL_EVENT_TYPE.catMeow,
		ANIMAL_EVENT_TYPE.predatorNear,
	], 5)

	animalSystem.registerObserver(dogObserver1, [
		ANIMAL_EVENT_TYPE.catMeow,
		ANIMAL_EVENT_TYPE.mouseSqueak,
		ANIMAL_EVENT_TYPE.foodAvailable,
	], 3)

	animalSystem.registerObserver(dogObserver2, [
		ANIMAL_EVENT_TYPE.catMeow,
		ANIMAL_EVENT_TYPE.foodAvailable,
	], 2)

	animalSystem.mouseSqueak('tiny')
	animalSystem.catMeow('fluffy')
	animalSystem.foodAvailable('kitchen')
	animalSystem.dogBark('rex')
	animalSystem.predatorNear('attic')
	animalSystem.catPurr('whiskers')
	animalSystem.unregisterObserver(catObserver1, [ANIMAL_EVENT_TYPE.dogBark])
	animalSystem.dogBark('buddy')
	animalSystem.mouseSqueak('squeaky')
}

main()

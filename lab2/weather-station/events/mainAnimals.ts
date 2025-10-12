import {
	ANIMAL_EVENT_TYPE,
	AnimalSystem,
	CatObserver,
	DogObserver,
	MouseObserver,
} from './AnimalExample'


function main(): void {
	console.log('Animal system demonstration\n')

	const animalSystem = new AnimalSystem()

	animalSystem.registerAnimal('fluffy', 'cat', 'living_room')
	animalSystem.registerAnimal('whiskers', 'cat', 'kitchen')
	animalSystem.registerAnimal('tiny', 'mouse', 'basement')
	animalSystem.registerAnimal('squeaky', 'mouse', 'attic')
	animalSystem.registerAnimal('rex', 'dog', 'yard')
	animalSystem.registerAnimal('buddy', 'dog', 'living_room')

	console.log('\nCreating observers...')

	const catObserver1 = new CatObserver('fluffy')
	const catObserver2 = new CatObserver('whiskers')
	const mouseObserver1 = new MouseObserver('tiny')
	const mouseObserver2 = new MouseObserver('squeaky')
	const dogObserver1 = new DogObserver('rex')
	const dogObserver2 = new DogObserver('buddy')

	console.log('\nRegistering observers with different priorities...')

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

	console.log('\nStarting event simulation...\n')

	console.log('Mouse tiny squeaking in basement:')
	animalSystem.mouseSqueak('tiny', 2)

	console.log('\nCat fluffy meowing in living room:')
	animalSystem.catMeow('fluffy', 3)

	console.log('\nFood appears in kitchen:')
	animalSystem.foodAvailable('kitchen')

	console.log('\nDog rex barking in yard:')
	animalSystem.dogBark('rex', 4)

	console.log('\nPredator appears near attic:')
	animalSystem.predatorNear('attic', 5)

	console.log('\nCat whiskers purring in kitchen:')
	animalSystem.catPurr('whiskers', 2)

	console.log('\nSubscription information:')
	const cat1Info = animalSystem.getObserverInfo(catObserver1)
	const mouse1Info = animalSystem.getObserverInfo(mouseObserver1)
	const dog1Info = animalSystem.getObserverInfo(dogObserver1)

	console.log('Cat fluffy subscribed to:', cat1Info?.eventTypes)
	console.log('Mouse tiny subscribed to:', mouse1Info?.eventTypes)
	console.log('Dog rex subscribed to:', dog1Info?.eventTypes)

	console.log('\nUnsubscribing cat fluffy from dog events...')
	animalSystem.unregisterObserver(catObserver1, [ANIMAL_EVENT_TYPE.dogBark])

	console.log('\nDog buddy barking in living room (cat fluffy no longer reacts):')
	animalSystem.dogBark('buddy', 3)

	console.log('\nMouse squeaky squeaking in attic (cat fluffy still reacts):')
	animalSystem.mouseSqueak('squeaky', 1)

	console.log('\nDemonstration completed!')
}

main()

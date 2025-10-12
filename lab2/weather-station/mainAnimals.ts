import { CAnimalSystem, CatObserver, MouseObserver, DogObserver } from './AnimalExample'
import { AnimalEventType } from './AnimalExample'

function main(): void {
	console.log('🐾 Демонстрация системы животных с событиями\n')

	const animalSystem = new CAnimalSystem()

	// Регистрируем животных
	animalSystem.registerAnimal('fluffy', 'cat', 'living_room')
	animalSystem.registerAnimal('whiskers', 'cat', 'kitchen')
	animalSystem.registerAnimal('tiny', 'mouse', 'basement')
	animalSystem.registerAnimal('squeaky', 'mouse', 'attic')
	animalSystem.registerAnimal('rex', 'dog', 'yard')
	animalSystem.registerAnimal('buddy', 'dog', 'living_room')

	console.log('\n👀 Создаем наблюдателей...')
	
	// Создаем наблюдателей
	const catObserver1 = new CatObserver('fluffy')
	const catObserver2 = new CatObserver('whiskers')
	const mouseObserver1 = new MouseObserver('tiny')
	const mouseObserver2 = new MouseObserver('squeaky')
	const dogObserver1 = new DogObserver('rex')
	const dogObserver2 = new DogObserver('buddy')

	console.log('\n📡 Регистрируем наблюдателей с разными приоритетами...')
	
	// Коты подписываются на мышей, еду и собак (высокий приоритет)
	animalSystem.registerObserver(catObserver1, [
		AnimalEventType.MOUSE_SQUEAK,
		AnimalEventType.FOOD_AVAILABLE,
		AnimalEventType.DOG_BARK
	], 10)

	animalSystem.registerObserver(catObserver2, [
		AnimalEventType.MOUSE_SQUEAK,
		AnimalEventType.FOOD_AVAILABLE
	], 8)

	// Мыши подписываются на котов, собак и хищников (средний приоритет)
	animalSystem.registerObserver(mouseObserver1, [
		AnimalEventType.CAT_MEOW,
		AnimalEventType.DOG_BARK,
		AnimalEventType.PREDATOR_NEAR
	], 5)

	animalSystem.registerObserver(mouseObserver2, [
		AnimalEventType.CAT_MEOW,
		AnimalEventType.PREDATOR_NEAR
	], 5)

	// Собаки подписываются на котов, мышей и еду (низкий приоритет)
	animalSystem.registerObserver(dogObserver1, [
		AnimalEventType.CAT_MEOW,
		AnimalEventType.MOUSE_SQUEAK,
		AnimalEventType.FOOD_AVAILABLE
	], 3)

	animalSystem.registerObserver(dogObserver2, [
		AnimalEventType.CAT_MEOW,
		AnimalEventType.FOOD_AVAILABLE
	], 2)

	console.log('\n🎭 Начинаем симуляцию событий...\n')

	// Мышь пищит в подвале
	console.log('🐭 Мышь tiny пищит в подвале:')
	animalSystem.mouseSqueak('tiny', 2)

	console.log('\n🐱 Кот fluffy мяукает в гостиной:')
	animalSystem.catMeow('fluffy', 3)

	console.log('\n🍽️  Еда появляется на кухне:')
	animalSystem.foodAvailable('kitchen')

	console.log('\n🐕 Собака rex лает во дворе:')
	animalSystem.dogBark('rex', 4)

	console.log('\n🦅 Хищник появляется рядом с чердаком:')
	animalSystem.predatorNear('attic', 5)

	console.log('\n🐱 Кот whiskers мурлычет на кухне:')
	animalSystem.catPurr('whiskers', 2)

	console.log('\n📊 Информация о подписках:')
	const cat1Info = animalSystem.getObserverInfo(catObserver1)
	const mouse1Info = animalSystem.getObserverInfo(mouseObserver1)
	const dog1Info = animalSystem.getObserverInfo(dogObserver1)
	
	console.log('Кот fluffy подписан на:', cat1Info?.eventTypes)
	console.log('Мышь tiny подписан на:', mouse1Info?.eventTypes)
	console.log('Собака rex подписан на:', dog1Info?.eventTypes)

	console.log('\n🔌 Отписываем кота fluffy от событий собак...')
	animalSystem.unregisterObserver(catObserver1, [AnimalEventType.DOG_BARK])

	console.log('\n🐕 Собака buddy лает в гостиной (кот fluffy больше не реагирует):')
	animalSystem.dogBark('buddy', 3)

	console.log('\n🐭 Мышь squeaky пищит на чердаке (кот fluffy все еще реагирует):')
	animalSystem.mouseSqueak('squeaky', 1)

	console.log('\n✅ Демонстрация завершена!')
}

main()

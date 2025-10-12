import {CEventObservable} from './EventObservable'
import {type IEvent, type IEventObserver} from './EventTypes'

// Типы событий для животных
export enum AnimalEventType {
	CAT_MEOW = 'cat_meow',
	CAT_PURR = 'cat_purr',
	MOUSE_SQUEAK = 'mouse_squeak',
	MOUSE_HIDE = 'mouse_hide',
	DOG_BARK = 'dog_bark',
	DOG_WAG_TAIL = 'dog_wag_tail',
	FOOD_AVAILABLE = 'food_available',
	PREDATOR_NEAR = 'predator_near',
}

// События животных
export interface AnimalEvent extends IEvent {
	type: AnimalEventType,
	data: {
		animalId: string,
		location?: string,
		intensity?: number,
	},
}

// Универсальная система животных
class CAnimalSystem extends CEventObservable<AnimalEvent> {
	private animals = new Map<string, {
		type: string,
		location: string,
	}>()

	// Регистрация животного в системе
	registerAnimal(id: string, type: string, location: string): void {
		this.animals.set(id, {
			type,
			location,
		})
		console.log(`🐾 ${type} ${id} зарегистрирован в системе в локации ${location}`)
	}

	// Кот мяукает
	catMeow(catId: string, intensity: number = 1): void {
		const cat = this.animals.get(catId)
		if (!cat || cat.type !== 'cat') {
			console.log(`❌ Кот ${catId} не найден в системе`)
			return
		}

		const event: AnimalEvent = {
			type: AnimalEventType.CAT_MEOW,
			data: {
				animalId: catId,
				location: cat.location,
				intensity,
			},
			timestamp: Date.now(),
		}
		this.notifyObservers(event)
	}

	// Кот мурлычет
	catPurr(catId: string, intensity: number = 1): void {
		const cat = this.animals.get(catId)
		if (!cat || cat.type !== 'cat') {
			console.log(`❌ Кот ${catId} не найден в системе`)
			return
		}

		const event: AnimalEvent = {
			type: AnimalEventType.CAT_PURR,
			data: {
				animalId: catId,
				location: cat.location,
				intensity,
			},
			timestamp: Date.now(),
		}
		this.notifyObservers(event)
	}

	// Мышь пищит
	mouseSqueak(mouseId: string, intensity: number = 1): void {
		const mouse = this.animals.get(mouseId)
		if (!mouse || mouse.type !== 'mouse') {
			console.log(`❌ Мышь ${mouseId} не найдена в системе`)
			return
		}

		const event: AnimalEvent = {
			type: AnimalEventType.MOUSE_SQUEAK,
			data: {
				animalId: mouseId,
				location: mouse.location,
				intensity,
			},
			timestamp: Date.now(),
		}
		this.notifyObservers(event)
	}

	// Мышь прячется
	mouseHide(mouseId: string): void {
		const mouse = this.animals.get(mouseId)
		if (!mouse || mouse.type !== 'mouse') {
			console.log(`❌ Мышь ${mouseId} не найдена в системе`)
			return
		}

		const event: AnimalEvent = {
			type: AnimalEventType.MOUSE_HIDE,
			data: {
				animalId: mouseId,
				location: mouse.location,
			},
			timestamp: Date.now(),
		}
		this.notifyObservers(event)
	}

	// Собака лает
	dogBark(dogId: string, intensity: number = 1): void {
		const dog = this.animals.get(dogId)
		if (!dog || dog.type !== 'dog') {
			console.log(`❌ Собака ${dogId} не найдена в системе`)
			return
		}

		const event: AnimalEvent = {
			type: AnimalEventType.DOG_BARK,
			data: {
				animalId: dogId,
				location: dog.location,
				intensity,
			},
			timestamp: Date.now(),
		}
		this.notifyObservers(event)
	}

	// Собака виляет хвостом
	dogWagTail(dogId: string, intensity: number = 1): void {
		const dog = this.animals.get(dogId)
		if (!dog || dog.type !== 'dog') {
			console.log(`❌ Собака ${dogId} не найдена в системе`)
			return
		}

		const event: AnimalEvent = {
			type: AnimalEventType.DOG_WAG_TAIL,
			data: {
				animalId: dogId,
				location: dog.location,
				intensity,
			},
			timestamp: Date.now(),
		}
		this.notifyObservers(event)
	}

	// Еда доступна
	foodAvailable(location: string): void {
		const event: AnimalEvent = {
			type: AnimalEventType.FOOD_AVAILABLE,
			data: {
				animalId: 'system',
				location,
			},
			timestamp: Date.now(),
		}
		this.notifyObservers(event)
	}

	// Хищник рядом
	predatorNear(location: string, intensity: number = 1): void {
		const event: AnimalEvent = {
			type: AnimalEventType.PREDATOR_NEAR,
			data: {
				animalId: 'system',
				location,
				intensity,
			},
			timestamp: Date.now(),
		}
		this.notifyObservers(event)
	}
}

// Наблюдатель-кот
class CatObserver implements IEventObserver<AnimalEvent> {
	private interestedEventTypes = [
		AnimalEventType.MOUSE_SQUEAK,
		AnimalEventType.FOOD_AVAILABLE,
		AnimalEventType.DOG_BARK,
	]

	constructor(private catId: string) {}

	update(event: AnimalEvent): void {
		switch (event.type) {
			case AnimalEventType.MOUSE_SQUEAK:
				console.log(`🐱 Кот ${this.catId}: "Мяу! Слышу мышь в ${event.data.location}!"`)
				break
			case AnimalEventType.FOOD_AVAILABLE:
				if (event.data.location === 'kitchen') {
					console.log(`🐱 Кот ${this.catId}: "Мяу-мяу! Еда на кухне!"`)
				}
				break
			case AnimalEventType.DOG_BARK:
				console.log(`🐱 Кот ${this.catId}: "Шшш! Собака лает, лучше спрятаться..."`)
				break
		}
	}

	getInterestedEventTypes(): string[] {
		return [...this.interestedEventTypes]
	}
}

// Наблюдатель-мышь
class MouseObserver implements IEventObserver<AnimalEvent> {
	private interestedEventTypes = [
		AnimalEventType.CAT_MEOW,
		AnimalEventType.DOG_BARK,
		AnimalEventType.PREDATOR_NEAR,
	]

	constructor(private mouseId: string) {}

	update(event: AnimalEvent): void {
		switch (event.type) {
			case AnimalEventType.CAT_MEOW:
				console.log(`🐭 Мышь ${this.mouseId}: "Пи-пи! Кот рядом! Прячусь!"`)
				break
			case AnimalEventType.DOG_BARK:
				console.log(`🐭 Мышь ${this.mouseId}: "Пи! Собака лает, но это не так страшно..."`)
				break
			case AnimalEventType.PREDATOR_NEAR:
				console.log(`🐭 Мышь ${this.mouseId}: "ПИ-ПИ-ПИ! Хищник рядом! СРОЧНО ПРЯЧУСЬ!"`)
				break
		}
	}

	getInterestedEventTypes(): string[] {
		return [...this.interestedEventTypes]
	}
}

// Наблюдатель-собака
class DogObserver implements IEventObserver<AnimalEvent> {
	private interestedEventTypes = [
		AnimalEventType.CAT_MEOW,
		AnimalEventType.MOUSE_SQUEAK,
		AnimalEventType.FOOD_AVAILABLE,
	]

	constructor(private dogId: string) {}

	update(event: AnimalEvent): void {
		switch (event.type) {
			case AnimalEventType.CAT_MEOW:
				console.log(`🐕 Собака ${this.dogId}: "Гав-гав! Кот мяукает, иду разбираться!"`)
				break
			case AnimalEventType.MOUSE_SQUEAK:
				console.log(`🐕 Собака ${this.dogId}: "Гав! Мышь пищит, но меня это не очень интересует..."`)
				break
			case AnimalEventType.FOOD_AVAILABLE:
				console.log(`🐕 Собака ${this.dogId}: "ГАВ-ГАВ! Еда! Бегу к миске!"`)
				break
		}
	}

	getInterestedEventTypes(): string[] {
		return [...this.interestedEventTypes]
	}
}

export {
	CAnimalSystem,
	CatObserver,
	MouseObserver,
	DogObserver,
}

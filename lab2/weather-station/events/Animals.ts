import {EventObservable} from './EventObservable'
import {type IEvent, type IEventObserver} from './EventTypes'

enum ANIMAL_EVENT_TYPE {
	catMeow = 'cat_meow',
	catPurr = 'cat_purr',
	mouseSqueak = 'mouse_squeak',
	mouseHide = 'mouse_hide',
	dogBark = 'dog_bark',
	dogWagTail = 'dog_wag_tail',
	foodAvailable = 'food_available',
	predatorNear = 'predator_near',
}

interface AnimalEvent extends IEvent {
	type: ANIMAL_EVENT_TYPE,
	data: {
		animalId: string,
		location?: string,
	},
}

class AnimalSystem extends EventObservable<AnimalEvent> {
	private animals = new Map<string, {
		type: string,
		location: string,
	}>()

	registerAnimal(id: string, type: string, location: string): void {
		this.animals.set(id, {
			type,
			location,
		})
		console.log(`${type} ${id} registered in ${location}`)
	}

	catMeow(catId: string): void {
		const cat = this.animals.get(catId)
		if (!cat || cat.type !== 'cat') {
			console.log(`Cat ${catId} not found`)
			return
		}

		const event: AnimalEvent = {
			type: ANIMAL_EVENT_TYPE.catMeow,
			data: {
				animalId: catId,
				location: cat.location,
			},
		}
		this.notifyObservers(event)
	}

	catPurr(catId: string): void {
		const cat = this.animals.get(catId)
		if (!cat || cat.type !== 'cat') {
			console.log(`Cat ${catId} not found`)
			return
		}

		const event: AnimalEvent = {
			type: ANIMAL_EVENT_TYPE.catPurr,
			data: {
				animalId: catId,
				location: cat.location,
			},
		}
		this.notifyObservers(event)
	}

	mouseSqueak(mouseId: string): void {
		const mouse = this.animals.get(mouseId)
		if (!mouse || mouse.type !== 'mouse') {
			console.log(`Mouse ${mouseId} not found`)
			return
		}

		const event: AnimalEvent = {
			type: ANIMAL_EVENT_TYPE.mouseSqueak,
			data: {
				animalId: mouseId,
				location: mouse.location,
			},
		}
		this.notifyObservers(event)
	}

	mouseHide(mouseId: string): void {
		const mouse = this.animals.get(mouseId)
		if (!mouse || mouse.type !== 'mouse') {
			console.log(`Mouse ${mouseId} not found`)
			return
		}

		const event: AnimalEvent = {
			type: ANIMAL_EVENT_TYPE.mouseHide,
			data: {
				animalId: mouseId,
				location: mouse.location,
			},
		}
		this.notifyObservers(event)
	}

	dogBark(dogId: string): void {
		const dog = this.animals.get(dogId)
		if (!dog || dog.type !== 'dog') {
			console.log(`Dog ${dogId} not found`)
			return
		}

		const event: AnimalEvent = {
			type: ANIMAL_EVENT_TYPE.dogBark,
			data: {
				animalId: dogId,
				location: dog.location,
			},
		}
		this.notifyObservers(event)
	}

	dogWagTail(dogId: string): void {
		const dog = this.animals.get(dogId)
		if (!dog || dog.type !== 'dog') {
			console.log(`Dog ${dogId} not found`)
			return
		}

		const event: AnimalEvent = {
			type: ANIMAL_EVENT_TYPE.dogWagTail,
			data: {
				animalId: dogId,
				location: dog.location,
			},
		}
		this.notifyObservers(event)
	}

	foodAvailable(location: string): void {
		const event: AnimalEvent = {
			type: ANIMAL_EVENT_TYPE.foodAvailable,
			data: {
				animalId: 'system',
				location,
			},
		}
		this.notifyObservers(event)
	}

	predatorNear(location: string): void {
		const event: AnimalEvent = {
			type: ANIMAL_EVENT_TYPE.predatorNear,
			data: {
				animalId: 'system',
				location,
			},
		}
		this.notifyObservers(event)
	}
}

class CatObserver implements IEventObserver<AnimalEvent> {
	private interestedEventTypes = [
		ANIMAL_EVENT_TYPE.mouseSqueak,
		ANIMAL_EVENT_TYPE.foodAvailable,
		ANIMAL_EVENT_TYPE.dogBark,
	]

	constructor(private catId: string) {}

	update(event: AnimalEvent): void {
		switch (event.type) {
			case ANIMAL_EVENT_TYPE.mouseSqueak:
				console.log(`Cat ${this.catId}: Mouse in ${event.data.location}`)
				break
			case ANIMAL_EVENT_TYPE.foodAvailable:
				if (event.data.location === 'kitchen') {
					console.log(`Cat ${this.catId}: Food in kitchen`)
				}
				break
			case ANIMAL_EVENT_TYPE.dogBark:
				console.log(`Cat ${this.catId}: Dog barking, hiding`)
				break
		}
	}

	getInterestedEventTypes(): string[] {
		return [...this.interestedEventTypes]
	}
}

class MouseObserver implements IEventObserver<AnimalEvent> {
	private interestedEventTypes = [
		ANIMAL_EVENT_TYPE.catMeow,
		ANIMAL_EVENT_TYPE.dogBark,
		ANIMAL_EVENT_TYPE.predatorNear,
	]

	constructor(private mouseId: string) {}

	update(event: AnimalEvent): void {
		switch (event.type) {
			case ANIMAL_EVENT_TYPE.catMeow:
				console.log(`Mouse ${this.mouseId}: Cat nearby, hiding`)
				break
			case ANIMAL_EVENT_TYPE.dogBark:
				console.log(`Mouse ${this.mouseId}: Dog barking, not scared`)
				break
			case ANIMAL_EVENT_TYPE.predatorNear:
				console.log(`Mouse ${this.mouseId}: Predator nearby, hiding!`)
				break
		}
	}

	getInterestedEventTypes(): string[] {
		return [...this.interestedEventTypes]
	}
}

class DogObserver implements IEventObserver<AnimalEvent> {
	private interestedEventTypes = [
		ANIMAL_EVENT_TYPE.catMeow,
		ANIMAL_EVENT_TYPE.mouseSqueak,
		ANIMAL_EVENT_TYPE.foodAvailable,
	]

	constructor(private dogId: string) {}

	update(event: AnimalEvent): void {
		switch (event.type) {
			case ANIMAL_EVENT_TYPE.catMeow:
				console.log(`Dog ${this.dogId}: Cat meowing, investigating`)
				break
			case ANIMAL_EVENT_TYPE.mouseSqueak:
				console.log(`Dog ${this.dogId}: Mouse squeaking, not interested`)
				break
			case ANIMAL_EVENT_TYPE.foodAvailable:
				console.log(`Dog ${this.dogId}: Food available, running to bowl`)
				break
		}
	}

	getInterestedEventTypes(): string[] {
		return [...this.interestedEventTypes]
	}
}

export {
	ANIMAL_EVENT_TYPE,
	AnimalEvent,
	AnimalSystem,
	CatObserver,
	MouseObserver,
	DogObserver,
}

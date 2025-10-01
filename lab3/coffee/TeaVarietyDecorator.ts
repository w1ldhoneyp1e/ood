import {type IBeverage} from './IBeverage'

abstract class TeaVarietyDecorator implements IBeverage {
	protected beverage: IBeverage

	constructor(beverage: IBeverage) {
		this.beverage = beverage
	}

	getDescription(): string {
		return this.beverage.getDescription() + ', ' + this.getVarietyDescription()
	}

	getCost(): number {
		return this.beverage.getCost()
	}

	protected abstract getVarietyDescription(): string
}

class EarlGreyTea extends TeaVarietyDecorator {
	protected getVarietyDescription(): string {
		return 'Earl Grey'
	}
}

class GreenTea extends TeaVarietyDecorator {
	protected getVarietyDescription(): string {
		return 'Green'
	}
}

class ChamomileTea extends TeaVarietyDecorator {
	protected getVarietyDescription(): string {
		return 'Chamomile'
	}
}

class BlackTea extends TeaVarietyDecorator {
	protected getVarietyDescription(): string {
		return 'Black'
	}
}

export {
	TeaVarietyDecorator,
	EarlGreyTea,
	GreenTea,
	ChamomileTea,
	BlackTea,
}

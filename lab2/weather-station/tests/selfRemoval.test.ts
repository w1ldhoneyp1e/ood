import {type IObserver} from '../observer/Observer'
import {CWeatherData} from '../WheatherData'

interface WeatherInfo {
	temperature: number,
	humidity: number,
	pressure: number,
}

describe('self removal', () => {
	test('no mistakes with removal', () => {
		const wd = new CWeatherData()

		let selfCalls = 0
		let otherCalls = 0

		const selfObserver: IObserver<WeatherInfo> = {
			update: () => {
				selfCalls++
				wd.removeObserver(selfObserver)
			},
		}

		const otherObserver: IObserver<WeatherInfo> = {
			update: () => {
				otherCalls++
			},
		}

		wd.registerObserver(selfObserver)
		wd.registerObserver(otherObserver)

		wd.setMeasurements(1, 0.5, 750)
		expect(selfCalls).toBe(1)
		expect(otherCalls).toBe(1)

		wd.setMeasurements(2, 0.6, 751)
		expect(selfCalls).toBe(1)
		expect(otherCalls).toBe(2)
	})
})



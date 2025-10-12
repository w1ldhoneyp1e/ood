import {WEATHER_EVENT_TYPE} from '../events/EventTypes'
import {
	FishingDisplay,
	FullWeatherDisplay,
	WeatherStationWithEvents,
} from '../events/WeatherStationWithEvents'

describe('Eventы', () => {
	let weatherStation: WeatherStationWithEvents
	let fishingDisplay: FishingDisplay
	let fullDisplay: FullWeatherDisplay

	beforeEach(() => {
		weatherStation = new WeatherStationWithEvents()
		fishingDisplay = new FishingDisplay()
		fullDisplay = new FullWeatherDisplay()

		weatherStation.registerObserver(fishingDisplay, [
			WEATHER_EVENT_TYPE.temperature,
			WEATHER_EVENT_TYPE.pressure,
		], 10)

		weatherStation.registerObserver(fullDisplay, [
			WEATHER_EVENT_TYPE.temperature,
			WEATHER_EVENT_TYPE.humidity,
			WEATHER_EVENT_TYPE.pressure,
			WEATHER_EVENT_TYPE.windSpeed,
			WEATHER_EVENT_TYPE.windDirection,
		], 5)
	})

	test('FishingDisplay should not receive humidity events', () => {
		const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

		weatherStation.setInsideMeasurements({
			temperature: 20,
			humidity: 0.6,
			pressure: 760,
		})

		const humidityLogs = consoleSpy.mock.calls.filter(call =>
			call[0]?.includes('Humidity:'),
		)

		expect(humidityLogs).toHaveLength(1)

		consoleSpy.mockRestore()
	})

	test('FishingDisplay should not receive wind events', () => {
		const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

		weatherStation.setOutsideMeasurements({
			temperature: 20,
			humidity: 0.5,
			pressure: 760,
			windSpeed: 15,
			windDirection: 90,
		})

		const windLogs = consoleSpy.mock.calls.filter(call =>
			call[0]?.includes('Wind speed:') || call[0]?.includes('Wind direction:'),
		)

		expect(windLogs).toHaveLength(2)

		consoleSpy.mockRestore()
	})
})

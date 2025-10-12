import {WeatherData} from '../signals/WeatherDataSignals'

describe('Signals', () => {
	let weatherData: WeatherData

	beforeEach(() => {
		weatherData = new WeatherData()
	})

	test('emit', () => {
		const mockHandler = jest.fn()
		weatherData.temperatureChanged.connect(mockHandler)

		weatherData.setMeasurements({
			temperature: 25,
			humidity: 0.5,
			pressure: 760,
		})

		expect(mockHandler).toHaveBeenCalledTimes(1)
		expect(mockHandler).toHaveBeenCalledWith(25)
	})

	test('not emit - temperature stays the same', () => {
		const mockHandler = jest.fn()
		weatherData.temperatureChanged.connect(mockHandler)

		weatherData.setMeasurements({
			temperature: 0,
			humidity: 0.5,
			pressure: 760,
		})

		expect(mockHandler).toHaveBeenCalledTimes(0)
	})

	test('emit multiple signals', () => {
		const tempHandler = jest.fn()
		const humidityHandler = jest.fn()
		const pressureHandler = jest.fn()

		weatherData.temperatureChanged.connect(tempHandler)
		weatherData.humidityChanged.connect(humidityHandler)
		weatherData.pressureChanged.connect(pressureHandler)

		weatherData.setMeasurements({
			temperature: 25,
			humidity: 0.8,
			pressure: 750,
		})

		expect(tempHandler).toHaveBeenCalledTimes(1)
		expect(humidityHandler).toHaveBeenCalledTimes(1)
		expect(pressureHandler).toHaveBeenCalledTimes(1)
	})

	test('disconnecting from signals', () => {
		const mockHandler = jest.fn()
		const connection = weatherData.temperatureChanged.connect(mockHandler)

		weatherData.setMeasurements({
			temperature: 25,
			humidity: 0.5,
			pressure: 760,
		})

		expect(mockHandler).toHaveBeenCalledTimes(1)

		connection.disconnect()

		weatherData.setMeasurements({
			temperature: 30,
			humidity: 0.5,
			pressure: 760,
		})

		expect(mockHandler).toHaveBeenCalledTimes(1)
	})

	test('multiple slots for the same signal', () => {
		const handler1 = jest.fn()
		const handler2 = jest.fn()

		weatherData.temperatureChanged.connect(handler1)
		weatherData.temperatureChanged.connect(handler2)

		weatherData.setMeasurements({
			temperature: 25,
			humidity: 0.5,
			pressure: 760,
		})

		expect(handler1).toHaveBeenCalledTimes(1)
		expect(handler2).toHaveBeenCalledTimes(1)
	})
})


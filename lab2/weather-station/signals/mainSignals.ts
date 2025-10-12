/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	CurrentConditionsDisplay,
	StatisticsDisplay,
	WindDisplay,
} from './Displays'
import {WeatherData} from './WeatherDataSignals'

function main(): void {
	const weatherData = new WeatherData()

	const currentDisplay = new CurrentConditionsDisplay(weatherData)
	const statsDisplay = new StatisticsDisplay(weatherData)
	const windDisplay = new WindDisplay(weatherData)

	console.log('Setting basic measurements:')
	weatherData.setMeasurements({
		temperature: 22,
		humidity: 0.6,
		pressure: 760,
	})

	console.log('Setting pro measurements:')
	weatherData.setProMeasurements({
		temperature: 25,
		humidity: 0.7,
		pressure: 755,
		windSpeed: 12,
		windDirection: 180,
	})

	console.log('Setting another pro measurement:')
	weatherData.setProMeasurements({
		temperature: 20,
		humidity: 0.8,
		pressure: 750,
		windSpeed: 15,
		windDirection: 270,
	})

	console.log('Disconnecting wind display:')
	windDisplay.disconnect()

	console.log('Setting measurement after wind display disconnected:')
	weatherData.setProMeasurements({
		temperature: 18,
		humidity: 0.9,
		pressure: 745,
		windSpeed: 20,
		windDirection: 90,
	})
}

main()


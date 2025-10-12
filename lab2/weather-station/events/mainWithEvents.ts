import {WEATHER_EVENT_TYPE} from './EventTypes'
import {
	FishingDisplay,
	FullWeatherDisplay,
	WeatherStationWithEvents,
} from './WeatherStationWithEvents'

function main(): void {
	console.log('Weather station with event system demonstration\n')

	const weatherStation = new WeatherStationWithEvents()

	const fishingDisplay = new FishingDisplay()
	const fullDisplay = new FullWeatherDisplay()

	console.log('Registering displays...')

	weatherStation.registerObserver(fishingDisplay, [WEATHER_EVENT_TYPE.temperature, WEATHER_EVENT_TYPE.pressure], 10)

	weatherStation.registerObserver(fullDisplay, [
		WEATHER_EVENT_TYPE.temperature,
		WEATHER_EVENT_TYPE.humidity,
		WEATHER_EVENT_TYPE.pressure,
		WEATHER_EVENT_TYPE.windSpeed,
		WEATHER_EVENT_TYPE.windDirection,
	], 5)

	console.log('\nSetting inside station data...')
	weatherStation.setInsideMeasurements({
		temperature: 22,
		humidity: 0.5,
		pressure: 760,
	})

	console.log('\nSetting outside station data...')
	weatherStation.setOutsideMeasurements({
		temperature: -5,
		humidity: 0.8,
		pressure: 745,
		windSpeed: 12,
		windDirection: 180,
	})

	console.log('\nChanging only outside temperature...')
	weatherStation.setOutsideMeasurements({
		temperature: -15,
		humidity: 0.8,
		pressure: 745,
		windSpeed: 12,
		windDirection: 180,
	})

	console.log('\nChanging only inside pressure...')
	weatherStation.setInsideMeasurements({
		temperature: 22,
		humidity: 0.5,
		pressure: 780,
	})

	console.log('\nSubscription information:')
	const fishingInfo = weatherStation.getObserverInfo(fishingDisplay)
	const fullInfo = weatherStation.getObserverInfo(fullDisplay)

	console.log('Fishing display subscribed to:', fishingInfo?.eventTypes)
	console.log('Full display subscribed to:', fullInfo?.eventTypes)

	console.log('\nUnsubscribing full display from wind events...')
	weatherStation.unregisterObserver(fullDisplay, [WEATHER_EVENT_TYPE.windSpeed, WEATHER_EVENT_TYPE.windDirection])

	console.log('\nChanging wind speed (full display no longer receives these events)...')
	weatherStation.setOutsideMeasurements({
		temperature: -15,
		humidity: 0.8,
		pressure: 745,
		windSpeed: 20,
		windDirection: 270,
	})

	console.log('\nDemonstration completed!')
}

main()

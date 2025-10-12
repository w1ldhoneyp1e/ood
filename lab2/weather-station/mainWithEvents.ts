import { CWeatherStationWithEvents, FishingDisplay, FullWeatherDisplay } from './WeatherStationWithEvents'
import { WeatherEventType } from './EventTypes'

function main(): void {
	console.log('🌤️  Демонстрация метеостанции с системой событий\n')

	const weatherStation = new CWeatherStationWithEvents()

	// Создаем дисплеи
	const fishingDisplay = new FishingDisplay()
	const fullDisplay = new FullWeatherDisplay()

	console.log('📡 Регистрируем дисплеи...')
	
	// Рыбаки подписываются только на температуру и давление
	weatherStation.registerObserver(fishingDisplay, [WeatherEventType.TEMPERATURE, WeatherEventType.PRESSURE], 10)
	
	// Полный дисплей подписывается на все события
	weatherStation.registerObserver(fullDisplay, [
		WeatherEventType.TEMPERATURE,
		WeatherEventType.HUMIDITY,
		WeatherEventType.PRESSURE,
		WeatherEventType.WIND_SPEED,
		WeatherEventType.WIND_DIRECTION
	], 5)

	console.log('\n🏠 Устанавливаем данные внутренней станции...')
	weatherStation.setInsideMeasurements({
		temperature: 22,
		humidity: 0.5,
		pressure: 760
	})

	console.log('\n🌬️  Устанавливаем данные внешней станции...')
	weatherStation.setOutsideMeasurements({
		temperature: -5,
		humidity: 0.8,
		pressure: 745,
		windSpeed: 12,
		windDirection: 180
	})

	console.log('\n🔄 Изменяем только температуру снаружи...')
	weatherStation.setOutsideMeasurements({
		temperature: -15, // Только температура изменилась
		humidity: 0.8,
		pressure: 745,
		windSpeed: 12,
		windDirection: 180
	})

	console.log('\n🔄 Изменяем только давление внутри...')
	weatherStation.setInsideMeasurements({
		temperature: 22,
		humidity: 0.5,
		pressure: 780 // Только давление изменилось
	})

	console.log('\n📊 Информация о подписках:')
	const fishingInfo = weatherStation.getObserverInfo(fishingDisplay)
	const fullInfo = weatherStation.getObserverInfo(fullDisplay)
	
	console.log('Рыбацкий дисплей подписан на:', fishingInfo?.eventTypes)
	console.log('Полный дисплей подписан на:', fullInfo?.eventTypes)

	console.log('\n🔌 Отписываем полный дисплей от событий ветра...')
	weatherStation.unregisterObserver(fullDisplay, [WeatherEventType.WIND_SPEED, WeatherEventType.WIND_DIRECTION])

	console.log('\n🌪️  Изменяем скорость ветра (полный дисплей больше не получает эти события)...')
	weatherStation.setOutsideMeasurements({
		temperature: -15,
		humidity: 0.8,
		pressure: 745,
		windSpeed: 20, // Изменилась скорость ветра
		windDirection: 270 // Изменилось направление ветра
	})

	console.log('\n✅ Демонстрация завершена!')
}

main()

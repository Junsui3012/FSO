import { useEffect, useState } from "react"

const WeatherWidget = ({ capital, lat, lng, notify }) => {

  const API_KEY = import.meta.env.VITE_OPENWEATHER

  const [temp, setTemp] = useState(null)
  const [windSpeed, setWindSpeed] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    const getWeatherData = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`Failed to get weather data: ${response.status} ${response.statusText}`)

        const data = await response.json()

        const img_icon = data.weather[0].icon

        setTemp(data.main.temp)
        setWindSpeed(data.wind.speed)
        setImageUrl(`https://openweathermap.org/img/wn/${img_icon}@2x.png`)
      }
      catch (err) {
        notify("error", err.message)
      }
    }
    getWeatherData()
  }, [capital])

  return (
    <div>
      <h2>Weather of {capital}</h2>
      <p>Temperature: {temp}&deg;C</p>
      <img src={imageUrl} alt="Weather Image" />
      <p>Wind: {windSpeed} m/s</p>
    </div>
  )
}

export default WeatherWidget
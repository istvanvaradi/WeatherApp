import React, { useState } from 'react'
require('dotenv').config({ path: '../.env' })
console.log(process.env)
require('dotenv').config()
let weatherKey = process.env.REACT_APP_BASE_URL_KEY
const api = {
  key: weatherKey,
  base: 'https://api.openweathermap.org/data/2.5/',
}

function App() {
  const [query, setQuery] = useState('')

  const [name, setName] = useState('')
  const [temp, setTemp] = useState('')
  const [main, setMain] = useState('')
  const [placeholder, setPlaceholder] = useState('search...')
  const url = `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`

  const placeholderFunction = () => {
    setPlaceholder('example search: Budapest,HU +ENTER')
  }

  const search = (evt) => {
    if (evt.key === 'Enter') {
      fetch(url)
        .then((res) => res.json())
        .then((result) => {
          setQuery('')
          setTemp(Math.round(result.main.temp))
          setName(result.name)
          setMain(result.weather[0].main)
        })
    }
  }

  const dateBuilder = (d) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div
      className={
        main === 'Rain'
          ? 'app rain'
          : temp > 25
          ? 'app warm'
          : main === 'Clear'
          ? 'app clear'
          : (temp > 5 && temp < 25) || main === 'Clouds'
          ? 'app norm'
          : 'app'
      }
    >
      <main>
        <div className="search-box">
          <input
            onClick={placeholderFunction}
            type="text"
            className="search-bar"
            placeholder={placeholder}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        <div className="location-box">
          <div onKeyPress={search} className="location">
            {name}
          </div>
          <div className="date">{dateBuilder(new Date())}</div>
          <div className="weather-box">
            <div onKeyPress={search} className="temp">
              {temp}°C
            </div>
            <div onKeyPress={search} className="weather">
              {main}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

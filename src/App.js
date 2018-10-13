import React, { Component } from 'react'

import Moment from 'moment'
import 'moment/locale/de'
import { extendMoment } from 'moment-range'

import Calendar from './components/Calendar'

const moment = extendMoment(Moment)
Moment.locale('de')

const start = moment.utc('2018-05-01', 'YYYY-MM-DD')
const end = moment(start).add(1, 'year')

const mesocycles = [
  {
    range: moment.range(moment.utc('2018-07-23'), moment.utc('2018-09-16')),
    color: 'blue',
    name: 'VP 1',
  },
  {
    range: moment.range(moment.utc('2018-09-17'), moment.utc('2018-11-11')),
    color: 'green',
    name: 'VP 2',
  },
  {
    range: moment.range(moment.utc('2018-11-12'), moment.utc('2019-01-13')),
    color: 'red',
    name: 'VP 3',
  },
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <Calendar ranges={mesocycles} start={start} end={end} />
      </div>
    )
  }
}

export default App

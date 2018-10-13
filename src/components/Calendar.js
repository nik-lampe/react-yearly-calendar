import React, { Component } from 'react'
import { times, max } from 'lodash'
import {
  Month,
  Cell,
  Day,
  DayHeader,
  MonthName,
  DayInner,
  DayNumber,
  Mesocycle,
  Container,
  MonthColumn,
  Header,
  Content,
  Body,
} from './StyledComponents'

import Moment from 'moment'
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment)
moment.locale('de')

class Calendar extends Component {
  render() {
    const { start, end, ranges } = this.props

    const range = moment.range(moment(start), moment(end))
    const months = Array.from(range.by('month', { step: 1 }))

    const totalLengths = months.map(
      m => Number(m.daysInMonth()) + Number(m.format('E')),
    )

    const sortedRanges = ranges
      .sort((a, b) => a.range.start.isAfter(b.range.start))
      .reduce((acc, current) => {
        const overlapping = acc.find(({ range }) =>
          range.overlaps(current.range, { adjacent: true }),
        )
        return [
          ...acc,
          { ...current, index: overlapping ? overlapping.index + 1 : 1 },
        ]
      }, [])

    const maxLength = max(totalLengths)

    return (
      <Container>
        <MonthColumn>
          {months.map(month => (
            <MonthName>{month.format('MMM')}</MonthName>
          ))}
        </MonthColumn>

        <Content>
          <Header>
            {times(maxLength).map(i => {
              const day = moment.utc((i % 7) + 1, 'E')
              return (
                <DayHeader dayOfWeek={(i % 7) + 1}>
                  <DayNumber>{day.format('dd')}</DayNumber>
                </DayHeader>
              )
            })}
          </Header>
          <Body>
            {months.map(month => {
              const days = Array.from(month.range('month').by('day'))
              return (
                <Month>
                  {times(Number(month.format('E')) - 1, i => (
                    <Day dayOfWeek={i + 1}>{}</Day>
                  ))}
                  {days.map(day => {
                    return (
                      <Day dayOfWeek={day.format('E')} day={day}>
                        <DayNumber>
                          <div>{day.format('D')}</div>
                          {day.format('E') == 1 && (
                            <div>{day.format('ww')}</div>
                          )}
                        </DayNumber>
                      </Day>
                    )
                  })}
                  {times(
                    maxLength -
                      month.daysInMonth() -
                      (Number(month.format('E')) - 1),
                  ).map(i => {
                    const dayOfWeek =
                      ((Number(
                        moment(month)
                          .endOf('month')
                          .format('E'),
                      ) +
                        i) %
                        7) +
                      1
                    return <Day dayOfWeek={dayOfWeek}>{}</Day>
                  })}
                  {sortedRanges
                    .filter(m => m.range.overlaps(month.range('month')))
                    .map(m => (
                      <Mesocycle
                        mesocycle={m}
                        month={month}
                        range={m.range.intersect(month.range('month'))}
                      >
                        {m.name}
                      </Mesocycle>
                    ))}
                </Month>
              )
            })}
          </Body>
        </Content>
      </Container>
    )
  }
}

export default Calendar

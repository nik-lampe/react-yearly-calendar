import React, { Component } from 'react'
import styled from 'styled-components'
import { times, max } from 'lodash'

import Moment from 'moment'
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment)
moment.locale('de')

export const Month = styled.div`
  display: flex;
  position: relative;
`

const cellSize = 20

export const Cell = styled.div`
  padding: 4px;
  color: rgba(0, 0, 0, 0.37);
  width: ${cellSize}px;
  height: ${cellSize * 2}px;
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
  /* border: 1px solid gray; */
  box-sizing: content-box;
`

export const Day = styled(Cell)`
  /* margin-right: ${props => (props.dayOfWeek == 7 ? '4px' : 0)}; */
  /* border-right: ${props =>
    props.dayOfWeek == 7
      ? '1px solid black'
      : '1px solid rgba(0, 0, 0, 0.1)'}; */
  background-color: ${props => props.dayOfWeek >= 6 && 'rgba(0, 0, 0, 0.1)'};
  background-color: ${props =>
    props.day && props.day.isSame(moment(), 'day') && 'rgba(0, 0, 0, 0.57)'};
    color: ${props =>
      props.day && props.day.isSame(moment(), 'day') && 'white'};
  position: relative;
  transition: color 200ms cubic-bezier(0.075, 0.82, 0.165, 1);
  cursor: pointer;
  &:hover {
    color: rgba(0, 0, 0, 0.87);
  }
`

export const DayHeader = styled(Cell)`
  /* margin-right: ${props => (props.dayOfWeek == 7 ? '4px' : 0)}; */
  background-color: ${props => props.dayOfWeek >= 6 && 'rgba(0, 0, 0, 0.1)'};
  position: relative;
  height: ${cellSize}px;
`

export const MonthName = styled(Cell)`
  width: ${cellSize * 2};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const DayInner = styled.div`
  position: absolute;
  margin-left: -4px;
  margin-top: -4px;
  width: 100%;
  height: 100%;
`

export const DayNumber = styled(DayInner)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 4px;
`

export const Mesocycle = styled.div`
  display: flex;
  position: absolute;
  background-color: ${props => props.mesocycle.color};
  width: ${props =>
    Array.from(props.range.by('day')).length * (cellSize + 8)}px;
  height: 4px;
  bottom: ${props => props.mesocycle.index * 8}px;
  opacity: 0.5;
  margin-left: ${props =>
    (Number(props.month.format('E')) -
      1 +
      Number(props.range.start.format('D')) -
      1) *
    (cellSize + 8)}px;
`

export const Container = styled.div`
  display: flex;
`

export const MonthColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  & > *:first-child {
    margin-top: ${cellSize * 2 + 8}px;
  }
`

export const Header = styled.div`
  display: flex;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
`

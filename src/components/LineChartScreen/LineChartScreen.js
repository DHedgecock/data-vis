import React, { useEffect } from 'react'
import { Header } from 'componentry'
import {
  axisBottom,
  axisLeft,
  extent,
  line,
  scaleLinear,
  scaleTime,
  select,
  timeParse,
} from 'd3'

const dataset = require('./weather-data.json')

const dateParser = timeParse('%Y-%m-%d')

// --- Data accessors
const yAccessor = d => d.temperatureMax
const xAccessor = d => dateParser(d.date)

// --- Chart dimensions
const dimensions = {
  width: window.innerWidth * 0.9,
  height: 400,
  margin: {
    top: 15,
    right: 15,
    bottom: 40,
    left: 60,
  },
}

dimensions.boundedWidth =
  dimensions.width - dimensions.margin.left - dimensions.margin.right
dimensions.boundedHeight =
  dimensions.height - dimensions.margin.top - dimensions.margin.bottom

// --- THE CHART
function drawLineChart() {
  // Create the chart root
  const wrapper = select('#chart-container')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)

  // Add the bounds group
  const bounds = wrapper
    .append('g')
    .style(
      'transform',
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`,
    )

  // Create scales
  const yScale = scaleLinear()
    .domain(extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0])

  const xScale = scaleTime()
    .domain(extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth])

  // Add freezing temps shader
  const freezingTemperaturePlacement = yScale(32)
  bounds
    .append('rect')
    .attr('x', 0)
    .attr('width', dimensions.boundedWidth)
    .attr('y', freezingTemperaturePlacement)
    .attr('height', dimensions.boundedHeight - freezingTemperaturePlacement)
    .attr('fill', '#e0f3f3')

  // Temperatures line
  const lineGenerator = line()
    .x(d => xScale(xAccessor(d)))
    .y(d => yScale(yAccessor(d)))

  bounds
    .append('path')
    .attr('d', lineGenerator(dataset))
    .attr('fill', 'none')
    .attr('stroke', '#af9358')
    .attr('stroke-width', 2)

  // Append scales last so they overlay everything else
  const yAxisGenerator = axisLeft().scale(yScale)
  bounds.append('g').call(yAxisGenerator)

  const xAxisGenerator = axisBottom().scale(xScale)
  bounds
    .append('g')
    .call(xAxisGenerator)
    .style('transform', `translateY(${dimensions.boundedHeight}px)`)
}

export default function LineChartScreen() {
  useEffect(() => {
    drawLineChart()
  }, [])

  return (
    <div className='screen-container'>
      <Header as='h2'>Line Chart</Header>
      <div id='chart-container' />
      <article>
        <h3>Line chart notes</h3>
        <ul>
          <li>First chart with D3 🎉</li>
          <li>
            Data accessor fns aren't required but are a good best practice for
            maintainability and for thinking through dataset before starting the
            visualization.
          </li>
        </ul>
      </article>
    </div>
  )
}

d3.csv("sales.csv")
  .then(data => visualize(data.map(d => {
    d.sales = parseInt(d.sales)
    return d
  })))


function visualize(data) {
  const margin = {top: 5, bottom: 50, left: 50, right: 5}
  const width = 600
  const height = 400
  const svg = d3.select('body').append('svg')
    .attr('width', width+margin.left+margin.right)
    .attr('height', height+margin.top+margin.bottom)

  const barGroup = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.sales)])
    .range([0, width])

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.month))
    .range([0, height])
    .paddingInner(0.1)

  barGroup.selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', 0)
    .attr('y', d => yScale(d.month))
    .attr('width', d => xScale(d.sales))
    .attr('height', yScale.bandwidth())
    .attr('fill', "blue")

  const xAxis = d3.axisBottom(xScale)

  const yAxis = d3.axisLeft(yScale)

  const xAxisGroup = svg.append('g')
    .attr("transform", `translate(${margin.left},${height+margin.top})`)
    .call(xAxis)

  const yAxisGroup = svg.append('g')
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .call(yAxis)
}

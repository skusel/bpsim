import { useEffect, useRef } from 'react';

import { select } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';

export default function BarGraph({ results }) {
  const graph = useRef(null)

  const margin = {top: 0, right: 20, bottom: 35, left: 100};
  const width = 750 - margin.left - margin.right;
  const height = 175 - margin.top - margin.bottom;

  // Define x-axis as [0, 100]
  const scaleX = scaleLinear().domain([0, 100]).range([0, width])
  // Define y-axis as having to categories: (1) Predicted, (2) Mispredicted
  const scaleY = scaleBand().domain(["Correct", "Mispredicted"]).range([0, height]).padding(0.3);

  //const animationDuration = 800; // ms

  // useEffect is used to run d3 code after the component mounts
  useEffect(() => {
    const graphSvg = select(graph.current);

    const percentCorrect = results !== null ? (results.numCorrect) / (results.numCorrect + results.numIncorrect) * 100 : 0;
    const percentMispredicted = results !== null ? (results.numIncorrect) / (results.numCorrect + results.numIncorrect) * 100 : 0;
    
    // Add x-axis
    const xAxis = axisBottom(scaleX).tickFormat(d => d + "%");
    graphSvg.select("#x-axis")
      .call(xAxis)
      .style("font-size", "14px");
    // Add y-axis
    graphSvg.select("#y-axis")
      .call(axisLeft(scaleY))
      .style("font-size", "14px");
    // Add predicted bar
    graphSvg.select("#correct-bar")
      .attr("x", 0)
      .attr("y", scaleY("Correct"))
      .attr("width", scaleX(percentCorrect))
      .attr("height", scaleY.bandwidth())
      .attr("fill", "#66B2FF");
    // Add mispredicted bar
    graphSvg.select("#mispredicted-bar")
      .attr("x", 0)
      .attr("y", scaleY("Mispredicted"))
      .attr("width", scaleX(percentMispredicted))
      .attr("height", scaleY.bandwidth())
      .attr("fill", "#66B2FF");
  }, [scaleX, scaleY, results]);

  return (
    <svg
      ref={graph}
      width="100%"
      height="100%"
      viewBox="0 0 750 175"
      preserveAspectRatio="xMinYMin meet"
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g id="x-axis" transform={`translate(0, ${height})`} />
        <g id="y-axis" />
        <rect id="correct-bar" />
        <rect id="mispredicted-bar" />
      </g>
    </svg>
  )
}

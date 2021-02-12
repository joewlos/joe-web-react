// React
import React from 'react';

// React Plotly
import Plot from 'react-plotly.js';

// Resize observer
import useResizeObserver from 'use-resize-observer';

// Create a sunburst chart with labels
function StackedBar(props) {
    const data = props.data;
    const useX = props.x;

    // Get the resizing info
    const { ref, width = 1, height = 1 } = useResizeObserver();

    // Show a loading message if the data is not available
    const loading = <p>Loading...</p>
    if (!data) {
        return (loading);
    };

    // Use the x or y axis for percentage
    var xAxis = { tickfont: { size: 16 } };
    var yAxis = { tickfont: { size: 16 } };
    var margin = { l: 70, r: 0, b: 20, t: 0};
    if (useX) {
        xAxis.tickformat = '%';
    } else {
        yAxis.tickformat = '%';
        xAxis.tickangle = -45;
        margin.b = 110;
        margin.l = 30;
    };

    // Return the chart
    return (
        <div style={ { width: '100%', height: '100%'} } ref={ ref }>
            <Plot
                data={ data }
                config={ {displayModeBar: false} }
                layout={ {
                    width: width, 
                    height: height, 
                    margin: margin,
                    paper_bgcolor: 'rgba(0, 0, 0, 0)',
                    plot_bgcolor: 'rgba(0, 0, 0, 0)',
                    barmode: 'stack',
                    font: { family: 'Raleway, sans-serif' },
                    xaxis: xAxis,
                    yaxis: yAxis,
                    legend: { font: { size: 16 } }
                } }
            />
        </div>
    );
};

export default StackedBar;
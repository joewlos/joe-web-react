// React
import React from 'react';

// React Plotly
import Plot from 'react-plotly.js';

// Resize observer
import useResizeObserver from 'use-resize-observer';

// Create a sunburst chart with labels
function LineChart(props) {
    const x = props.x;
    const y = props.y;

    // Get the resizing info
    const { ref, width = 1, height = 1 } = useResizeObserver();

    // Show a loading message if the data is not available
    const loading = <p>Loading...</p>
    if (!x) {
        return (loading);
    };

    // Return the chart
    return (
        <div style={ { width: '100%', height: '100%'} } ref={ ref }>
            <Plot
                data={ [
                    {
                        x: x,
                        y: y,
                        type: 'line',
                        line: {
                            color: '#555B6E',
                            width: 3
                        },
                        hoverinfo: 'y'
                    },
                    {
                        x: x,
                        y: Array.from({length: x.length}, (v, i) => 50),
                        type: 'line',
                        line: {
                            dash: 'dot',
                            color: '#8F94A3'
                        },
                        hoverinfo: 'skip'
                    }
                ] }
                config={ {displayModeBar: false} }
                layout={ {
                    width: width, 
                    height: height, 
                    margin: { l: 50, r: 25, b: 35, t: 20, pad: 15 },
                    paper_bgcolor: 'rgba(0, 0, 0, 0)',
                    plot_bgcolor: 'rgba(0, 0, 0, 0)',
                    font: { family: 'Raleway, sans-serif' },
                    showlegend: false,
                    xaxis: { tickfont: { size: 16 } },
                    yaxis: { tickfont: { size: 16 }, tickformat: '$', range: [20, 80], autorange: false}
                } }
            />
        </div>
    );
};

export default LineChart;
// React
import React from 'react';

// React Plotly
import Plot from 'react-plotly.js';

// Resize observer
import useResizeObserver from 'use-resize-observer';

// Create a sunburst chart with labels
function Sunburst(props) {
    const data = props.data;

    // Get the resizing info
    const { ref, width = 1, height = 1 } = useResizeObserver();

    // Show a loading message if the data is not available
    const loading = <p>Loading...</p>
    if (!data) {
        return (loading);
    };

    // Get the labels, parents, values, and colors from the data
    const labels = data.labels;
    const parents = data.parents;
    const values = data.values;
    const colors = data.colors;

    // Return the chart
    return (
        <div style={ { width: '100%', height: '100%'} } ref={ ref }>
            <Plot
                data={ [{
                    type: 'sunburst',
                    labels: labels,
                    parents: parents,
                    values: values,
                    leaf: {opacity: 1},
                    marker: {
                        colors: colors,
                        line: {
                            width: 2,
                            color: '#FAF9F9'
                        }
                    },
                    branchvalues: 'total',
                    hovertemplate: '<extra></extra><b>%{label}</b><br>%{value:.0%}',
                    textfont: {family: 'Raleway'},
                    hoverlabel: {font: {family: 'Raleway'}}
                }] }
                config={ {displayModeBar: false} }
                layout={ {
                    width: width, 
                    height: height, 
                    margin: { l: 0, r: 0, b: 0, t: 0},
                    paper_bgcolor: 'rgba(0, 0, 0, 0)'
                } }
            />
        </div>
    );
};

export default Sunburst;
'''
API V1 ROUTES FOR FLASK APP
'''
# Import the app
from api.app import app

# Import required packages
from plotly import graph_objects as go
from plotly import io

'''
ROUTES
All routes must be prefaced with '/api/v1'
'''
# Return the message to display on the homepage
@app.route('/api/v1/home_message')
def home_message():
    return {'message': 'Welcome : )'}

'''
PLOTLY
Return plotly data
'''
# Voting method sunburst and bar charts
@app.route('/api/v1/red_mirage_data')
def red_mirage_data():
    data = {
        'vbm_sunburst': {
            'labels': [
                'Voting Method',
                'By Mail',
                'In Person',
                'Unsure',
                'Biden',
                'Trump',
                'Other',
                'Biden',
                'Trump',
                'Other',
                'Biden',
                'Trump',
                'Other'
            ],
            'parents': [
                '',
                'Voting Method',
                'Voting Method',
                'Voting Method',
                'By Mail',
                'By Mail',
                'By Mail',
                'In Person',
                'In Person',
                'In Person',
                'Unsure',
                'Unsure',
                'Unsure'
            ],
            'values': [
                1,
                0.39,
                0.49,
                0.12,
                0.27,
                0.07,
                0.05,
                0.15,
                0.30,
                0.04,
                0.06,
                0.03,
                0.03
            ],
            'colors': [
                'rgba(0, 0, 0, 0)',
                '#8f94a3',
                '#555b6e',
                '#dddfe4',
                '#add2ff',
                '#e46f62',
                '#dddfe4',
                '#add2ff',
                '#e46f62',
                '#dddfe4',
                '#add2ff',
                '#e46f62',
                '#dddfe4'
            ]
        },
        'fraud_stacked': [
            {
                'y': ['Biden ', 'Trump '],
                'x': [0.59, 0.09],
                'name': 'Not at All Likely',
                'type': 'bar',
                'orientation': 'h',
                'marker': {'color': '#555b6e'},
                'hoverinfo': 'x'
            },
            {
                'y': ['Biden ', 'Trump '],
                'x': [0.29, 0.34],
                'name': 'Somewhat Likely',
                'type': 'bar',
                'orientation': 'h',
                'marker': {'color': '#8f94a3'},
                'hoverinfo': 'x'
            },
            {
                'y': ['Biden ', 'Trump '],
                'x': [0.09, 0.55],
                'name': 'Very Likely',
                'type': 'bar',
                'orientation': 'h',
                'marker': {'color': '#e46f62'},
                'hoverinfo': 'x'
            },
            {
                'y': ['Biden ', 'Trump '],
                'x': [0.03, 0.02],
                'name': 'Unsure',
                'type': 'bar',
                'orientation': 'h',
                'marker': {'color': '#dddfe4'},
                'hoverinfo': 'x'
            }
        ],
        'expect_stacked': [
            {
                'x': ['On 11/03 ', 'Within One Week ', 'End of November ', 'In December '],
                'y': [0.10, 0.22, 0.12, 0.05],
                'name': 'Biden',
                'type': 'bar',
                'marker': {'color': '#add2ff'},
                'hoverinfo': 'y'
            },
            {
                'x': ['On 11/03 ', 'Within One Week ', 'End of November ', 'In December '],
                'y': [0.18, 0.15, 0.09, 0.08],
                'name': 'Trump',
                'type': 'bar',
                'marker': {'color': '#e46f62'},
                'hoverinfo': 'y'
            },
        ]
    }
    return data

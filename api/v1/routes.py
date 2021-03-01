'''
API V1 ROUTES FOR FLASK APP
'''
# Import the app
from api.app import app

# Import required packages
import pandas as pd
from pathlib import Path

# Disable warnings
pd.options.mode.chained_assignment = None 


'''
DATABASE CONNECTION & MODELS
'''
# Import database 
from api.v1.models.shared import db

# Initialize on the application
db.init_app(app)

# Import the model for properties in Cook County
from api.v1.models.cook_county import CookCounty


'''
ROUTES
All routes must be prefaced with '/api/v1'
'''
# Return the message to display on the homepage
@app.route('/api/v1/home_message')
def home_message():
    return {
        'message': 'Welcome : )'
    }

# Return the id from our database connection as an example
@app.route('/api/v1/database_example')
def database_example():
    first_pin = CookCounty.query.first().id
    return {
        'example_pin': first_pin
    }


'''
RED MIRAGE
Static data for Plotly
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

'''
PREDICTIT
Load history from CSV and parse
'''
# Function for cleaning the dataframe float values
def clean_df(df, col_lst):
    for col in col_lst:

        # pylint: disable=fixme, anomalous-backslash-in-string
        df[col] = df[col].replace('[\$,)]', '', regex=True)
        df[col] = df[col].replace('[(]','-', regex=True)
        df[col] = df[col].astype(float)
    
    # Return the dataframe
    return df

# Line chart and active markets
@app.route('/api/v1/predictit_data')
def predictit_data():

    # Open the csv as a dataframe and clean the ($) and date format
    path = Path(__file__).parent / "../v1/csv/TradeHistory.csv"
    cols = ['Price', 'ProfitLoss', 'Fees', 'Risk', 'CreditDebit']
    df = clean_df(
        pd.read_csv(path, parse_dates=['DateExecuted']), 
        cols
    )

    # Parse dates and encode market names
    df['DateExecuted'] = df['DateExecuted'].dt.strftime('%Y-%m-%d %H:%M')

    # Reverse by the date and add a portfolio value and volume column
    df.sort_index(ascending=False, inplace=True)
    df['Invested'] = df['Risk'].cumsum().abs().round(2)
    df['Cash'] = df['CreditDebit'].cumsum().round(2) + 50.0
    df['Total'] = df['Invested'] + df['Cash'] 
    df['Volume'] = df['Shares'] * df['Price']

    # Set the variables for total performance
    invested = df['Invested'][0]
    cash = df['Cash'][0]
    total = df['Total'][0]
    performance = df['Total'][0] - 50.0

    # Put the line chart data and overall values into the output
    output = {
        'overall': {
            'invested': invested,
            'cash': cash,
            'total': total,
            'performance': performance
        },
        'performance_x': list(df['DateExecuted']),
        'performance_y': [round(x, 2) for x in list(df['Total'])]
    }

    # Make a monthly df to get values for performance
    df['Month'] = df['DateExecuted'].map(lambda x: x[:7])
    month_df = df.groupby('Month').last().reset_index()[['Month', 'Total']]
    month_df.loc[-1] = ['2019-01', 50.0]

    # Reset the index and perform the calculations
    month_df.sort_index(ascending=False, inplace=True)
    month_df.reset_index(drop=True, inplace=True)
    month_df['MonthDiff'] = month_df['Total'].diff(-1)
    month_df['InceptDiff'] = month_df['Total'] - 50.0
    month_df['MonthReturn'] = month_df['MonthDiff'] / month_df['Total'].shift(-1)
    month_df['InceptReturn'] = month_df['InceptDiff'] / 50.0

    # Round the columns
    month_df['MonthReturn'] = month_df['MonthReturn'].round(3)
    month_df['InceptReturn'] = month_df['InceptReturn'].round(3)

    # Find monthly volume and join to the month df
    volume_df = df.groupby('Month')['Volume'].sum().reset_index()
    month_df = pd.merge(month_df, volume_df, on='Month', how='left')

    # Send to records without the filler row and only take the last year
    month_df.drop(max(month_df.index), inplace=True)
    month_df = month_df.head(8)
    month_df.sort_values(by='Month', ascending=True, inplace=True)
    month_records = month_df.to_dict(orient='records')
    
    # Add the monthly data to the output
    output['monthly'] = month_records

    # Find out if a contract is binary
    df['MarketID'] = df['URL'].str.split('/').str[-1]
    binary_df = df.loc[df['ContractName'].isin(['Yes', 'No'])]
    binary_df['Binary'] = True
    binary_df = binary_df[['MarketID','Binary']]
    binary_df.drop_duplicates(inplace=True)
    df = df.merge(binary_df, on='MarketID', how='left')
    df['Binary'].fillna(False, inplace=True)

    # If the contract is binary, replace the contract name with the yes/no order
    df.loc[~df['ContractName'].isin(['Yes', 'No']) & df['Binary'] == True, 
        'ContractName'] = df['Type']
    df.loc[df['ContractName'] == 'Sell Yes', 'ContractName'] = 'Yes'
    df.loc[df['ContractName'] == 'Sell No', 'ContractName'] = 'No'

    # Get the share activity for each contract type
    df['ContractType'] = df.apply(lambda x:
        'Yes' if x['Type'][-3:] == 'Yes' else 'No', axis=1)
    df['ShareActivity'] = df.apply(lambda x:
        x['Shares'] if x['Type'][:3] == 'Buy' else -x['Shares'], axis=1)

    # Get the best and worst performing markets
    value_df = df.groupby(['MarketID', 'MarketName']).agg({
        'Shares': 'sum', 'CreditDebit': 'sum', 'DateExecuted': 'max',
        'ShareActivity': 'sum'}).reset_index()
    value_df = value_df.loc[value_df['ShareActivity'] == 0]
    value_df.sort_values(by='CreditDebit', ascending=False, inplace=True)
    best_df = value_df.head(5)
    value_df.sort_values(by='CreditDebit', ascending=True, inplace=True)
    worst_df = value_df.head(5)

    # Add the best and worst to the output
    output['best'] = best_df.to_dict(orient='records')
    output['worst'] = worst_df.to_dict(orient='records')

    # Return the data
    return output
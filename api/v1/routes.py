'''
API V1 ROUTES FOR FLASK APP
'''
# Import the app
from api.app import app


'''
ROUTES
All routes must be prefaced with '/api/v1'
'''
# Return the message to display on the homepage
@app.route('/api/v1/home_message')
def home_message():
    return {'message': 'Welcome : )'}
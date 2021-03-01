'''
FLASK APPLICATION FOR FRONTEND AND BACKEND
'''
# Import required packages
from flask import Flask, make_response
from flask_caching import Cache
from flask_cors import (
    CORS
)
import os

# Initialize Flask pointed at the React build
app = Flask(
    __name__,
    static_folder='../build',
    static_url_path='/'
)

# Add cache configuration
app.config['CACHE_TYPE'] = 'simple'
app.cache = Cache(app)
CORS(app)

# Configuration for database on local or Heroku
if 'ON_HEROKU' not in os.environ:
	from api.config import Configuration
	app.config['SQLALCHEMY_DATABASE_URI'] = Configuration.URI
else:
	app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']

# Don't track database modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

'''
FRONTEND ROUTES
'''
# All undefined routes should return React's index file
@app.route('/', defaults={'path': ':'})
@app.route('/<string:path>')  # Match all strings
@app.route('/<path:path>')  # Match all paths
def index(path):
    return app.send_static_file('index.html')

# Serve the manifest from the static folder
@app.route('/manifest.json')
def manifest():
    return app.send_static_file('manifest.json')

# Serve the favicon from the static folder
@app.route('/favicon.ico')
def favicon():
    return app.send_static_file('favicon.ico')

# Serve a string for robots.txt
@app.route('/robots.txt')
def robots():
    source = '# https://www.robotstxt.org/robotstxt.html \n'
    allow = 'User-agent: * \n'
    disallow = 'Disallow: '
    response = make_response(source + allow + disallow, 200)
    response.mimetype = "text/plain"
    return response

# Still send the static file in the event of a 404
@app.errorhandler(404)   
def not_found(e):
    return app.send_static_file('index.html')


'''
BACKEND ROUTES
Imported from v1
'''
import api.v1.routes


'''
RUN IN TERMINAL
'''
# Run Flask on debug when local
if __name__ == '__main__':
    app.run(port=5000, debug=True)
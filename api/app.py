'''
FLASK APPLICATION FOR FRONTEND AND BACKEND
'''
# Import required packages
from flask import Flask
from flask_caching import Cache
from flask_cors import (
    CORS
)

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

# Server the asset manifest from the static folder
@app.route('/asset_manifest.json')
def asset_manifest():
    return app.send_static_file('asset_manifest.json')


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
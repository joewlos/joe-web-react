'''
IMPORT FOR GUNICORN
'''
from api import app
application = app.app

'''
RUN IN TERMINAL
'''
# Run Flask on debug when local
if __name__ == '__main__':
    application.run(port=5000, debug=True)
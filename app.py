from flask import Flask,render_template, request, redirect
# from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_mail import Mail
import json

with open( 'config.json', 'r' ) as c:
    params = json.load(c) ["params"]

app = Flask(__name__)
app.secret_key = 'SECRET KEY'
app.config.update(
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_PORT = '465',
    MAIL_USE_SSL = 'True',
    MAIL_USERNAME = params['gmail-user'],
    MAIL_PASSWORD = params['gmail-password']
)


mail = Mail(app)

@app.route("/")
def open():
    return render_template('index.html')

# @app.route("/choice")
# def choice(): 
#     return redirect("/#Calculation")

# @app.route("/calculate")
# def calculate():
#     return redirect("/#Results")

@app.route("/contact", methods = ['GET', 'POST'])
def  contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')

        mail.send_message('New message from ' + name, sender=email, recipients= [params['gmail-user']], body=message )
    return  render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)

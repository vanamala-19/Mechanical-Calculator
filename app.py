from flask import Flask,render_template, request, redirect
# from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_mail import Mail

app = Flask(__name__)
app.config.update(
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_PORT = 587,
    MAIL_USE_SSL = 'True',
    MAIL_USERNAME = '187r1a0354@gmail.com',
    MAIL_PASSWORD = 'yeshudarling'
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

        mail.send_message('New message from ' + name, sender=email, recipients= ['187r1a0354@gmail.com'], body=message )
    return  render_template('index.html')


if __name__ == "__main__":
    app.run(debug=False)

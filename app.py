from flask import Flask,render_template, request, redirect
# from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_mail import Mail,Message

app = Flask(__name__)

mail = Mail(app)
app.config[MAIL_SERVER] = 'smtp.gmail.com'
app.config[MAIL_PORT] = '465'
app.config[MAIL_USE_SSL] = 'True'
app.config[MAIL_USERNAME] =  "187r1a0354@gmail.com"
app.config[MAIL_PASSWORD] = "yeshudarling"


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
    if(request.method == 'POST'):
        name = request.form['name']
        email = request.form['email']
        subject = request.form['subject']
        msg = request.form['message']
        mail.send_message('New Message From ' + name,sender=email,recipients="vanamalashivaji19@gmail.com",body=msg)
        sucess = "Message sent"
    return  render_template('index.html', sucess=sucess)

if __name__ == "__main__":
    app.run(debug=True,port=8000)

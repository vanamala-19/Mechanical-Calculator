from flask import Flask,render_template, request, redirect
# from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


app = Flask(__name__)

@app.route("/")
def open():
    return render_template('index.html')

# @app.route("/choice")
# def choice(): 
#     return redirect("/#Calculation")

# @app.route("/calculate")
# def calculate():
#     return redirect("/#Results")


if __name__ == "__main__":
    app.run(debug=False)

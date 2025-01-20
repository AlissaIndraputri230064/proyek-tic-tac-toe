from flask import Flask, render_template, redirect, url_for
app = Flask (__name__)

@app.route('/')
def home() : 
    return render_template('home.html')

@app.route('/information')
def information():
    return render_template('information.html')

@app.route('/game')
def game():
    return render_template('game.html')

if __name__ == '__main__':
    app.run (debug=True)
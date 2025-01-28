from flask import Flask, render_template, request, redirect, url_for
from pymongo import MongoClient

app = Flask (__name__)

client = MongoClient("mongodb://localhost:27017/")
db = client["tic-tac-toe"]
collection = db["players"]

@app.route('/')
def home() : 
    return render_template('home.html')

@app.route('/insert_player', methods=["POST"])
def insert_player():
    playerx = request.form.get("playerx")
    playero = request.form.get("playero")

    if not playerx or not playero:
        return "Nama player harus diisi"

    collection.insert_many([
        {"player_name": playerx, "role": "X", "wins": {"x": 0, "o": 0}},
        {"player_name": playero, "role": "O", "wins": {"x": 0, "o": 0}}
    ])

    return redirect("/game")

@app.route('/information')
def information(): 
    return render_template('information.html')

@app.route('/game')
def game():
    return render_template('game.html')

if __name__ == '__main__':
    app.run (debug=True)
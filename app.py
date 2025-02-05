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
    try:
        playerx = request.form.get("playerx")
        playero = request.form.get("playero")

        print("Received Player X:", playerx)  # Debugging output
        print("Received Player O:", playero)  # Debugging output

        if not playerx or not playero:
            return "Nama player harus diisi", 400

        result = collection.insert_many([
            {"player_name": playerx, "role": "X", "wins": {"x": 0, "o": 0}},
            {"player_name": playero, "role": "O", "wins": {"x": 0, "o": 0}}
        ])

        print("Inserted IDs:", [str(id) for id in result.inserted_ids])  # Debugging outpu
        return redirect("/game")

    except Exception as e:
        print("Error:", e)
        return "An error occurred: " + str(e), 500

@app.route('/information')
def information(): 
    return render_template('information.html')

@app.route('/game')
def game():
    return render_template('game.html')

@app.route('/settings')
def settings():
    return render_template('settings.html')
    
if __name__ == '__main__':
    app.run (debug=True)
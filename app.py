from flask import Flask, render_template, request, redirect, jsonify, url_for
from pymongo import MongoClient

app = Flask (__name__)

# Koneksi ke MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["tic-tac-toe"]
collection = db["games"]

# Insert game (dokumen)
@app.route('/insert_game', methods=["POST"])
def insert_game():
    try:
        playerx = request.form.get("playerx")
        playero = request.form.get("playero")

        if not playerx or not playero:
            return "Nama player harus diisi", 400

        new_game = collection.insert_one({
            "playerx": playerx, 
            "playero": playero, 
            "pointx": 0, 
            "pointo": 0
        })

        game_id = new_game.inserted_id

        # Debugging output untuk mengecek apakah data berhasil masuk
        print("Received Player X:", playerx)  
        print("Received Player O:", playero)  
        print("Inserted game _id:", game_id)  

        # points insertion

        return redirect("/game")

    except Exception as e:
        print("Error:", e)
        return "An error occurred: " + str(e), 500
    
# Update poin pemain
@app.route('/update_point', methods=["POST"])
def update_point():
    data = request.json
    winner = data.get("winner")

    if not winner:
        return jsonify({"error": "Nama pemenang harus ada"}), 400
    
    # Update poin pemain dari JSON
    update_field = "scores.pointx" if winner == "playerx" else "scores.pointo"

    result = collection.update_one(
        {},
        {"$inc": {update_field}}
    )

    if result.modified_count > 0:
        return jsonify({"message": f"Poin {winner} +1"})
    else:
        return jsonify({"error": "Dokumen tidak tersedia"})

@app.route('/')
def home() : 
    return render_template('home.html')

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
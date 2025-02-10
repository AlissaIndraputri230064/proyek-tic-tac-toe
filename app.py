from flask import Flask, render_template, request, redirect, jsonify, url_for
from pymongo import MongoClient
from bson.objectid import ObjectId

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

        # if not playerx or not playero:
        #     return "Nama player harus diisi", 400

        new_game = collection.insert_one({
            "playerx": playerx, 
            "playero": playero, 
            "pointx": 0, 
            "pointo": 0
        })

        #game_id = new_game.inserted_id
        db["meta"].update_one({"key": "latest_game"}, {"$set": {"game_id": new_game.inserted_id}}, upsert=True)

        # Debugging output untuk mengecek apakah data berhasil masuk
        print(f"Inserted game _id: {new_game.inserted_id}")
        print("Received Player X:", playerx)  
        print("Received Player O:", playero)  

        return redirect("/game")

    except Exception as e:
        print("Error:", e)
        return "An error occurred: " + str(e), 500
    
# Update poin pemain
@app.route('/update_point', methods=["POST"])
def update_point():
    try:
        data = request.json
        winner = data.get("winner")

        if not winner:
            return jsonify({"error": "Nama pemenang harus ada"}), 400
        
        latest_game = db["meta"].find_one({"key": "latest_game"})
        game_id = latest_game["game_id"]

        if not game_id:
            return jsonify({"error": "ID game tidak ditemukan, tidak ada game yang sedang berlangsung"})
        
        # Update poin pemain dari JSON
        if winner == "playerx":
            update_field = "pointx"
        elif winner == "playero":
            update_field = "pointo"
        else:
            return jsonify({"error": "Nama pemenang tidak valid"}), 400

        result = collection.update_one(
            {"_id": ObjectId(game_id)},
            {"$inc": {update_field: 1}}
        )

        if result.modified_count > 0:
            return jsonify({"message": f"Poin {winner} +1"})
        else:
            return jsonify({"error": "Dokumen tidak tersedia"}), 404
        
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "An error occured: " + str(e)}), 500

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
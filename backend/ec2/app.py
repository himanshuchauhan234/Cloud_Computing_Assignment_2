from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
users = []
subscriptions = []
songs = [
    {
        "artist": "Taylor Swift",
        "title": "Love Story",
        "year": "2008",
        "album": "Fearless",
        "image_url": "https://via.placeholder.com/300x200"
    },
    {
        "artist": "Jimmy Buffett",
        "title": "Margaritaville",
        "year": "1974",
        "album": "Living and Dying in 3/4 Time",
        "image_url": "https://via.placeholder.com/300x200"
    },
    {
        "artist": "Kendrick Lamar",
        "title": "Bad Blood",
        "year": "2015",
        "album": "To Pimp a Butterfly",
        "image_url": "https://via.placeholder.com/300x200"
    }
]

@app.route("/")
def home():
    return jsonify({"message": "Backend is running"})


@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    email = data.get("email")
    user_name = data.get("user_name")
    password = data.get("password")

    for user in users:
        if user["email"] == email:
            return jsonify({"message": "email exists"}), 400

    users.append({
        "email": email,
        "user_name": user_name,
        "password": password
    })

    return jsonify({"message": "registered"})


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    for user in users:
        if user["email"] == email and user["password"] == password:
            return jsonify({
                "message": "login successful",
                "email": user["email"],
                "user_name": user["user_name"]
            })

    return jsonify({"message": "invalid login"}), 401


@app.route("/logout", methods=["POST"])
def logout():
    return jsonify({"message": "logout successful"})


@app.route("/songs", methods=["GET"])
def get_songs():
    title = request.args.get("title", "").lower()
    artist = request.args.get("artist", "").lower()
    album = request.args.get("album", "").lower()
    year = request.args.get("year", "")

    results = []

    for song in songs:
        if title and title not in song["title"].lower():
            continue
        if artist and artist not in song["artist"].lower():
            continue
        if album and album not in song["album"].lower():
            continue
        if year and year != song["year"]:
            continue

        results.append(song)

    return jsonify({"results": results})


@app.route("/subscriptions", methods=["GET"])
def get_subscriptions():
    email = request.args.get("email")

    user_subscriptions = [
        sub for sub in subscriptions if sub["email"] == email
    ]

    return jsonify({"subscriptions": user_subscriptions})


@app.route("/subscriptions", methods=["POST"])
def add_subscription():
    data = request.get_json()

    for sub in subscriptions:
        if (
            sub["email"] == data["email"]
            and sub["title"] == data["title"]
            and sub["artist"] == data["artist"]
        ):
            return jsonify({"message": "already subscribed"})

    subscriptions.append(data)

    return jsonify({"message": "subscription added"})


@app.route("/subscriptions", methods=["DELETE"])
def delete_subscription():
    data = request.get_json()

    global subscriptions
    subscriptions = [
        sub for sub in subscriptions
        if not (
            sub["email"] == data["email"]
            and sub["title"] == data["title"]
            and sub["artist"] == data["artist"]
        )
    ]

    return jsonify({"message": "subscription removed"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
    

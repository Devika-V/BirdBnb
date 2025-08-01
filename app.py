from flask import Flask, jsonify, request

app = Flask(__name__)
app.config["DEBUG"] = True

# Dummy data (simulates a database)
nests = [
    {
        "id": 1,
        "location": "Mango Tree, Sector 7",
        "type": "available",
        "capacity": 2,
        "materials": "twigs, feathers",
        "occupants": [],
        "ratings": 4.5,
        "species_suitable": "sparrow, myna",
        "special_notes": "Shaded, near water, squirrel risk"
    },
    {
        "id": 2,
        "location": "Coconut Grove, Sector 5",
        "type": "available",
        "species_suitable": "parrot, bulbul",
        "capacity": 3,
        "materials": "leaves, plastic bits",
        "ratings": 4.0,
        "occupants": [],
        "special_notes": "Windy, great view, ant problem"
    }
]

@app.route('/')
def home():
    return "Welcome to BirdBnB Backend – Where nests find birds!"

# Get all nests
@app.route('/nests', methods=['GET'])
def get_nests():
    return jsonify(nests)

# Build a new nest
@app.route('/build', methods=['POST'])
def build_nest():
    data = request.get_json()
    new_nest = {
        "id": len(nests) + 1,
        "location": data["location"],
        "type": data.get("type", "available"),
        "capacity": data["capacity"],
        "materials": data["materials"],
        "occupants": [],
        "ratings": data.get("ratings", 0),
        "species_suitable": data["species_suitable"],
        "special_notes": data.get("special_notes", "")
    }
    nests.append(new_nest)
    return jsonify({"message": "Nest built!", "nest": new_nest})

# Book a nest
@app.route('/book', methods=['POST'])
def book_nest():
    data = request.get_json()
    location = data.get("location")
    bird_name = data.get("name", "anonymous bird")

    for nest in nests:
        if nest["location"] == location:
            if len(nest["occupants"]) < nest["capacity"]:
                nest["occupants"].append(bird_name)
                return jsonify({"message": "Nest booked!", "nest": nest})
            else:
                return jsonify({"error": "Nest is at full capacity"}), 400

    return jsonify({"error": "Nest not found"}), 404

# Share a nest
@app.route('/share', methods=['POST'])
def share_nest():
    data = request.get_json()
    location = data.get("location")
    bird_name = data.get("name", "anonymous bird")

    for nest in nests:
        if nest["location"] == location:
            if len(nest["occupants"]) < nest["capacity"]:
                nest["occupants"].append(bird_name)
                return jsonify({"message": "Nest shared!", "nest": nest})
            else:
                return jsonify({"error": "Nest is at full capacity"}), 400

    return jsonify({"error": "Nest not found"}), 404

# Vacate a nest
@app.route('/vacate', methods=['POST'])
def vacate_nest():
    data = request.get_json()
    location = data.get("location")

    for nest in nests:
        if nest["location"] == location and len(nest["occupants"]) > 0:
            nest["occupants"] = []
            return jsonify({"message": "Nest vacated!", "nest": nest})

    return jsonify({"error": "No occupied nest found at that location"}), 404

# Rate a nest
@app.route('/rate', methods=['POST'])
def rate_nest():
    data = request.get_json()
    location = data.get("location")
    new_rating = data.get("rating")

    for nest in nests:
        if nest["location"].lower() == location.lower():
            nest["ratings"] = round((nest["ratings"] + new_rating) / 2, 2)
            return jsonify({"message": "Nest rated!", "new_rating": nest["ratings"]})
    
    return jsonify({"error": "Nest not found"}), 404

# Search nests by species
@app.route('/search', methods=['GET'])
def search_nests():
    species = request.args.get("species", "").lower()
    matching_nests = []

    for nest in nests:
        if species in nest["species_suitable"].lower():
            matching_nests.append(nest)

    if not matching_nests:
        return jsonify({"message": "No nests found for that species"}), 404

    return jsonify({"results": matching_nests})

if __name__ == '__main__':
    app.run(debug=True)

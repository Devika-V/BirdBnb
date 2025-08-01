from flask import Flask, jsonify, request

app = Flask(__name__)
app.config["DEBUG"] = True
# Dummy nests data (you'll later connect to DB)
nests = [
    {
        "id": 1,
        "location": "Mango Tree, Sector 7",
        "type": "available",
        "capacity": 2,
        "materials": "twigs, feathers",
        "occupied": False,
        "ratings": 4.5,
        "species_suitable": "sparrow, myna",
        "special_notes": "Shaded, near water, squirrel risk"
    },
     {
        "id": 2,
        "location": "Coconut Grove, Sector 5",
        "species_suitable": "parrot, bulbul",
        "capacity": 3,
        "materials": "leaves, plastic bits",
        "ratings": 4.0,
        "occupied": False,
        "special_notes": "Windy, great view, ant problem"
    }
]

@app.route('/')
def home():
    return "Welcome to BirdBnB Backend-Where nests find birds"

# Get all available nests
@app.route('/nests', methods=['GET'])
def get_nests():
    return jsonify(nests)
    #rating a nest
@app.route('/rate', methods=['POST'])
def rate_nest():
    data = request.get_json()
    location = data.get("location")
    new_rating = data.get("rating")

    for nest in nests:
        if nest["location"].lower() == location.lower():
            # Simple average (can be improved if needed)
            if nest["ratings"] == 0:
                nest["ratings"] = new_rating
            else:
                nest["ratings"] = round((nest["ratings"] + new_rating) / 2, 2)
            return jsonify({"message": "Nest rated!", "new_rating": nest["ratings"]})
    
    return jsonify({"error": "Nest not found"}), 404
@app.route('/search')
def search_nests():
    species = request.args.get("species", "").lower()
    matching_nests = []

    for nest in nests:
        if species in nest["species_suitable"].lower():
            matching_nests.append(nest)

    if not matching_nests:
        return jsonify({"message": "No nests found for that species"}), 404

    return jsonify({"results": matching_nests})

@app.route('/build', methods=['POST'])
def build_nest():
    data = request.get_json()
    new_nest = {
        "id": len(nests) + 1,
        "location": data["location"],
        "type": data.get("type", "available"),
        "capacity": data["capacity"],
        "materials": data["materials"],
        "occupied": False,
        "ratings": data.get("ratings", 0),
        "species_suitable": data["species_suitable"],
        "special_notes": data.get("special_notes", "")
    }
    nests.append(new_nest)
    return jsonify({"message": "Nest built!", "nest": new_nest})
@app.route('/vacate', methods=['POST'])
def vacate_nest():
    data = request.get_json()
    location = data.get('location')

    for nest in nests:
        if nest['location'] == location and nest['occupied']:
            nest['occupied'] = False
            return jsonify({"message": "Nest vacated!", "nest": nest}), 200

    return jsonify({"error": "No occupied nest found at that location"}), 404


# Book a nest
@app.route('/book', methods=['POST'])
def book_nest():
    data = request.json
    location = data.get("location")

    for nest in nests:
        if nest["location"] == location and not nest["occupied"]:
            nest["occupied"] = True
            return jsonify({"message": "Nest booked!", "nest": nest})

    return jsonify({"message": "Nest not found or already booked"}), 404


if __name__ == '__main__':
    app.run(debug=True)

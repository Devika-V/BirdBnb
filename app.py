from flask import Flask, jsonify, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = True

@app.route("/api/nests")
def get_nests():
    return jsonify([
        {"name": "Punky Parrot’s Comfy Nest", "type": "Co-Living", "rating": 4.8},
        {"name": "Luxury Leaf Resort", "type": "Booking", "rating": 4.9}
    ])
@app.route('/')
def home():
    return "🐦 Welcome to BirdBnB Backend – Where Nests Find Birds!"
if __name__ == "__main__":
    app.run(debug=True)
# Pre-filled nests
nests = [
    {
        "id": 1,
        "location": "BreezeTop Treehouse, Sector 9",
        "type": "resort",
        "capacity": 2,
        "materials": "silk threads, lotus petals",
        "occupants": [],
        "ratings": 4.8,
        "species_suitable": "peacock, bulbul",
        "special_notes": "Sunrise view, spa worms included"
    },
    {
        "id": 2,
        "location": "FeatherFalls Canopy Resort",
        "type": "resort",
        "capacity": 1,
        "materials": "cotton, bamboo leaves",
        "occupants": [],
        "ratings": 4.9,
        "species_suitable": "kingfisher, hornbill",
        "special_notes": "Overlooks lake, mosquito-free zone"
    },
    {
        "id": 3,
        "location": "Punky Parrot's Pad",
        "type": "shared",
        "capacity": 3,
        "materials": "twigs, candy wrappers",
        "occupants": ["Punky Parrot"],
        "ratings": 4.1,
        "species_suitable": "parrot, sparrow",
        "special_notes": "Music nights on Tuesdays, free fruit peels"
    },
    {
        "id": 4,
        "location": "Coozy Coop",
        "type": "shared",
        "capacity": 2,
        "materials": "grass, shoelaces",
        "occupants": ["Larry the Lark"],
        "ratings": 3.9,
        "species_suitable": "lark, myna",
        "special_notes": "Cozy but loud neighbors, good shade"
    }
]

# Suggested build locations
build_locations = [
    {
        "location": "Palm Grove Heights",
        "materials": "dry leaves, twine, coconut fibers",
        "climate_rating": 4.7,
        "predator_risk": "Low",
        "shade": "High"
    },
    {
        "location": "Banyan Base, Sector 12",
        "materials": "roots, wool strands, paper bits",
        "climate_rating": 4.3,
        "predator_risk": "Medium",
        "shade": "Medium"
    },
    {
        "location": "Neem Nook",
        "materials": "bark flakes, silk, cotton",
        "climate_rating": 4.9,
        "predator_risk": "Very Low",
        "shade": "Full"
    }
]



# Get all nests (optional, for testing)
@app.route('/nests', methods=['GET'])
def get_nests():
    return jsonify(nests)

# 🏨 Resort nests
@app.route('/nests/resorts', methods=['GET'])
def get_resorts():
    resort_nests = [nest for nest in nests if nest["type"] == "resort"]
    return jsonify(resort_nests)

# 🛏️ Shared/co-living nests
@app.route('/nests/shared', methods=['GET'])
def get_shared_nests():
    shared_nests = [nest for nest in nests if nest["type"] == "shared"]
    return jsonify(shared_nests)

# 🧱 Suggested build locations
@app.route('/build/locations', methods=['GET'])
def get_build_locations():
    return jsonify(build_locations)

# 🏗️ Build a custom nest
@app.route('/build', methods=['POST'])
def build_nest():
    data = request.get_json()
    new_nest = {
        "id": len(nests) + 1,
        "location": data["location"],
        "type": "custom",
        "capacity": data["capacity"],
        "materials": data["materials"],
        "occupants": [],
        "ratings": data.get("ratings", 0),
        "species_suitable": data["species_suitable"],
        "special_notes": data.get("special_notes", "")
    }
    nests.append(new_nest)
    return jsonify({"message": "Nest built!", "nest": new_nest})

# 📥 Book resort or join shared nest
@app.route('/book', methods=['POST'])
def book_nest():
    data = request.get_json()
    location = data.get("location")
    bird_name = data.get("name", "anonymous bird")

    for nest in nests:
        if nest["location"].lower() == location.lower():
            if len(nest["occupants"]) < nest["capacity"]:
                nest["occupants"].append(bird_name)
                return jsonify({"message": "Nest booked!", "nest": nest})
            else:
                return jsonify({"message": "Nest is full"}), 403

    return jsonify({"error": "Nest not found"}), 404

# ⭐ Rate a nest
@app.route('/rate', methods=['POST'])
def rate_nest():
    data = request.get_json()
    location = data.get("location")
    new_rating = data.get("rating")

    for nest in nests:
        if nest["location"].lower() == location.lower():
            if nest["ratings"] == 0:
                nest["ratings"] = new_rating
            else:
                nest["ratings"] = round((nest["ratings"] + new_rating) / 2, 2)
            return jsonify({"message": "Nest rated!", "new_rating": nest["ratings"]})
    
    return jsonify({"error": "Nest not found"}), 404

# 🕊️ Vacate a nest
@app.route('/vacate', methods=['POST'])
def vacate_nest():
    data = request.get_json()
    location = data.get('location')

    for nest in nests:
        if nest['location'].lower() == location.lower() and nest['occupants']:
            nest['occupants'] = []
            return jsonify({"message": "Nest vacated!", "nest": nest})

    return jsonify({"error": "No occupied nest found at that location"}), 404

if __name__ == '__main__':
    app.run(debug=True)

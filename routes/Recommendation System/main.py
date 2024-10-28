from flask import Flask, render_template, request
import pickle
import pandas as pd
from scipy.spatial import distance

app = Flask(__name__)

# Load the data
properties = pd.read_pickle('normalized_property_data.pkl')
print(f"Loaded {len(properties)} properties")
print(f"Sample property IDs: {properties['property_id'].head().tolist()}")

# Ensure property_id is string type
properties['property_id'] = properties['property_id'].astype(str)

# Function to calculate Euclidean distance between two properties
def calculate_similarity(property1, property2):
    features = ['latitude', 'longitude', 'baths', 'bedrooms', 'area', 'standardized_price']
    dist = distance.euclidean(property1[features], property2[features])
    return dist

# Function to recommend similar properties based on a given property
def recommend(property):
    print(f"Searching for property: {property}, type: {type(property)}")
    print(f"Sample property_id from DataFrame: {properties['property_id'].iloc[0]}, type: {type(properties['property_id'].iloc[0])}")
    
    matching_properties = properties[properties['property_id'] == property]
    print(f"Found {len(matching_properties)} matching properties")
    
    if matching_properties.empty:
        print("No matching properties found")
        return []

    property_to_compare = matching_properties.iloc[0]
    similarities = []
    
    for idx, row in properties.iterrows():
        if row['property_id'] != property:
            dist = calculate_similarity(property_to_compare, row)
            similarities.append((row['property_id'], dist))
    
    similarities.sort(key=lambda x: x[1])  # Sort by distance (lower is more similar)
    recommendations = similarities[:5]
    recommended_properties = [prop_id for prop_id, _ in recommendations]
    print(f"Recommended properties: {recommended_properties}")
    return recommended_properties

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        selected_property = str(request.form['property'])
        print(f"Selected property: {selected_property}")
        recommendations = recommend(selected_property)
        if not recommendations:
            error_message = f"No recommendations found for property {selected_property}"
            print(error_message)
        else:
            error_message = None
        return render_template('index.html', properties=properties['property_id'].values.tolist(), 
                               selected=selected_property, recommendations=recommendations,
                               error_message=error_message)
    return render_template('index.html', properties=properties['property_id'].values.tolist())

if __name__ == '__main__':
    app.run(debug=True)
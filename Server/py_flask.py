from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import util
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/get_location')
def get_location():
    response = jsonify({
        'locations': util.get_location_nm()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/predict_home_price', methods=['POST'])
@cross_origin()
def predict_home_price():
    location = request.form['locations']
    bhk = float(request.form['bhk'])
    society_mod = request.form['society_mod']
    total_area = float(request.form['total_sq'])
    bath = float(request.form['bath'])
    balcony_mod = float(request.form['balcony_mo'])

    pred_list = [location, bhk, society_mod, total_area, bath, balcony_mod]

    #print(pred_list)

    response2 = jsonify({
        'predicted_price': round(util.get_predicted_price(pred_list)[0], 2)
    })
    #response2.headers.set('Access-Control-Allow-Origin', '*')
    return response2


if __name__ == "__main__":
    print("starting python flask server")
    util.load_sv_artf()
    app.run()

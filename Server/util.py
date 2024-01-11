import json
import pickle
import pandas as pd


__location_name = None
__location_id = None
__file_json = None
__model = None


def get_predicted_price(pred):
    x = []
    soc = (lambda x: 1 if x == 'Y' else 0)
    n_id = __location_id[__location_name.index(pred[0])]


    def check(i, c):
        if (c == 0):
            return n_id
        elif (c == 2):
            return soc(pred[c])
        else:
            return i


    d = 0
    for i in pred:
        x.append(check(i, d))
        d += 1


    x2 = pd.DataFrame([x], columns=['loca', 'bhk', 'society_mod', 'total_area', 'bath', 'balcony_mod'])

    #print(x2)
    #print(__model.predict(x2))
    return __model.predict(x2)


def get_location_nm():
    return __location_name


def load_sv_artf():
    print("loading saved artifacts..start")
    global __file_json
    global __location_name
    global __location_id
    global __model

    with open("./artifacts/columns.json", 'r') as f:
        __file_json = json.load(f)
        __location_name = __file_json['location_names']
        __location_id = __file_json['loc_id']


    with open("./artifacts/bangalore_home_prices.pickle", 'rb') as f:
        __model = pickle.load(f)
        print("artifacts loaded..")

    return None


if __name__ == '__main__':
    load_sv_artf()
    #print(get_predicted_price(['Lingadheeranahalli', 3, 'Y', 1500, 4, 1])[0])






import pystache
import simplejson as json

def get_data(f):
    fh = open(f)
    data = fh.read()
    fh.close()
    return data

with open('trip.json') as data_file:
    data = json.load(data_file)

trip = get_data('../templates/trip.mustache')
renderer = pystache.Renderer(search_dirs="../templates/")
print renderer.render(trip, data)


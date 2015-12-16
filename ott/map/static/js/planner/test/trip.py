import pystache
import simplejson as json

def get_data(f):
    fh = open(f)
    data = fh.read()
    fh.close()
    return data

def get_templates(dir, files):
    r = {}
    for f in files:
        r[f] = get_data(dir + f + '.mustache')
    return r

with open('trip.json') as data_file:
    data = json.load(data_file)

#partials = get_templates("../templates/", ['itinerary', 'leg', 'fare', 'tabs'])
trip = get_data('../templates/trip.mustache')
renderer = pystache.Renderer(search_dirs="../templates/")
print renderer.render(trip, data)


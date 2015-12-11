import pystache
import simplejson as json

with open('demo.json') as data_file:
    data = json.load(data_file)

fh = open('demo.mustache')
template = fh.read()
fh.close()

renderer = pystache.Renderer()
print renderer.render(template, data)
#print template, data


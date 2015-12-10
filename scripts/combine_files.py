import os
import sys

###
### file combine routines below...
###

def filter(name, filters, filter_match, rev=False):
    ''' used to filter certain files from the 'combine' method below
    '''
    ret_val = False
    if len(filters) > 0:
        match = not filter_match
        for f in filters:
            if f in name or (rev and name in f):
                match = filter_match
                print "{}: {} does match filter {}".format("pass" if filter_match else "filtering", name, f)
                break
        if not match:
            ret_val = True
    return ret_val

def combine(dir, fname='ott.all', ext='js', filters=[], filter_match=True, filter_dirs=False, out_status='w'):
    ''' used to build a single file that includes other .js and .css files
    '''
    out_name = fname + '.' + ext
    out_file = open(dir + out_name, out_status)
    print "*** {} ***".format(out_name)

    for root, directories, filenames in os.walk(dir):
        if filter_dirs:
            if filter(root, filters, filter_match, True):
                continue

        for filename in filenames:
            if filename.endswith(ext) and out_name != filename:
                #import pdb; pdb.set_trace()

                # step 1: filter files
                if filter(filename, filters, filter_match):
                    continue

                # step 2: we pass the filter, then append the file
                print filename
                f = os.path.join(root, filename)
                fh = open(f)
                data = fh.read() + '\n'
                fh.close()
                out_file.write(data)

    out_file.close()

def open_templates_output(dir, fname='ott.mustache-templates', ext="js", first_line="ott.templates = {\n", out_status='w', ln=None):
    ''' step 1 of 3: open a new file ott.mustache-templates.js
    '''
    if ln: ln = "-{0}".format(ln)
    else:  ln = ""
    out_name = "{0}{1}.{2}".format(fname, ln, ext)
    out_file = open(dir + out_name, out_status)
    out_file.write(first_line)
    return out_name, out_file

def templates_to_js(dir, out_name, out_file, ext="mustache", filters=[], filter_match=True, filter_dirs=False):
    ''' step 2 of 3: add each of our templates (.mustache) into ott.mustache-templates.js
                     each template is an entry (string) in the ott.templates {} hash
    '''
    for root, directories, filenames in os.walk(dir):
        if filter_dirs:
            if filter(root, filters, filter_match, True):
                continue

        for filename in filenames:
            if filename.endswith(ext) and out_name != filename:
                #import pdb; pdb.set_trace()

                # step 1: filter files
                if filter(filename, filters, filter_match):
                    continue

                # step 2: we pass the filter, then append the file
                print filename
                f = os.path.join(root, filename)
                fh = open(f)
                data = fh.read() + '\n'
                fh.close()
                encoded_data = data.strip().replace('\n', '\\n').replace('\r', '').replace("'", "\'")
                comma = ","
                name = os.path.splitext(filename)[0]
                attribute = "    '{0}' : '{1}'{2}\n\n".format(name, encoded_data, comma)
                out_file.write(attribute)

def close_templates_output(out_name, out_file, last_line="\n    'CLASS_NAME' : '{0}'\n}}\n"):
    ''' step 3 of 3: close the ott.mustache-templates.js file
    '''
    ll = last_line.format(out_name)
    out_file.write(ll)
    out_file.close()

def main(argv=None):
    #import pdb; pdb.set_trace()
    all = (argv == None or len(argv) == 1 or "all" in argv)
    if all or "combo" in argv or "c" in argv:
        combine(dir='ott/map/static/css/', ext='css')
        combine(dir='ott/map/static/js/',  ext='js', fname='ott.leaflet',    filters=['openlayers', 'config'],  filter_match=False, filter_dirs=True)
        combine(dir='ott/map/static/js/',  ext='js', fname='ott.openlayers', filters=['leaflet', 'config'],     filter_match=False, filter_dirs=True)
        combine(dir='ott/map/static/resources/leaflet/', ext='js',  fname='ott.leaflet', filters=['leaflet-src'], filter_match=False, filter_dirs=True)
        combine(dir='ott/map/static/resources/leaflet/', ext='css', fname='ott.leaflet', filters=['leaflet-src'], filter_match=False, filter_dirs=True)

    if all or "templates" in argv or "t" in argv:
        # planner
        dir='ott/map/static/resources/mustache/test/'
        out_name, out_file = open_templates_output(dir, "ott.planner.templates")
        templates_to_js(dir, out_name, out_file)
        close_templates_output(out_name, out_file)

        # test
        dir='ott/map/static/resources/mustache/test/'
        out_name, out_file = open_templates_output(dir, "test.templates")
        templates_to_js(dir, out_name, out_file)
        close_templates_output(out_name, out_file)

if __name__ == "__main__":
    main(sys.argv)

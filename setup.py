import os
from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))

README = open(os.path.join(here, 'README.md')).read()
CHANGES = open(os.path.join(here, 'CHANGES.txt')).read()


requires = [
    'ott.utils',
]


dev_extras = [
]
oracle_extras = ['cx_oracle>=5.1']
postgresql_extras = ['psycopg2>=2.4.2']
pyramid_extras = [
    'pyramid',
    'waitress',
]

extras_require = dict(
    dev=dev_extras,
    pyramid=pyramid_extras,
    postgresql=postgresql_extras,
    oracle=oracle_extras,
)


def compress(dir='ott/map/static/js/', fname='ott.all', ext='js', filter=[], filter_match=True, out_status='w'):

    out_name = fname + '.' + ext
    out_file = open(dir + out_name, out_status)

    for root, directories, filenames in os.walk(dir):
        for filename in filenames:
            if filename.endswith(ext) and out_name != filename:

                # step 1: filter files
                if len(filter) > 0:
                    match = not filter_match
                    for f in filter:
                        if f in filename:
                            match = filter_match
                            print filename + " match " + f
                            break
                    if not match:
                        continue

                # step 2: we pass the filter, then append the file
                print filename
                f = os.path.join(root, filename)
                fh = open(f)
                data = fh.read() + '\n'
                fh.close()
                out_file.write(data)

    out_file.close()

setup(
    name='ott.map',
    version='0.1.0',
    description='Open Transit Tools - Map Web Library/Services/App',
    long_description=README + '\n\n' + CHANGES,
    keywords='GTFS,GTFS-realtime,GTFSRT',
    url='http://opentransittools.com',
    license="Mozilla-derived (http://opentransittools.com)",
    author="Open Transit Tools",
    author_email="info@opentransittools.org",
    classifiers=[
        "Programming Language :: Python",
        "Framework :: Pyramid",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
    ],
    dependency_links=[
        'git+https://github.com/OpenTransitTools/utils.git#egg=ott.utils-0.1.0',
    ],
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=requires,
    extras_require=extras_require,
    tests_require=requires,
    test_suite="ott.map.tests",
    entry_points="""\
        [paste.app_factory]
        main = ott.map.pyramid.app:main
    """,
)

compress()
compress(dir='ott/map/static/css/', ext='css')
compress(dir='ott/map/static/resources/', ext='js', filter=['jquery', 'ol.js'])
compress(dir='ott/map/static/resources/', ext='js', filter=['jquery', 'ol.js'], filter_match=False, out_status='a')
compress(dir='ott/map/static/resources/', ext='css')

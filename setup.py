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


def compress(dir='ott/map/static/', fname='ott.all', ext='js'):

    out_file = open(dir + fname + '.' + ext, 'w')

    for root, directories, filenames in os.walk(dir + ext):
        for filename in filenames:
            if filename.endswith(ext):
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
compress(ext='css')

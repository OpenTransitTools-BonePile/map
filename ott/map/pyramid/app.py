import os
import logging
log = logging.getLogger(__file__)

from pyramid.config import Configurator
from pyramid.events import subscriber
from pyramid.events import ApplicationCreated
from pyramid.events import NewRequest

from wsgiref.simple_server import make_server


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
        run with: bin/pserve pyramid.ini --reload
    """
    config = Configurator(settings=settings)
    do_static_config(config)
    config.scan()
    return config.make_wsgi_app()


def do_static_config(config, path='ott.map', cache_age=3600):
    ''' config the static folders
    '''
    config.add_static_view('static',    path + ':static',          cache_max_age=cache_age)
    config.add_static_view('html',      path + ':static/html',     cache_max_age=cache_age)
    config.add_static_view('',          path + ':static/html',     cache_max_age=cache_age)
    config.add_static_view('js',        path + ':static/js',       cache_max_age=cache_age)
    config.add_static_view('m/js',      path + ':static/js',       cache_max_age=cache_age)
    config.add_static_view('ws/js',     path + ':static/js',       cache_max_age=cache_age)
    config.add_static_view('css',       path + ':static/css',      cache_max_age=cache_age)
    config.add_static_view('m/css',     path + ':static/css',      cache_max_age=cache_age)
    config.add_static_view('ws/css',    path + ':static/css',      cache_max_age=cache_age)
    config.add_static_view('images',    path + ':static/images',   cache_max_age=cache_age)
    config.add_static_view('m/images',  path + ':static/images',   cache_max_age=cache_age)
    config.add_static_view('ws/images', path + ':static/images',   cache_max_age=cache_age)
    config.add_static_view('mock',      path + ':static/mock',     cache_max_age=cache_age)


def do_mako_config(config):
    # important ... allow .html extension on mako templates
    config.include('pyramid_mako')
    config.add_mako_renderer('.html', settings_prefix='mako.')

def do_localized_config(config, path='ott.map'):
    # internationalization ... @see: locale/subscribers.py for more info
    config.add_translation_dirs(':locale')
    config.add_subscriber(path + '.locale.subscribers.add_renderer_globals', 'pyramid.events.BeforeRender')
    config.add_subscriber(path + '.locale.subscribers.add_localizer',        'pyramid.events.NewRequest')



@subscriber(ApplicationCreated)
def application_created_subscriber(event):
    ''' what do i do?
        I'm called at startup of the Pyramid app.  
    '''
    #log.info('Starting pyramid server -- visit me on http://127.0.0.1:8080')
    print event


@subscriber(NewRequest)
def new_request_subscriber(event):
    ''' what do i do?
       1. entry point for a new server request
       2. configure the request context object (can insert new things like db connections or authorization to pass around in this given request context)
    '''
    #log.debug("new request called -- request is 'started'")
    request = event.request
    request.BASE_DIR = os.path.dirname(os.path.realpath(__file__))


def cmdline():
    ''' as an alternate to pserve, you can run this via bin/python ott/view/pyramid_app 
        it should start the server on http://127.0.0.1:8080
    '''
    

    # configuration settings
    here = os.path.dirname(os.path.abspath(__file__))
    mako_dir = os.path.join(here, 'templates')
    log.info(here + " " + mako_dir)

    # make the mako views
    settings={}
    settings['mako.directories'] = mako_dir
    config=make_config(settings)
    views.do_view_config(config)

    # serve app
    app = config.make_wsgi_app()
    server = make_server('0.0.0.0', 8080, app)
    server.serve_forever()
    get_settings()


if __name__ == '__main__':
    cmdline()


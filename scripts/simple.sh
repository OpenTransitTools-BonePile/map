DIR=$PWD
pushd $DIR/ott/map/static
echo "http://localhost/map.html"
trap "kill -- -$$" SIGINT SIGTERM EXIT
$DIR/bin/python -m SimpleHTTPServer 80

# NOTE: on windows / cygwin, the trap above doesn't kill all child python processes

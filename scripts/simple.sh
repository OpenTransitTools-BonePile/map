DIR=$PWD
pushd $DIR/ott/map/static
echo "http://localhost/map.html"
trap "kill -- -$$" SIGINT SIGTERM EXIT
PORT=${PORT:=$1}
SUDO=${SUDO:=""}
$DIR/bin/python -m SimpleHTTPServer ${PORT:="80"}

# NOTE: on windows / cygwin, the trap above doesn't kill all child python processes

pkill node
rm -r ./src
rm -r ./public
cp -r ./public-web ./public
cp -r ./src-web ./src
sync-files -w ./src-web ./src &
PORT=3003 react-scripts start
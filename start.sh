rm -r ./src
cp -r ./src-web ./src
sync-files ./src-web ./src &
PORT=3003 react-scripts start
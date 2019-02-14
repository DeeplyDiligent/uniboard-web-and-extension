BUILD_TYPE='web'
echo "Building $BUILD_TYPE"
rm -r ./public
rm -r ./src
if [ "$BUILD_TYPE" == "extension" ]
then
mkdir -p ./src
cp -rf ./src-web/* ./src
cp -rf ./src-extension/* ./src
cp -rf ./public-extension ./public
else
cp -rf ./src-web ./src
cp -rf ./public-web ./public
fi
react-scripts build
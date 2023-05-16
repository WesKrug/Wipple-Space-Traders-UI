Wipple's Space Trader IMP

To rebuild Open API client: Go to https://stoplight.io/api/v1/projects/spacetraders/spacetraders/nodes/reference/SpaceTraders.json?fromExportButton=true&snapshotType=http_service&deref=optimizedBundle
and download

then run openapi-generator-cli generate -i spaceTraderJson.json -g typescript-axios -o ./packages/spacetraders-sdk --additional-properties=npmName="spacetraders-sdk" --additional-properties=npmVersion="2.0.0" --additional-properties=supportsES6=true --additional-properties=withSeparateModelsAndApi=true --additional-properties=modelPackage="models" --additional-properties=apiPackage="api"


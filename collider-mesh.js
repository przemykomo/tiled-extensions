/*
 * Creates collider objects in selected object layer by connecting tiles horizontally.
 */

tiled.registerTool("GenerateMesh", {
    name: "Generate Collider Mesh",

    mouseDoubleClicked(button, x, y, /* modifiers */) {
        var tileLayer;
        var objectLayer;

        this.map.selectedLayers.forEach(layer => {
            if (layer.isTileLayer) {
                tileLayer = layer;
            } else if (layer.isObjectLayer) {
                objectLayer = layer;
            }
        });

        if (tileLayer && objectLayer) {
            for (let y = 0; y < tileLayer.height; y++) {
                let horizontalTilesCount = 0;

                for (let x = 0; x < tileLayer.width; x++) {
                    var tile = tileLayer.tileAt(x, y);
                    if (tile) {
                        horizontalTilesCount++;
                    }

                    if (!tile || x == tileLayer.width - 1) {
                        if (horizontalTilesCount > 0) {
                            var mapObject = new MapObject("tile_collider");
                            mapObject.x = (x - horizontalTilesCount) * this.map.tileWidth;
                            mapObject.y = y * this.map.tileHeight;
                            mapObject.width = horizontalTilesCount * this.map.tileWidth;
                            mapObject.height = this.map.tileHeight;
                            objectLayer.addObject(mapObject);

                            horizontalTilesCount = 0;
                        }
                    }
/*
                        var collider = tile.objectGroup.objects[0];
                        var objectCollider = new MapObject("tile_collider");
                        objectCollider.x = tile.width * x + collider.x;
                        objectCollider.y = tile.height * y + collider.y;
                        objectCollider.width = collider.width;
                        objectCollider.height = collider.height;
                        objectLayer.addObject(objectCollider);
                        */
                }
            }
        }
    }
})

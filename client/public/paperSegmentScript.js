const raster = new Raster("selected-image");

const originalSize = raster.size;

// Resize image to fit canvas
const aspectRatio = raster.size.width / raster.size.height;
raster.size = new Size(aspectRatio * view.size.height, view.size.height);
raster.position = view.center;

console.log(`Aspect ratio: ${aspectRatio}`);
console.log(`Size before resizing: ${originalSize}`);
console.log(`Size after resizing: ${raster.size}`);

const textItem = new PointText({
  content: "(0, 0)",
  point: new Point(0, 30),
  fillColor: "black"
});

let path;

let finishedPaths = [];

// const transformPointInverse = point => {
//   const { x, y } = point;

//   return new Point({
//     x: (x * raster.size.width) / originalSize.width,
//     y: (y * raster.size.height) / originalSize.height
//   }) + raster.position - raster.size / 2;
// }

// finishedPaths.forEach(pathArr => {
//   new Path({
//     closed: true,
//     segments: pathArr.map(point => new Point({ x: point[0], y: point[1] })).map(transformPointInverse),
//     strokeColor: "black"
//   })
// });

// Transform point to correspond to (x, y) in original image
const transformPoint = point => {
  // Make (0, 0) the top left of the image
  const { x, y } = point - raster.position + raster.size / 2;

  return new Point({
    x: (x * originalSize.width) / raster.size.width,
    y: (y * originalSize.height) / raster.size.height
  });
};

raster.onMouseMove = event => {
  const { x, y } = transformPoint(event.point);

  textItem.content = `(${x}, ${y})`;
};

raster.onClick = event => {
  if (!path) {
    path = new Path({
      fullySelected: true,
      strokeColor: "black"
    });
  }

  path.add(event.point);
};

tool.onKeyUp = event => {
  if (!path) return;

  if (event.key === "escape") {
    path.closed = true;
    path.fullySelected = false;

    const pathPoints = path.segments
      .map(
        segment =>
          new Point({
            x: segment.point.x,
            y: segment.point.y
          })
      )
      .map(transformPoint)
      .map(point => [point.x, point.y]);

    path = null;

    finishedPaths.push(pathPoints);
    console.log(JSON.stringify(finishedPaths));
  } else if (event.key === "backspace") {
    path.removeSegment(path.segments.length - 1);
  }
};

function randBool() {
  return (Math.random() < 0.5)
}

function randFactors() {
  let rx;
  let ry;
  do {
    rx = Math.random();
    ry = Math.random();
  } while ((rx + ry) > 1)

  rx = randBool() ? rx : 0 - rx;
  ry = randBool() ? ry : 0 - ry;

  return [rx, ry];
}

/**
 * Creates an array with coordinates for circles in the original coords circle
 * @param coords as Array [x, y] 
 * @returns [[x, y]]
 */
export default function generateCircles(coords) {
  console.log(`Generating Circles around coords: ${coords[0]}, ${coords[1]}`);
  let initCoords = coords || [50.597986, 8.414445];
  let d = new Date();
  let rx;
  let ry;
  let all_coords = []
  let i = 0;

  all_coords.push({
    center : initCoords,
    radius : 500,
    color: '#F00',
    start: d.getTime()
  });
  
  let arr = randFactors();
  rx = arr[0];
  ry = arr[1];

  d.setSeconds(d.getSeconds() + 5);
  // console.log(arr)
  // console.log(all_coords[i].center[0])
  all_coords.push({
    center : [all_coords[i].center[0] + rx * 0.0018, all_coords[i].center[1] + ry * 0.0028],
    radius : 300,
    color: '#0F0',
    start: d.getTime()
  })
  arr = randFactors();
  rx = arr[0];
  ry = arr[1];
  i++;

  d.setSeconds(d.getSeconds() + 5);
  all_coords.push({
    center : [all_coords[i].center[0] + rx * 0.0011, all_coords[i].center[1] + ry * 0.0017],
    radius : 180,
    color: '#00F',
    start: d.getTime()
  })
  arr = randFactors();
  rx = arr[0];
  ry = arr[1];
  i++;

  d.setSeconds(d.getSeconds() + 5);
  all_coords.push({
    center : [all_coords[i].center[0] + rx * 0.00072, all_coords[i].center[1] + ry * 0.00114],
    radius : 100,
    color: '#0FF',
    start: d.getTime()
  })
  arr = randFactors();
  rx = arr[0];
  ry = arr[1];
  i++;

  d.setSeconds(d.getSeconds() + 5);
  all_coords.push({
    center : [all_coords[i].center[0] + rx * 0.00035, all_coords[i].center[1] + ry * 0.00056],
    radius : 60,
    color: '#FF0',
    start: d.getTime()
  })
  arr = randFactors();
  rx = arr[0];
  ry = arr[1];
  i++;

  d.setSeconds(d.getSeconds() + 5);
  all_coords.push({
    center : [all_coords[i].center[0] + rx * 0.00032, all_coords[i].center[1] + ry * 0.00049],
    radius : 25,
    color: '#F0F',
    start: d.getTime()
  })
  arr = randFactors();
  rx = arr[0];
  ry = arr[1];
  i++;
  return all_coords;
}
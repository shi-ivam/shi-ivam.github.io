
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, window.innerWidth < 500 ? 10 : 5);
camera.lookAt(0, 0, 0);


const scene = new THREE.Scene();

const plane = new THREE.Mesh(new THREE.PlaneGeometry(6, 6, 20, 20), new THREE.MeshPhongMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    flatShading: THREE.FlatShading,
    vertexColors: THREE.VertexColors,
}));




const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);


scene.add(plane)

renderer.render(scene, camera);


let array = plane.geometry._bufferGeometry.attributes.position.array;

const same = [

]

// structure of the same
// same = [
//     {
//         x: 0,
//         y: 0,
//         indexes:[

//         ]
//     }
// ]


for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    const foundelem = same.find(elem => elem.x === x && elem.y === y);
    if (foundelem) {
        foundelem.indexes.push(i + 2);
    }
    else {
        same.push({
            x,
            y,
            amplitude: Math.random() * 0.25,
            random_one: Math.floor(Math.random() * 4),
            random_two: Math.floor(Math.random() * 4),
            indexes: [i + 2]
        })
    }
}



function animate(obj) {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    // plane.rotation.x += 0.01;

    

    for (let i = 0; i < same.length; i++) {
        const x = same[i].x;
        const y = same[i].y;
        const random_one = same[i].random_one;
        const random_two = same[i].random_two;
        const indexes = same[i].indexes;
        const value = [Math.sin(obj/3000 + Math.PI/2),Math.sin(obj/3000 + Math.PI*2/2),Math.sin(obj/3000 + Math.PI*3/2),Math.sin(obj/3000 + Math.PI*4/2)][random_one]*same[i].amplitude;
        valueX = [Math.sin(obj/3000 + Math.PI/2)*x*0.1,Math.sin(obj/3000 + Math.PI*2/2)*x*0.1,Math.sin(obj/3000 + Math.PI*3/2)*x*0.1,Math.sin(obj/3000 + Math.PI*4/2)*x*0.1][random_one]/10 + x;
        valueY =[Math.sin(obj/3000 + Math.PI/2),Math.sin(obj/3000 + Math.PI*2/2),Math.sin(obj/3000 + Math.PI*3/2),Math.sin(obj/3000 + Math.PI*4/2)*y*0.1][random_two]/10 + y;
        for (let j = 0; j < indexes.length; j++) {
            array[indexes[j]] = value
            array[indexes[j] - 1] = valueY
            array[indexes[j] - 2] = valueX
        }
    }
    plane.geometry._bufferGeometry.attributes.position.needsUpdate = true;
}

animate()
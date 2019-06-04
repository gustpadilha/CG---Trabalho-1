
var container;
var camera, scene, renderer, controls;
var mouseX = 0,
	mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var object;
init();
animate();

function init() {
	container = document.createElement('div');
	document.body.appendChild(container);
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
	//camera.position.set( -50, 0, 1200 );
	camera.applyMatrix(new THREE.Matrix4().makeTranslation(-50, 0, 1200));

	// scene
	scene = new THREE.Scene();
	var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
	scene.add(ambientLight);
	var pointLight = new THREE.PointLight(0xffffff, 0.8);
	camera.add(pointLight);
	scene.add(camera);

	var matrixScene = new THREE.Matrix4().makeTranslation(-50, 0, 1200);
    scene.applyMatrix(matrixScene);
    
	// manager
	function loadModel() {
		object.traverse(function (child) {
			if (child.isMesh) child.material.map = texture;
		});
		var matrixDino = new THREE.Matrix4().makeTranslation(-200, -305, 0);
		matrixDino.multiply(new THREE.Matrix4().makeScale(1, 1, 1));
		matrixDino.multiply(new THREE.Matrix4().makeRotationY(Math.PI * 2));
		object.applyMatrix(matrixDino);

		//object.position.z = - 700;
		scene.add(object);
	}
	var manager = new THREE.LoadingManager(loadModel);
	manager.onProgress = function (item, loaded, total) {
		console.log(item, loaded, total);
	};
	// texture
	var textureLoader = new THREE.TextureLoader(manager);
	var texture = textureLoader.load('textures/UV_Grid_Sm.jpg');
	// model
	function onProgress(xhr) {
		if (xhr.lengthComputable) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');
		}
	}

	function onError() {}
	var loader = new THREE.OBJLoader(manager);
	loader.load('models/obj/male02/Irex_obj.obj', function (obj) {
		object = obj;
	}, onProgress, onError);
	// second object
	loader.load('models/obj/alien/alien.obj', function (obj) {
		var matrixAlien = new THREE.Matrix4().makeTranslation(300, -305, 0);
		matrixAlien.multiply(new THREE.Matrix4().makeScale(20, 20, 20));
		matrixAlien.multiply(new THREE.Matrix4().makeRotationY(Math.PI * 2));
		obj.applyMatrix(matrixAlien);
		//obj.scale.x = obj.scale.y = obj.scale.z = 20;
		scene.add(obj);
	}, onProgress, onError);
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);
	document.addEventListener('mousemove', onDocumentMouseMove, false);
	controls = new THREE.OrbitControls(camera);
	//
    window.addEventListener('keydown', key, false);
    

}

function key(e) {
	if (e.which == 49) { // which = change position camera  (press 1)
		camera.position.set(-50, 0, 1200);
	} else if (e.which == 50) { // press 2
		camera.position.set(1000, 500, 1000);
	} else if (e.which == 51) { // press 3
		camera.position.set(-1000, 500, 1000);
	}
	var speed = 1;
	if (e.which == 68) {
		object.position.x += speed;
	} //RIGHT D
	else if (e.which == 65) {
		object.position.x -= speed;
	} //LEFT  A
	else if (e.which == 87) {
		object.position.y += speed;
	} //UP   W
	else if (e.which == 83) {
		object.position.y -= speed;
	} //DOWN S
	else if (e.which == 32) {
		object.position.z += speed;
	} //FRONT SPACE
	else if (e.which == 8) {
		object.position.z -= speed;
	} //BACK BACKSPACE
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
	mouseX = (event.clientX - windowHalfX) / 2;
	mouseY = (event.clientY - windowHalfY) / 2;
}

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	camera.lookAt(scene.position);
	renderer.render(scene, camera);
} 
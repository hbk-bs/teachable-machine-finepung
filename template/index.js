
  // Classifier Variable
  let classifier;
  // Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/Yyd6myV_4/';
  //@ts-nocheck
// @ts-ignore
let img = null;
// @ts-ignore




let label = "🍓🫐🍓🫐🍓🫐🍓🫐🍓🫐🍓🫐🍓🫐🍓🫐🍓🫐🍓🫐🍓🫐🍓🫐🍓🫐🍓";
let labelElement;

function preload() {
	classifier = ml5.imageClassifier(imageModelURL + "model.json", ()=>{
		console.log('model loaded')
	});
}

function setup() {
	// Prevent default drag behaviors
	window.addEventListener(
		"dragover",
		function (e) {
			e.preventDefault();
			e.stopPropagation();
		},
		false
	);

	window.addEventListener(
		"drop",
		function (e) {
			e.preventDefault();
			e.stopPropagation();
		},
		false
	);

	noCanvas();

	

	// Handle file input changes

	const fileInput = select("#file");
	if (fileInput) {
		fileInput.changed(handleFileInput);
	}

	labelElement = select("#prediction");
	labelElement.html(label);
	textFont("system-ui");
}

function draw() {
}


function handleFileInput(event) {
	const file = event.target.files[0];
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
		reader.onload = function (e) {
			img = createImg(e.target.result, "uploaded image");
			img.parent('image-container')
			classifyImage(img);
		};
		reader.readAsDataURL(file);
	} else {
		console.log("Not an image file selected!");
	}
}

function classifyImage(image) {
	classifier.classify(image, gotResult);
}

function gotResult(results) {
	console.log(results);
	label = results[0].label;
	labelElement.html(label);
}
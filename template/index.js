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
	classifier = ml5.imageClassifier(imageModelURL + "model.json", () => {
		console.log('model loaded');
	});
}

function setup() {
	noCanvas();

	const imageContainer = document.getElementById('image-container');
	const fileInput = select("#file");

	// Make the container clickable to trigger file input
	imageContainer.addEventListener('click', () => {
		fileInput.elt.click();
	});

	// Add cursor pointer style
	imageContainer.style.cursor = 'pointer';

	// Handle drag events
	imageContainer.addEventListener('dragover', (e) => {
		e.preventDefault();
		e.stopPropagation();
		imageContainer.classList.add('dragover');
	});

	imageContainer.addEventListener('dragleave', (e) => {
		e.preventDefault();
		e.stopPropagation();
		imageContainer.classList.remove('dragover');
	});

	imageContainer.addEventListener('drop', (e) => {
		e.preventDefault();
		e.stopPropagation();
		imageContainer.classList.remove('dragover');

		const file = e.dataTransfer.files[0];
		if (file && file.type.startsWith('image/')) {
			handleDroppedFile(file);
		}
	});

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
		// Remove previous image if it exists
		if (img) {
			img.remove();
		}

		const reader = new FileReader();
		reader.onload = function (e) {
			img = createImg(e.target.result, "uploaded image");
			img.parent('image-container');
			// Add the has-image class when image is loaded
			document.getElementById('image-container').classList.add('has-image');
			classifyImage(img);
		};
		reader.readAsDataURL(file);
	} else {
		console.log("Not an image file selected!");
	}
}

function handleDroppedFile(file) {
	if (img) {
		img.remove();
	}

	const reader = new FileReader();
	reader.onload = function (e) {
		img = createImg(e.target.result, "uploaded image");
		img.parent('image-container');
		// Add the has-image class when image is loaded
		document.getElementById('image-container').classList.add('has-image');
		classifyImage(img);
	};
	reader.readAsDataURL(file);
}

function classifyImage(image) {
	classifier.classify(image, gotResult);
}

function gotResult(results) {
	console.log(results);
	label = results[0].label;
	labelElement.html(label);
}
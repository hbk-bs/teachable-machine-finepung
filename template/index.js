// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/Yyd6myV_4/';
//@ts-nocheck
// @ts-ignore
let img = null;
// @ts-ignore

let label = "🍓🫐🍓🫐🍓🫐🍓🫐🍓🫐🍓🫐🍓🫐🍓🫐🍓";
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

	imageContainer.addEventListener('click', () => {
		fileInput.elt.click();
	});

	imageContainer.style.cursor = 'pointer';

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
		
		if (img) {
			img.remove();
		}

		const reader = new FileReader();
		reader.onload = function (e) {
			img = createImg(e.target.result, "uploaded image");
			img.parent('image-container');
			
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
    
    const existingMessage = document.querySelector('.upload-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    let messageText;
    switch(results[0].label) {
        case 'Sammelnussfrüchte':
            messageText = 'Hier bei handelt es sich botanisch gesehen um eine Sammelnussfrucht. Sammelnussfrüchte bestehen aus mehreren kleinen Nussfrüchten, die aus einer einzelnen Blüte entstehen. Ein typisches Beispiel für Sammelnussfrüchte ist die Erdbeergewächse wie Hagebutten, bei der viele kleine Nüsschen zusammen auf einem Fruchtboden sitzen.';
            break;
        case 'Ja das ist tatsächlich eine Beere':
            messageText = 'Botanisch gilt als Beere eine Frucht, die aus einem ­einzigen oder mehreren verwachsenen Fruchtblättern hervorgegangen ist und mehrere Samen mit ihrem ­Fruchtfleisch ein­hüllt. Es besteht aus drei Schichten: der Außenhaut, dem fleischigen Mittel­teil und dem oft etwas dunkleren In­nenteil, der die Samen umgibt. Dazu gehören Heidelbeeren, Holunder oder Trauben. Aber auch Bananen und Gurken gelten im botanischen Sinne als Beere. ';
            break;
        case 'Sammelsteinfrüchte':
            messageText = 'Die Sammelsteinfrucht ist eine spezielle Fruchtform, bei der sich entlang der vorgewölbten Blütenachse aus den zahlreichen Fruchtblättern je eine kleine Steinfrucht entwickelt. Diese einzelnen Steinfrüchte haften untereinander zusammen und bilden dadurch die Sammelsteinfrucht, die sich bei Fruchtreife in der Regel als Gesamtes ablöst. Himbeeren und Brombeeren sind bekannte Sammelsteinfrüchte.';
            break;
        case 'Stachelbeergewächse':
            messageText = 'Ein klassisches Stachelbeergewächs! 🫐 Zur Familie der Ribisel.';
            break;
        case 'Hier geht es um Beeren':
            messageText = 'Genau! Hier geht es um die Klassifizierung von Beeren! 🍓';
            break;
        default:
            messageText = 'Hmm, da bin ich mir nicht sicher. Versuche es nochmal! 🤔';
    }
    
    const uploadMessage = document.createElement('div');
    uploadMessage.className = 'upload-message';
    uploadMessage.textContent = messageText;
    document.getElementById('prediction').after(uploadMessage);
}
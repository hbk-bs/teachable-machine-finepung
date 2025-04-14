let model, labelContainer, maxPredictions;

// Modell und Teachable Machine laden
async function init() {
    const URL = "https://teachablemachine.withgoogle.com/models/Yyd6myV_4/"; // Ersetze dies mit dem Link zu deinem Teachable Machine Modell
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // Lade das Modell und die Metadaten
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    labelContainer = document.getElementById("prediction");

    console.log("Modell geladen.");
}

// Bild anzeigen und Vorhersage machen
async function displayImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async function(e) {
        const image = document.getElementById('imageDisplay');
        image.src = e.target.result;
        image.style.display = 'block'; // Zeigt das Bild an

        // Warten bis das Bild vollständig geladen ist
        image.onload = async function() {
            const predictions = await predict(image);
            displayPrediction(predictions);
        };
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}

// Bild vorhersagen
async function predict(image) {
    const predictions = await model.predict(image);
    return predictions;
}

// Vorhersage anzeigen
function displayPrediction(predictions) {
    // Sortiere nach Wahrscheinlichkeit (absteigend)
    predictions.sort((a, b) => b.probability - a.probability);
    const prediction = predictions[0];

    labelContainer.innerHTML = `Vorhersage: ${prediction.className} mit ${Math.round(prediction.probability * 100)}%`;
}

// Initialisierung
init();

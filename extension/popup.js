chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    let url = tabs[0].url;

    fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: url })
    })
    .then(res => res.json())
    .then(data => {

        let status = document.getElementById("status");
        let risk = document.getElementById("risk");
        let container = document.getElementById("container");

        let percentage = (data.risk_score * 100).toFixed(2) + "%";

        if (data.result === "Phishing") {
            status.innerText = "⚠️ PHISHING DETECTED";
            risk.innerText = "Risk: " + percentage;

            container.classList.add("phishing");

        } else {
            status.innerText = "✅ SAFE WEBSITE";
            risk.innerText = "Risk: " + percentage;

            container.classList.add("safe");
        }
    });
});
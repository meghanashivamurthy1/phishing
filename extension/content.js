(function () {

    function detectPhishing() {

        let url = window.location.href;

        fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: url })
        })
        .then(res => res.json())
        .then(data => {

            let percentage = (data.risk_score * 100).toFixed(2);

            let banner = document.createElement("div");

            banner.style.position = "fixed";
            banner.style.top = "0";
            banner.style.left = "0";
            banner.style.width = "100%";
            banner.style.padding = "12px";
            banner.style.textAlign = "center";
            banner.style.fontSize = "16px";
            banner.style.fontWeight = "bold";
            banner.style.zIndex = "9999";

            if (data.result === "Phishing") {

                banner.style.background = "red";
                banner.style.color = "white";

                banner.innerHTML = `
                ⚠️ PHISHING DETECTED (${percentage}%)<br>
                ${data.reasons.join("<br>")}
                `;

            } else {

                banner.style.background = "green";
                banner.style.color = "white";

                banner.innerHTML = `✅ Safe Website (${percentage}%)`;
            }

            document.body.prepend(banner);

        })
        .catch(err => console.log("Error:", err));
    }

    // wait for full load
    window.addEventListener("load", () => {
        setTimeout(detectPhishing, 1000);
    });

<<<<<<< HEAD
})();
=======
})();
>>>>>>> 798cd9b7b04d842c69d328bc82178779b80e5d41

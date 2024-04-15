function toggleDiv() {
            var div = document.getElementById("hiddenDiv");
            div.classList.toggle("visible");
            if (div.style.opacity === "0") {
                div.style.opacity = "1";
            } else {
                div.style.opacity = "0";
            }
        }



        // Parse query parameters from URL
        const urlParams = new URLSearchParams(window.location.search);
        const info_name = urlParams.get('name');
        const info_mission = urlParams.get('mission');

        // Display the received information
        document.getElementById('info_name_title').textContent = info_name;
        document.getElementById('info_name').textContent = info_name;
        document.getElementById('info_mission').textContent = info_mission;
 // Get the input field and divs
    var searchInput = document.getElementById('searchInput');
    var divs = document.querySelectorAll('.col-lg-4.col-md-6.align-self-center.mb-30.event_outer.col-md-6');

    // Add event listener for input field
    searchInput.addEventListener('input', function() {
        var searchText = searchInput.value.toLowerCase();
        var visibleDivs = [];

        // Loop through each div
        for (var i = 0; i < divs.length; i++) {
            var titleElement = divs[i].querySelector('.category');
            var title = titleElement ? titleElement.innerText.toLowerCase() : '';
            var charity = divs[i].querySelector('.author').innerText.toLowerCase();

            // Check if the title or charity name contains the search text
            if (title.includes(searchText) || charity.includes(searchText)) {
                // Show the div
                divs[i].style.display = 'block';
                // Save the visible div
                visibleDivs.push(divs[i]);
                // Change position to unset
                divs[i].style.marginBottom = 'auto';
                divs[i].style.position = 'unset';
            } else {
                // Hide the div
                divs[i].style.display = 'none';
                // Reset position to absolute
                divs[i].style.position = 'absolute';
            }
        }
        // Rearrange visible divs
        rearrangeDivs(visibleDivs);
    });

    // Function to rearrange visible divs
    function rearrangeDivs(visibleDivs) {
        // Append visible divs back to the event box
        visibleDivs.forEach(function(div) {
            div.style.display = 'block';
        });
    }
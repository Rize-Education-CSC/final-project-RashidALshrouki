    // ================================================== API ===============================================

    // Fetch data from the API using fetch() function
fetch('https://data.charitynavigator.org', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Stellate-Api-Token': 'stl8_7fb0003db979ad3533b747331da791004db08bf127fecdb7b5efa5f19c62c768'
  },
  body: JSON.stringify({
    query: `query PublicSearchFaceted($term: String!) {
      publicSearchFaceted(term: $term) {
        size
        from
        term
        result_count
        results {
          ein
          name
          cause
        }
      }
    }`,
    variables: {
      term: 'charity'
    }
  })
})
.then(response => response.json())
.then(data => {
  // Handle the data returned from the API
  displayData(data);
})
.catch(error => {
  // Handle errors
  console.error('Error:', error);
});

// Function to display data on the website
function displayData(data) {
  // Access data and display it on your website
  console.log(data);
}






// ======================= Display fetched data on website ===================

// Function to display data on the website
function displayData(data) {
  const results = data.data.publicSearchFaceted.results;

  // Get the container element
  const container = document.querySelector('.row.event_box');

  // Access each result and create HTML elements to display them
  results.forEach(result => {
    // Create elements
    const colDiv = document.createElement('div');
    colDiv.className = 'col-lg-4 col-md-6 align-self-center mb-30 event_outer col-md-6';

    const eventsItemDiv = document.createElement('div');
    eventsItemDiv.className = 'events_item';

    const thumbDiv = document.createElement('div');
    thumbDiv.className = 'thumb';

    const imgLink = document.createElement('a');
    imgLink.href = `charity_profile.html?ein=${result.ein}`;

    const thumbImg = document.createElement('img');
    thumbImg.src = 'assets/images/course.jpg'; // Placeholder image
    thumbImg.alt = '';

    const categorySpan = document.createElement('span');
    categorySpan.className = 'category';
    categorySpan.textContent = result.cause || 'General';; // Insert data into variable

    const downContentDiv = document.createElement('div');
    downContentDiv.className = 'down-content';

    const h4Link = document.createElement('h4');
    const aLink = document.createElement('a');
    aLink.className = 'charitynamesearch';
    aLink.href = `charity_profile.html?ein=${result.ein}`;
    aLink.textContent = result.name;

    // Append elements to their respective parents
    thumbDiv.appendChild(imgLink);
    imgLink.appendChild(thumbImg);
    thumbDiv.appendChild(categorySpan);
    h4Link.appendChild(aLink);
    downContentDiv.appendChild(h4Link);
    eventsItemDiv.appendChild(thumbDiv);
    eventsItemDiv.appendChild(downContentDiv);
    colDiv.appendChild(eventsItemDiv);

    // Append the new div to the container
    container.appendChild(colDiv);
  });
}




// ============================================ SEARCH ==========================================================

// Get the input field and divs
var searchInput = document.getElementById('searchInput');

// Add event listener for input field
searchInput.addEventListener('input', function() {
    var searchText = searchInput.value.toLowerCase();
    var divs = document.querySelectorAll('.col-lg-4.col-md-6.align-self-center.mb-30.event_outer.col-md-6');

    // Loop through each div
    for (var i = 0; i < divs.length; i++) {
        var titleElement = divs[i].querySelector('.category');
        var title = titleElement ? titleElement.innerText.toLowerCase() : '';
        var charity = divs[i].querySelector('.charitynamesearch').innerText.toLowerCase();

        // Check if the title or charity name contains the search text
        if (title.includes(searchText) || charity.includes(searchText)) {
            // Show the div
            divs[i].style.display = 'block';
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
});


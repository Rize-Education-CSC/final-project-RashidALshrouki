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
        const info_ein = urlParams.get('ein');
        


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
          mission
          charity_navigator_url
          encompass_star_rating
          cause
          street
          city
          state
          zip
          country
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
  const results = data.data.publicSearchFaceted.results;
  const charityData = findCharityByEIN(results, info_ein);
  if (charityData) {
    displayData(charityData);
    // Found charity data with matching EIN
    //showDialog(charityData.name);
  } else {
    // Charity with matching EIN not found
    showDialog("Sorry, this profile has been removed by charitynavigator!");
  }
})
.catch(error => {
  // Handle errors
  console.error('Error:', error);
});




//=================================== 

// Function to find charity data by EIN
function findCharityByEIN(results, ein) {
  for (const charity of results) {
    if (charity.ein === ein) {
      return charity;
    }
  }
  return null; // Charity not found
}




// ======================= Display fetched data on website ===================

function displayData(data_result) {

document.getElementById('info_name_title').textContent = data_result.name;
document.getElementById('info_name').textContent = data_result.name;
document.getElementById('info_description').textContent = "  " + data_result.mission;

document.getElementById('info_mission').textContent = data_result.cause;
document.getElementById('info_url').textContent = "Charity Link";
document.getElementById('info_url').href = data_result.charity_navigator_url;
document.getElementById('info_url').target = '_blank';
document.getElementById('info_rate').textContent = data_result.encompass_star_rating;
document.getElementById('info_address').textContent = `${data_result.street}, ${data_result.city}, ${data_result.state} ${data_result.zip}, ${data_result.country}`;

//`${result.street}, ${result.city}, ${result.state} ${result.zip}, ${result.country}`

}



// Function to display a dialog message with custom input
function showDialog(message) {
  // Create a dialog element
  const dialog = document.createElement('dialog');

  // Create a message element to display the input
  const messageElement = document.createElement('p');
  messageElement.textContent = message;

  // Create a close button
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.addEventListener('click', () => {
    dialog.close(); // Close the dialog when the close button is clicked
  });

  // Append elements to the dialog
  dialog.appendChild(messageElement);
  dialog.appendChild(closeButton);

  // Show the dialog
  document.body.appendChild(dialog);
  dialog.showModal(); // Display the dialog as a modal
}





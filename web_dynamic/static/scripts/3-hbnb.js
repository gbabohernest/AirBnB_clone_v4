/*
 * A script that will be executed only when DOM is loaded.
 * Listen for changes on each input checkbox tag:
 *   - if checkbox is checked, it store amenity id in a variable(dict or list)
 *   - if checkbox is unchecked, it remove amenity id from the variable.
 *   - update h4 tag inside div amenities with list of amenities checked
 * Request http://0.0.0.0:5001/api/v1/status/:
 *   - If in the status is “OK”, add the class available to the div#api_status
 *   - Otherwise, remove the class available to the div#api_status
 * Request http://0.0.0.0:5001/api/v1/places_search/:
 *   - Description of this endpoint here. If this endpoint is not available, you will have to add it to the API 
 *   - Send a POST request with Content-Type: application/json and an empty dictionary in the body
 *   - Loop into the result of the request and create an article tag representing a Place in the section.places. 
 */

$(document).ready(function () {
  const selectedAmenities = {};

  function updateAmenitiesList() {
    // update the h4 tag with selected amenities
    const amenitiesList = Object.values(selectedAmenities).join(', ');
    $('div.amenities h4').text(amenitiesList);
  }

  function checkAPI() {
    // checks api status if 'OK'
    $.get('http://localhost:5001/api/v1/status/', function (data, status) {
      if (data.status == 'OK') {
        $('div#api_status').addClass('available');
      }
      else {
        $('div#api_status').removeClass('available')
      }
    });
  }

  function fetchPlaces() {
    // expects JSON response and performs POST request to API endpoint
    $.ajax({
      url: 'http://localhost:5001/api/v1/places_search/',
      type: 'POST',
      contentType: application/json,
      dataType: 'JSON',
      data:'{}',
      sucess: function(places) {
        // fetches each place info and appends the info in the places section
        for (const place of places) {
          const place_article = `<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">
              ${place.price_by_night}
            </div>
          </div>
          <div class="information">
            <div class="max_guest">
              ${place.max_guest} Guest{% if ${place.max_guest} != 1 %}s{% endif
              %}
            </div>
            <div class="number_rooms">
              ${place.number_rooms} Bedroom{% if ${place.number_rooms} != 1
              %}s{% endif %}
            </div>
            <div class="number_bathrooms">
              ${place.number_bathrooms} Bathroom{% if ${place.number_bathrooms} != 1
              %}s{% endif %}
            </div>
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>`;
        $('SECTION.places').append(place_article);
        }
      }
    });
  }

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).prop('checked')) {
      // checkbox is checked, store amenity ID in the variable
      selectedAmenities[amenityId] = amenityName;
    } else {
      // not checked, remove amenity ID from the variable
      delete selectedAmenities[amenityId];
    }

    updateAmenitiesList();
    checkAPI();
    fetchPlaces();
  });
});

/*
 * A script that will be executed only when DOM is loaded.
 * Listen for changes on each input checkbox tag:
 *   - if checkbox is checked, it store amenity id in a variable(dict or list)
 *   - if checkbox is unchecked, it remove amenity id from the variable.
 *   - update h4 tag inside div amenities with list of amenities checked
 * Request http://0.0.0.0:5001/api/v1/status/:
 *   - If in the status is “OK”, add the class available to the div#api_status
 *   - Otherwise, remove the class available to the div#api_status
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
  });
});

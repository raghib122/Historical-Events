$(document).ready(function() {
    $('#searchButton').on('click', function() {
        var text = $('#searchInput').val();
        var date = $('#dateInput').val();
        var apiUrl = 'https://api.api-ninjas.com/v1/historicalevents';

        // Add your API key here
        var apiKey = 'n8EyKaqyzclwKOGRZhUKrA==33iTgW0O8IM1Vy8F';
        
        var requestData = {
            text: text,
            // Assuming the date is in the format YYYY-MM-DD
            year: date ? date.split('-')[0] : '',
            month: date ? date.split('-')[1] : '',
            day: date ? date.split('-')[2] : ''
        };

        $.ajax({
            method: 'GET',
            url: apiUrl,
            headers: { 'X-Api-Key': apiKey },
            data: requestData,
            success: function(result) {
                displayResults(result);
            },
            error: function(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        });
    });
});

function displayResults(results) {
    var resultsDiv = $('#results');
    resultsDiv.empty();

    if (results && results.length > 0) {
        results.forEach(function(event) {
            var formattedDate = event.year + '-' + event.month + '-' + event.day;
            var eventHTML = '<div class="result-item"><p><strong>Date:</strong> ' + formattedDate + '</p><p><strong>Event:</strong> ' + event.event + '</p></div>';
            resultsDiv.append(eventHTML);
        });
    } else {
        resultsDiv.append('<p>No results found.</p>');
    }
}

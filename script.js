document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const resultsDiv = document.getElementById('results');
  
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const searchTerm = searchInput.value.toLowerCase();
      searchInCSV(searchTerm);
    });
  
    function searchInCSV(term) {
      fetch('/data.csv')
        .then(response => response.text())
        .then(data => {
          const rows = data.split('\n');
          const headers = rows[0].split(',');
          const searchData = rows.slice(1).map(row => row.split(','));
          
          const matchingResults = searchData.filter(row =>
            row.some(cell => cell.toLowerCase().includes(term))
          );
  
          displayResults(matchingResults, headers);
        });
    }
  
    function displayResults(results, headers) {
      let output = '';
      if (results.length > 0) {
        output += '<table>';
        output += '<tr>' + headers.map(header => `<th>${header}</th>`).join('') + '</tr>';
        results.forEach(row => {
          output += '<tr>' + row.map(cell => `<td>${cell}</td>`).join('') + '</tr>';
        });
        output += '</table>';
      } else {
        output = '<p>No results found.</p>';
      }
      resultsDiv.innerHTML = output;
    }
  });
  
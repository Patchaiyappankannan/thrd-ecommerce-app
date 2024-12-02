import Papa from 'papaparse';

export const loadCSV = (file) => {
  return new Promise((resolve, reject) => {
    fetch(file)
      .then((response) => response.text()) 
      .then((csvData) => {
        Papa.parse(csvData, {
          complete: (result) => {
            console.log('Parsed CSV Result:', result); 
            resolve(result.data); 
          },
          header: true,
          skipEmptyLines: true,
        });
      })
      .catch((error) => {
        console.error('Error fetching CSV:', error); 
        reject(error); 
      });
  });
};

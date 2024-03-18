// 'use strict';

const BASE_URL = 'http://numbersapi.com/42?json';

async function showNumberTrivia() {
  // get response
  const response = await fetch(
    BASE_URL);
  // {headers: {'Content-Type': 'application/json'}});

  // parse response
  const responseData = await response.json();
  // log data
  console.log(responseData.text);
}




await showNumberTrivia();
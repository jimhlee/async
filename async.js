// 'use strict';

const BASE_URL = 'http://numbersapi.com';

async function showNumberTrivia() {
  // get response
  const response = await fetch(
    `${BASE_URL}/42?json`);
  // {headers: {'Content-Type': 'application/json'}});
  console.log(response);
  // parse response
  const responseData = await response.json();
  console.log(responseData);
  // log data
  console.log(responseData.text);
}




await showNumberTrivia();


async function showNumberRace() {
  const num1 = fetch(`${BASE_URL}/12?json`);
  const num2 = fetch(`${BASE_URL}/7?json`);
  const num3 = fetch(`${BASE_URL}/19?json`);
  const num4 = fetch(`${BASE_URL}/5?json`);

  const answerPromise = await Promise.race([num1, num2, num3, num4]);
  const responseData = await answerPromise.json();
  console.log(await responseData.text);
}

await showNumberRace();


async function showNumberAll() {
  const num1 = fetch(`${BASE_URL}/12?json`);
  const num2 = fetch(`${BASE_URL}/7?json`);
  const num3 = fetch(`${BASE_URL}/19?json`);
  const num4 = fetch(`${BASE_URL}/WRONG?json`);

  let results = await Promise.allSettled([num1, num2, num3, num4]);
  console.log(results[0]);

  const successArray = [];
  const failureArray = [];

  for (let result of results) {
      if (result.value.ok) {
        console.log("result=", result);
        const response = await result.value.json();
        successArray.push(response.text);
      } else {
        failureArray.push(result.value.statusText);
      }
  }
  console.log(successArray);
  console.log(failureArray);

}

await showNumberAll();
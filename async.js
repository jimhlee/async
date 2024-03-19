// 'use strict';

const BASE_URL = 'http://numbersapi.com';

async function showNumberTrivia(num) {
  // get response
  const response = await fetch(
    `${BASE_URL}/${num}?json`);
  // {headers: {'Content-Type': 'application/json'}});
  // console.log(response);
  // parse response
  const responseData = await response.json();
  // log data
  console.log(responseData.text);
}

async function showNumberRace(nums) {
  // call this promises instead, be explicit
  const requests = nums.map((num) => {
    return fetch(`${BASE_URL}/${num}?json`);
  });

  // const num1 = fetch(`${BASE_URL}/12?json`);
  // const num2 = fetch(`${BASE_URL}/7?json`);
  // const num3 = fetch(`${BASE_URL}/19?json`);
  // const num4 = fetch(`${BASE_URL}/5?json`);

  // call this winner or similar
  const answerPromise = await Promise.race(requests);
  const responseData = await answerPromise.json();
  console.log(await responseData.text);
}

async function showNumberAll(nums) {
  const answerPromise = nums.map((num) => {
    return fetch(`${BASE_URL}/${num}?json`);
  });

  // const num1 = fetch(`${BASE_URL}/12?json`);
  // const num2 = fetch(`${BASE_URL}/7?json`);
  // const num3 = fetch(`${BASE_URL}/19?json`);
  // const num4 = fetch(`${BASE_URL}/WRONG?json`);

  let results = await Promise.allSettled(answerPromise);

  const successArray = [];
  const failureArray = [];

  for (let result of results) {
    if (result.value.ok) {
      // console.log("result=", result);
      const response = await result.value.json();
      successArray.push(response.text);
    } else {
      failureArray.push(result.value.statusText);
    }
  }
  console.log(successArray);
  console.log(failureArray);

}


async function main() {
  const first = await showNumberTrivia(12);
  // console.log(first);
  const second = await showNumberRace([1, 2, 3, 4]);
  // console.log(second);
  const third = await showNumberAll([12, 7, 30, 'wrong']);
  // console.log(third);

}

main();
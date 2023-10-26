const puppeteer = require("puppeteer");
const fs = require("fs");
const matrixGen = require("./matrix-generator");

// const path = require("path");
const matrixCount = 2;
const matrixSize = 4;

(async () => {
  // Load the matrix data from the JSON file
  // const jsonFilePath = path.join(__dirname, "test-data", "matrix_input.json");

  // const rawData = fs.readFileSync(jsonFilePath);
  // const inputData = JSON.parse(rawData);
  let inputData = [];
  for (let i = 0; i< matrixCount; i++){
    // const [matrix1, matrix2] = generateMatrixPairs(matrixCount);
    inputData.push(matrixGen.generateMatrixPairs(matrixCount));
  }
  console.log(inputData);

  // Generate 100 matrices that will be used for tests;


  const browser = await puppeteer.launch({ headless: false });

  // Create a new page
  const page = await browser.newPage();

  // Navigate to the specified URL
  const timeStorage = [];

  await page.exposeFunction("onCustomEvent", (data) => {
    timeStorage.push(data);
  });

//   await page.evaluateOnNewDocument(() => {
//     window.addEventListener('thingie-js-end', ({ detail }) => {
//         window.onCustomEvent(detail);
//     });
// });

  await page.goto("http://127.0.0.1:5173/");


  // await page.evaluate(function () {
  //   console.log("Hello world 234");

  //   document.addEventListener("thingie-js-end", (e) => {
  //     console.log("Hello world");
  //     timeStorage.push(e.detail.measuredTime);
  //   });

  //   return;
  // });

  {
    const performanceMetrics = await page.metrics();

    console.log("Initial Performance Metrics:");
    console.log(performanceMetrics);
  }

  for (let i = 0; i < inputData.length; i++) {
    const input = inputData[i];
    // Input matrix1 and matrix2 values
    await page.type("#matrix1",  matrixGen.serializeMatrix(input.matrix1));
    await page.type("#matrix2", matrixGen.serializeMatrix(input.matrix2));

    // Start DevTools tracing
    await page.tracing.start({
      path: `trace_input_${i}.json`,
      screenshots: true,
    });

    // Record the start time
    // Considers also rendering
    const startTime = performance.now();

    await page.click("#js-calc");

    await page.waitForSelector("#js-result");

    const result = await page.evaluate(() => {
      return document.querySelector("#js-result").textContent;
    });

    await page.tracing.stop();

    const endTime = performance.now();

    // Calculate the execution time in milliseconds
    const executionTime = endTime - startTime;

    // Output the result, execution time, and performance metrics
    console.log("Result:");
    console.log(result);

    console.log("Execution Time (ms):");
    console.log(executionTime);

    const performanceMetrics = await page.metrics();

    console.log("Performance Metrics:");
    console.log(performanceMetrics);

    // Clear the textareas for the next iteration
    await page.$eval("#matrix1", (input) => (input.value = ""));
    await page.$eval("#matrix2", (input) => (input.value = ""));
  }

  console.log("Received time results:");
  console.log(timeStorage);

  // Close the browser
  await browser.close();
})();

const puppeteer = require("puppeteer");
const fs = require("fs");
const matrixGen = require("./matrix-generator");

// const path = require("path");
const matrixCount = 13;
const matrixSize = 4;
const ignoreFirstN = 10;

(async () => {
  let inputData = [];
  for (let i = 0; i < matrixCount; i++) {
    inputData.push(matrixGen.generateMatrixPairs(matrixSize));
  }
  console.log(JSON.stringify(inputData));

  await runTestSuite("js", inputData);
  await runTestSuite("wasm", inputData);

  // Generate 100 matrices that will be used for tests;

  // const browser = await puppeteer.launch({ headless: false });

  // const page = await browser.newPage();

  // const timeStorage = [];

  // await page.exposeFunction("onCustomEvent", (data) => {
  //   timeStorage.push(data);
  // });

  // await page.goto("http://127.0.0.1:5173/");

  // for (let i = 0; i < inputData.length; i++){
  //   const input = inputData[i];
  //   await testInput(page, input, 'js');
  // }

  // await browser.close();

  // console.log("JS time results:");
  // console.log(timeStorage);

  // // Close the browser
  // await browser.close();
})();

async function runTestSuite(impl, inputData) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  let timeStorage = [];

  await page.exposeFunction("onCustomEvent", (data) => {
    timeStorage.push(data);
  });

  await page.goto("http://127.0.0.1:4173/");
  // await page.goto("http://127.0.0.1:5173/");

  for (let i = 0; i < inputData.length; i++) {
    const input = inputData[i];
    let res = await testInput(page, input, impl);
    timeStorage[i] = {...res, ...timeStorage[i]};
  }

  console.log(`${impl.toUpperCase()} time results:`);
  if(matrixCount > ignoreFirstN ) {
    timeStorage.splice(0,ignoreFirstN);
  }
  console.log(JSON.stringify(timeStorage));

  // Close the browser
  await browser.close();
}

async function testInput(page, input, impl) {
  const initialHeapSize = (await page.metrics()).JSHeapUsedSize;

  await page.type(
    `.${impl}-impl #matrix1`,
    matrixGen.serializeMatrix(input.matrix1)
  );
  await page.type(
    `.${impl}-impl #matrix2`,
    matrixGen.serializeMatrix(input.matrix2)
  );

  // alternative: measure execution time including render of the results
  const startTime = performance.now();

  await page.click(`#${impl}-calc`);

  await page.waitForSelector(`#${impl}-result`);

  const endTime = performance.now();

  const timeWithRender = endTime - startTime;

  // console.log(`Execution Time (ms) with result render: ${executionTime}`);

  const performanceMetrics = await page.metrics();
  const heapSize = performanceMetrics.JSHeapUsedSize ;
  // const heapMB = performanceMetrics.JSHeapUsedSize / (1024 * 1024);
  const deltaHeapSize = performanceMetrics.JSHeapUsedSize - initialHeapSize;
  const testRunResult = {
    heapSize,
    deltaHeapSize,
    timeWithRender
  }
  // console.log(JSON.stringify(testRunResult))
  // console.log("Heap size (MB): ", heapMB);
  // console.log("Delta heap size (MB): ", deltaHeap / (1024 * 1024));

  // Clear the textareas for the next iteration
  await page.$eval(`.${impl}-impl #matrix1`, (input) => (input.value = ""));
  await page.$eval(`.${impl}-impl #matrix2`, (input) => (input.value = ""));
  return testRunResult;
}

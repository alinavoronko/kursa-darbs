// import { performMatrixMultiplication } from './martix_multiplication.js';

export function getMatrixInput(scope) {
    // Get the input matrices as strings from the text areas
    console.log(`.${scope} matrix1`)
    const matrix1Str = document.querySelector(`.${scope} #matrix1`).value;
    const matrix2Str = document.querySelector(`.${scope} #matrix2`).value;
    // const matrix2Str = document.getElementById("matrix2").value;

    // Parse the input matrices
    const matrix1 = parseMatrix(matrix1Str);
    const matrix2 = parseMatrix(matrix2Str);

    // Check if the matrices are valid for multiplication
    if (!isValidForMultiplication(matrix1, matrix2)) {
      alert(
        "Invalid matrices for multiplication. Matrix1 columns must be equal to Matrix2 rows."
      );
      return;
    }
    return [matrix1, matrix2];
  }

  function parseMatrix(matrixStr) {
    const rows = matrixStr.split("\n");
    const matrix = rows.map((row) => row.split(",").map(Number));
    return matrix;
  }

  function isValidForMultiplication(matrix1, matrix2) {
    return matrix1[0].length === matrix2.length;
  }

//   function performMatrixMultiplication(matrix1, matrix2) {
//     console.time("Matrix Multiplication");
//     const result = [];
//     const m = matrix1.length;
//     const n = matrix2[0].length;
//     const p = matrix2.length;

//     for (let i = 0; i < m; i++) {
//       result.push([]);
//       for (let j = 0; j < n; j++) {
//         result[i][j] = 0;
//         for (let k = 0; k < p; k++) {
//           result[i][j] += matrix1[i][k] * matrix2[k][j];
//         }
//       }
//     }
//     console.timeEnd("Matrix Multiplication");
//     return result;
//   }

  export function displayMatrix(matrix, elementId) {
    const resultElement = document.getElementById(elementId);
    resultElement.innerHTML = "";

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        resultElement.innerHTML += matrix[i][j] + " ";
      }
      resultElement.innerHTML += "<br>";
    }
  }
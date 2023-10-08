export function performMatrixMultiplication(matrix1, matrix2) {
    const result = [];
    const m = matrix1.length; //rows of matrix1
    const n = matrix2[0].length; //cols of matrix1
    const p = matrix2.length; //rows of matrix2

    for (let i = 0; i < m; i++) {
      result.push([]);
      for (let j = 0; j < n; j++) {
        result[i][j] = 0;
        for (let k = 0; k < p; k++) {
          result[i][j] += matrix1[i][k] * matrix2[k][j];
        }
      }
    }
    console.log(result);
    return result;
  }
export function performMatrixMultiplication(matrix1, matrix2) {
    // console.time("Matrix Multiplication");
    const result = [];
    const m = matrix1.length;
    const n = matrix2[0].length;
    const p = matrix2.length;

    for (let i = 0; i < m; i++) {
      result.push([]);
      for (let j = 0; j < n; j++) {
        result[i][j] = 0;
        for (let k = 0; k < p; k++) {
          result[i][j] += matrix1[i][k] * matrix2[k][j];
        }
      }
    }
    // console.timeEnd("Matrix Multiplication");
    return result;
  }
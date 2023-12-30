/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMatrix(row, col) {
  let matrix = [];
  for (let i = 0; i < row; i++) {
    matrix[i] = [];
    for (let j = 0; j < col; j++) {
      matrix[i][j] = getRandomInt(1, 100);
    }
  }
  return matrix;

}

function serializeMatrix(matrix) {
	return matrix.map(row => row.join(",")).join("\n");
}

function generateMatrixPairs(dim) {
// dim-1
    let dim2 = dim > 1 ? dim-1: dim;

//it has to be col1 == row2
// square matrices
    let matrix1 = generateMatrix(dim2, dim);
    let matrix2 = generateMatrix(dim, dim2);
    return {matrix1, matrix2};
    // return [matrix1, matrix2];
}


module.exports = {
    getRandomInt,
    generateMatrix,
    serializeMatrix,
    generateMatrixPairs,
}
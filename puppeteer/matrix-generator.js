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
      matrix[i][j] = getRandomInt(1, 99999);
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


/**
 * function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMatrix(row, col) {
  let matrix = [];
  for (let i = 0; i < row; i++) {
    matrix[i] = [];
    for (let j = 0; j < col; j++) {
      matrix[i][j] = getRandomInt(1, 99999);
    }
  }
  return matrix;
}

//console.log(generateMatrix(4,4));
let genMatrix = generateMatrix(4,4);

function serializeMatrix(matrix) {
	let result = "";
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      result = result + matrix[i][j];
      if(j < matrix[i].length - 1) {
      result = result + ","
      }
    }
     result = result + "\n"
  }
  return result;
}

function holdMyBeer(matrix) {
	return matrix.map(row => row.join(",")).join("\n");
}

console.log(serializeMatrix(genMatrix));

console.log('Beer: ', holdMyBeer(genMatrix));

 */

module.exports = {
    getRandomInt,
    generateMatrix,
    serializeMatrix,
    generateMatrixPairs,
}
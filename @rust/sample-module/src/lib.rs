use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Default, Clone)]
pub struct MyMatrix(pub Vec<Vec<i32>>);

#[wasm_bindgen]
pub fn perform_matrix_multiplication(matrix1: JsValue, matrix2: JsValue) -> JsValue {
    let matrix1: Vec<Vec<i32>> = serde_wasm_bindgen::from_value::<MyMatrix>(matrix1.into())
        .unwrap()
        .0;
    let matrix2: Vec<Vec<i32>> = serde_wasm_bindgen::from_value::<MyMatrix>(matrix2.into())
        .unwrap()
        .0;

    let m = matrix1.len();
    let n = matrix2[0].len();
    let p = matrix2.len();

    let mut result = vec![vec![0; n]; m];
    for i in 0..m {
        for j in 0..n {
            for k in 0..p {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }

    let result_matrix = MyMatrix(result);
    let wrapped: Result<JsValue, serde_wasm_bindgen::Error> =
        serde_wasm_bindgen::to_value(&result_matrix).into();
    wrapped.unwrap()
}

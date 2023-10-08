use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;

// #[wasm_bindgen]
// extern "C" {
//     #[wasm_bindgen(js_namespace = console)]
//     fn log(s: JsValue);
//     #[wasm_bindgen(js_namespace = console)]
//     fn error(s: &str);
//     fn alert(s: &str);
// }

// #[wasm_bindgen(start)]
// pub fn run() {
//     log("wasm started".into())
// }

// #[wasm_bindgen]
// pub fn add(a: isize, b: isize) -> isize {
//     a + b
// }

// #[cfg(test)]
// mod tests {
//     use super::*;

//     #[test]
//     fn test_add() {
//         assert_eq!(add(2, 2), 4)
//     }
// }


// #[wasm_bindgen]
// pub fn perform_matrix_multiplication(
//     matrix1: Vec<Vec<i32>>,
//     matrix2: Vec<Vec<i32>>,
// ) -> Vec<Vec<i32>> {
//     let m = matrix1.len();
//     let p = matrix2.len();
//     let n = matrix2[0].len();

//     let mut result: Vec<Vec<i32>> = vec![vec![0; n]; m];

//     for i in 0..m {
//         for j in 0..n {
//             for k in 0..p {
//                 result[i][j] += matrix1[i][k] * matrix2[k][j];
//             }
//         }
//     }

//     result
// }


// #[wasm_bindgen]
// pub fn perform_matrix_multiplication(
//     matrix1: Vec<i32>,
//     matrix2: Vec<i32>,
//     m: usize,
//     p: usize,
//     n: usize,
// ) -> Vec<i32> {
//     let mut result: Vec<i32> = vec![0; m * n];

//     for i in 0..m {
//         for j in 0..n {
//             for k in 0..p {
//                 result[i * n + j] += matrix1[i * p + k] * matrix2[k * n + j];
//             }
//         }
//     }

//     result
// }



// #[wasm_bindgen]
// pub fn perform_matrix_multiplication(
//     matrix1: Vec<Vec<i32>>,
//     matrix2: Vec<Vec<i32>>,
// ) -> Vec<i32> {
//     let m = matrix1.len();
//     let p = matrix2.len();
//     let n = matrix2[0].len();

//     let mut result: Vec<i32> = vec![0; m * n];

//     for i in 0..m {
//         for j in 0..n {
//             for k in 0..p {
//                 result[i * n + j] += matrix1[i][k] * matrix2[k][j];
//             }
//         }
//     }

//     result
// }



use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Default, Clone)]
pub struct MyMatrix(pub Vec<Vec<i32>>);
// struct MyMatrix(pub Vec<Vec<i32>>);

#[wasm_bindgen]
pub fn perform_matrix_multiplication(_matrix1: JsValue, _matrix2: JsValue) -> JsValue {
    // let matrix1: Vec<Vec<i32>> = serde_wasm_bindgen::from_value::<MyMatrix>(matrix1.into()).unwrap().0;
    // let matrix2: Vec<Vec<i32>> = serde_wasm_bindgen::from_value::<MyMatrix>(matrix2.into()).unwrap().0;

    // let m = matrix1.len();
    // let p = matrix2.len();
    // let n = matrix2[0].len();

    // let mut result: Vec<i32> = vec![0; m * n];
    //[[], [], [0, 1]]

    // for i in 0..m {
    //     for j in 0..n {
    //         for k in 0..p {
    //             result[i * n + j] += matrix1[i][k] * matrix2[k][j];
    //         }
    //     }
    // }
//TODO: rewrite the implementation  so that it does the multiplication correctly
    let mut result: Vec<Vec<i32>> = vec![];
    result.push(vec![3, 4]);
    result.push(vec![5, 11]);

    let result_matrix = MyMatrix(result);
    let wrapped: Result<JsValue, serde_wasm_bindgen::Error> = serde_wasm_bindgen::to_value(&result_matrix).into();
    wrapped.unwrap()
}

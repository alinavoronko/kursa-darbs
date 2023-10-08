use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: JsValue);
    #[wasm_bindgen(js_namespace = console)]
    fn error(s: &str);
    fn alert(s: &str);
}

#[wasm_bindgen(start)]
pub fn run() {
    log("wasm started".into())
}

#[wasm_bindgen]
pub fn add(a: isize, b: isize) -> isize {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 2), 4)
    }
}


#[no_mangle]
pub extern "C" fn perform_matrix_multiplication(
    matrix1: Vec<Vec<i32>>,
    matrix2: Vec<Vec<i32>>,
) -> Vec<Vec<i32>> {
    let m = matrix1.len();
    let p = matrix2.len();
    let n = matrix2[0].len();

    let mut result: Vec<Vec<i32>> = vec![vec![0; n]; m];

    for i in 0..m {
        for j in 0..n {
            for k in 0..p {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }

    result
}

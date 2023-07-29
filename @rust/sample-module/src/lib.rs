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

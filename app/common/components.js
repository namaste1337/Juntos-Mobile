// Thi file will host function commonly
// user among presentational components

// Move this function to a common file
export function renderIf(condition, content) {
    if (condition) {
        return content;
    } else {
        return null;
    }
}

// Thi file will host functions commonly
// used among components

////////////////////////
// Import Modules
////////////////////////

////////////////////////
// Constants
////////////////////////

////////////////////////
// Helper Functions
////////////////////////

////////////////////////
// Functions
////////////////////////

// Function handles JSX conditional rendering
export function renderIf(condition, content) {
    if (condition) {
        return content;
    } else {
        return null;
    }
}

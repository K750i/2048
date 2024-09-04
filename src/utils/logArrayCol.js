export default function logArrayWithColumns(arr, columns = 4) {
  let result = '';
  for (let i = 0; i < arr.length; i++) {
    result += arr[i] + '\t'; // '\t' adds a tab space for better formatting
    if ((i + 1) % columns === 0) {
      result += '\n'; // Add a newline character after each row
    }
  }
  console.log(result);
}

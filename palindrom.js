function countPalindromes(sentence) {
  // Hapus semua spasi dan convert ke lowercases
  const cleanSentence = sentence.replace(/\s/g, "").toLowerCase();

  // Check apakah palindrom
  const reversedSentence = cleanSentence.split("").reverse().join("");

  if (cleanSentence === reversedSentence) {
    // Jika itu palindrom, maka hitung spasi + 1 and log the result
    const spaceCount = sentence.split(" ").length - 1;
    console.log(`Kalimat: "${sentence}" it is a palindrome`);
    return spaceCount + 1;
  } else {
    // Jika bukan palindrom, log itu bukan palindrome
    console.log(`Kalimat: "${sentence}" it is not a palindrome`);
    return 0;
  }
}

// Example usage:
const inputSentence1 = "kasur ini rusak";
const inputSentence2 = "ini";

console.log(
  `The number of palindromes in the sentence is ${countPalindromes(
    inputSentence1
  )}`
);

console.log(
  `The number of palindromes in the sentence is ${countPalindromes(
    inputSentence2
  )}`
);

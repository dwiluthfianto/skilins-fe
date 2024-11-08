export function GetFirstLetterStr(letter: string) {
  if (!letter) return "";
  const changeLetter = letter.match(/\b(\w)/g);
  return changeLetter ? changeLetter.join("") : "";
}

export function GetFirstLetterStr(letter: string) {
  if (typeof letter !== "string") return "";
  const changeLetter = letter.match(/\b(\w)/g);
  return changeLetter ? changeLetter.join("") : "";
}

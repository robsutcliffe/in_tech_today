export default function isMostlyEnglish(str) {
  let englishCount = 0;

  for (let i = 0; i < str.length; i++) {
    if ((str[i] >= "a" && str[i] <= "z") || (str[i] >= "A" && str[i] <= "Z")) {
      englishCount++;
    }
  }
  const englishPercentage = (englishCount / str.length) * 100;
  return englishPercentage >= 60;
}

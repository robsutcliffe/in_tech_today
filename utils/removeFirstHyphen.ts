export default function removeFirstHyphen(str: string): string {
  if (str.charAt(0) === "-") {
    return str.substring(1);
  } else {
    return str;
  }
}

export default function removeFirstHyphen(str) {
  if (str.charAt(0) === "-") {
    return str.substring(1);
  } else {
    return str;
  }
}

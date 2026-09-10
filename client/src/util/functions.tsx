export function cleanEventName(name: string) {
  if (name) {
    let result = name.replaceAll("-", " ");

    const words = result.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    result = words.join(" ");
    return result;
  }
}

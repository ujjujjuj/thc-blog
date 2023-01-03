const MAX_LEN = 133;

const getDescription = (content: string): string => {
  const lines = content.split("\n");
  let desc = "";
  for (const line of lines) {
    // remove all headings and sorted+unsorted list items
    if (
      line[0] !== "#" &&
      line[0] !== "-" &&
      line.length > 1 &&
      line[1] !== ")" &&
      line.length > 2 &&
      line[2] !== ")"
    ) {
      desc += line;
      if (desc.length > MAX_LEN) break;
    }
  }

  return desc;
};

export default getDescription;

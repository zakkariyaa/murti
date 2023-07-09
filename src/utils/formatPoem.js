const formatPoem = (text) => {
  const lines = text
    .split('.')
    .map((line) => line.trim())
    .filter((line) => line !== '');

  const lineGroups = [];

  for (let i = 0; i < lines.length; i += 4) {
    const endIndex = Math.min(i + 4, lines.length);
    const chunk = lines.slice(i, endIndex);
    const group = {
      1: chunk[0] ? chunk[0] : '',
      2: chunk[1] ? chunk[1] : '',
      3: chunk[2] ? chunk[2] : '',
      4: chunk[3] ? chunk[3] : '',
    };

    lineGroups.push(group);
  }

  return lineGroups;
};

export default formatPoem;

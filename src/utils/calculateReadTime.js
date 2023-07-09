// Find your total word count. Let’s say it’s 938 words.
// Divide your total word count by 200. You’ll get a decimal number, in this case, 4.69.
// The first part of your decimal number is your minute. In this case, it’s 4.
// Take the second part — the decimal points — and multiply that by 0.60. Those are your seconds.
// Round up or down as necessary to get a whole second. In this case, 0.69 x 0.60 = 0.414.
// We’ll round that to 41 seconds.
// The result? A four-minute, 41-second read.
// You can also round up that time to make things simpler for your reader.
// That would make your 938-word article a 5-minute read.

const calculateReadTime = (text) => {
  const totalWords = text.split(' ');
  const minutes = totalWords.length / 200;
  const seconds = (minutes % 1) * 0.6;
  const roundedSeconds = Math.ceil(seconds * 100) / 100;
  const truncatedMinutes = Math.trunc(minutes);

  return roundedSeconds > 0.3 ? truncatedMinutes + 1 : truncatedMinutes;
};

export default calculateReadTime;

// @flow
const formatTime = (time: string, str: ?boolean): string | null => {
  let newTime;
  let date;

  if (time !== null) {
    if (str) {
      date = new Date(time);
    } else {
      newTime = Math.floor(new Date() / 1000) + 86400 * Number(time);
      date = new Date(newTime * 1000);
    }

    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
  return null;
};

module.exports = formatTime;

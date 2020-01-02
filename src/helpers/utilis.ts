export const convertMstoMinsSec = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Number(((ms % 60000) / 1000).toFixed(0));
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

// below code ignores an error of ListFormat since not all bowser supports it
// @ts-ignore
export const formatter = new Intl.ListFormat("en", {
  style: "short",
  type: "conjunction"
});

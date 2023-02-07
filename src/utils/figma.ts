export const convertFigmaIframeUrl = (originUrl: string) => {
  const findKey = 'src="';
  let startIndex = originUrl.indexOf(findKey);
  if (startIndex !== -1) {
    let srcString = originUrl.substring(startIndex);
    let srcEndIndex = srcString.indexOf('"', startIndex);
    let src = srcString.substring(findKey.length, srcEndIndex);
    return src;
  }
  return "/error/notfoundfigmaurl";
};

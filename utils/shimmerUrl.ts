const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const getUrl = (): string => {
  const svg = `<svg width="1024" height="1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect width="1024" height="1024" fill="#1a202c">
  <animate attributeName="opacity" dur="2s" calcMode="spline" keySplines="0.42,0,0.58,1;0.42,0,0.58,1" repeatCount="indefinite" keyTimes="0;0.5;1" values="1;0;1"/>
  </rect>
</svg>`;
  return `data:image/svg+xml;base64,${toBase64(svg)}`;
};
const shimmerUrl = getUrl();

export default shimmerUrl;

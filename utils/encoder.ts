const encoder = (text: string) => {
  return new TextEncoder().encode(text);
};
export default encoder;

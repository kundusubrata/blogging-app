function debounce<Func extends (...args: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */ ) => void>(
  func: Func,
  delay: number
) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<Func>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

export default debounce;
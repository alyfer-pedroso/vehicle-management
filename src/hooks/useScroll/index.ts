export function useScroll() {
  const isInBottom = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    return e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
  };

  return { isInBottom };
}

export type ListenForOutsideClicksProps = {
  listening: boolean,
  setListening: Function,
  setIsOpen: Function,
  ref: any,
}

export function listenForOutsideClicks({ listening, setListening, ref, setIsOpen }: ListenForOutsideClicksProps) {
  return () => {
    if (listening) return;
    if (!ref.current) return;
    setListening(true);
    [`click`, `touchstart`].forEach((type) => {
      document.addEventListener(`click`, (evt) => {
        if (ref.current.contains(evt.target)) return;
        setIsOpen(false);
      });
    });
  }
}
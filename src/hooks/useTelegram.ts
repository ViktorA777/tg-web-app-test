export function useTelegram() {
  const tg = window.Telegram.WebApp;

  const user = tg.initDataUnsafe?.user?.username;

  const onClose = () => {
    tg.close();
  };

  const onToggleButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  };

  return { tg, user, onClose, onToggleButton };
}

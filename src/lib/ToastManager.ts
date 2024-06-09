import Toastify from "toastify-js";

export class ToastManager {
  private readonly toast = Toastify({
    duration: 1500,
    close: true,
    position: "center",
    offset: {
      y: 10,
      x: 0,
    },
  });

  constructor() {}

  trigger(message: string) {
    this.toast.options.text = message;
    this.toast.showToast();
  }
}

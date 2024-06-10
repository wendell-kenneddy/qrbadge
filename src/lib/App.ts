import { ValidationError } from "yup";
import { BadgeManager } from "./BadgeManager";
import { FormHandler, UserData } from "./FormHandler";
import { TabSwitcher } from "./TabSwitcher";
import { ToastManager } from "./ToastManager";
import domToImage from "dom-to-image";
import qrcode from "qrcode";

export class App {
  private readonly tabs = document.getElementById("tabs") as HTMLDivElement;
  private readonly badgeContainer = document.getElementById("badge-container") as HTMLDivElement;
  private readonly qrCodeContainer = document.getElementById(
    "qrcode-container"
  ) as HTMLCanvasElement;
  private readonly form = document.getElementById("form-tab") as HTMLFormElement;
  private readonly downloadButton = document.getElementById("badge-download") as HTMLButtonElement;
  private readonly toastManager = new ToastManager();
  private readonly tabSwitcher = new TabSwitcher("form");
  private readonly formHandler = new FormHandler();
  private readonly badgeManager = new BadgeManager();

  async init(): Promise<void> {
    this.downloadButton.disabled = true;
    await this.setupListeners();
  }

  private async setupListeners(): Promise<void> {
    this.tabs.addEventListener("click", (e) => this.tabSwitcher.switch(e));
    this.form.addEventListener("submit", (e) => this.handleFormSubmit(e));
    this.downloadButton.addEventListener("click", async () => {
      this.toastManager.trigger("Preparing image...");
      await this.triggerBadgeImageDownload();
    });
  }

  private handleFormSubmit(e: SubmitEvent) {
    this.formHandler.handleSubmit(
      e,
      (user) => {
        this.badgeManager.updateDisplays(user);
        this.showQrCodeOnScreen(user);
        this.toastManager.trigger("Successfully updated badge!");
        this.downloadButton.disabled = false;
      },
      (error) => {
        let message = "Something went wrong...";
        if (error instanceof ValidationError) message = error.message;
        this.toastManager.trigger(message);
      }
    );
  }

  private async triggerBadgeImageDownload(): Promise<void> {
    const dataUrl = await this.createBadgeImage();
    const link = document.createElement("a");
    link.download = "badge-image.png";
    link.href = dataUrl;
    link.click();
    link.remove();
  }

  private showQrCodeOnScreen({ name, email, githubUsername, twitterUsername }: UserData): void {
    const text = `Name: ${name} | E-mail: ${email} | Github Profile: ${githubUsername} | Twitter Profile: ${twitterUsername}`;
    qrcode.toCanvas(this.qrCodeContainer, text);
  }

  private async createBadgeImage(): Promise<string> {
    const dataUrl = await domToImage.toPng(this.badgeContainer, {
      width: 300,
    });
    return dataUrl;
  }
}

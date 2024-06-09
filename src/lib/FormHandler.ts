import { InferType, ValidationError, object, string } from "yup";
import { ToastManager } from "./ToastManager";

const userSchema = object({
  name: string().required("Please"),
  email: string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Please enter a valid email address.")
    .required("Please enter your e-mail."),
  githubUsername: string(),
  twitterUsername: string().nullable(),
});

interface UserData extends InferType<typeof userSchema> {}

export class FormHandler {
  private readonly nameInput = document.getElementById("name") as HTMLInputElement;
  private readonly emailInput = document.getElementById("email") as HTMLInputElement;
  private readonly githubUsernameInput = document.getElementById(
    "github-username"
  ) as HTMLInputElement;
  private readonly twitterUsernameInput = document.getElementById(
    "twitter-username"
  ) as HTMLInputElement;
  private readonly toastManager = new ToastManager();

  handleSubmit(e: SubmitEvent): void {
    let user: UserData | null = null;

    e.preventDefault();

    try {
      user = userSchema.validateSync(this.getUserData());
      console.log(user);
    } catch (error) {
      error instanceof ValidationError && this.toastManager.trigger(error.message);
    }
  }

  private getUserData(): UserData {
    const name = this.nameInput.value;
    const email = this.emailInput.value;
    const githubUsername = this.githubUsernameInput.value;
    const twitterUsername = this.twitterUsernameInput.value;
    return { name, email, githubUsername, twitterUsername };
  }
}

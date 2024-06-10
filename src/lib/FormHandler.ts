import { InferType, object, string } from "yup";

const userSchema = object({
  name: string().required("Please"),
  email: string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Please enter a valid email address.")
    .required("Please enter your e-mail."),
  githubUsername: string(),
  twitterUsername: string(),
});

export interface UserData extends InferType<typeof userSchema> {}

export class FormHandler {
  private readonly nameInput = document.getElementById("name") as HTMLInputElement;
  private readonly emailInput = document.getElementById("email") as HTMLInputElement;
  private readonly githubUsernameInput = document.getElementById(
    "github-username"
  ) as HTMLInputElement;
  private readonly twitterUsernameInput = document.getElementById(
    "twitter-username"
  ) as HTMLInputElement;

  handleSubmit(
    e: SubmitEvent,
    onValidationSuccess: (user: UserData) => void,
    onError: (error: any) => void
  ): void {
    e.preventDefault();

    try {
      const user = userSchema.validateSync(this.getUserData());
      onValidationSuccess(user);
    } catch (error) {
      onError(error);
    }
  }

  private getUserData(): UserData {
    const name = this.nameInput.value;
    const email = this.emailInput.value;
    const githubUsername = this.githubUsernameInput.value;
    const twitterUsername = this.twitterUsernameInput.value;
    return { name, email, ...this.parseSocialLinks({ githubUsername, twitterUsername }) };
  }

  private parseSocialLinks({
    githubUsername,
    twitterUsername,
  }: Pick<UserData, "githubUsername" | "twitterUsername">) {
    const defaultText = "Not provided";
    return {
      githubUsername: githubUsername ? githubUsername : defaultText,
      twitterUsername: twitterUsername ? `@${twitterUsername}` : defaultText,
    };
  }
}

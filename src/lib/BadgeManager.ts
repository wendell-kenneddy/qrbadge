import { UserData } from "./FormHandler";

export class BadgeManager {
  private readonly nameDisplay = document.getElementById(
    "user-fullname-display"
  ) as HTMLTitleElement;
  private readonly emailDisplay = document.getElementById("user-email-display") as HTMLSpanElement;
  private readonly twitterUsernameDisplay = document.getElementById(
    "twitter-username-display"
  ) as HTMLSpanElement;
  private readonly githubUsernameDisplay = document.getElementById(
    "github-username-display"
  ) as HTMLSpanElement;

  updateDisplays({ name, email, githubUsername, twitterUsername }: UserData): void {
    this.nameDisplay.textContent = name;
    this.emailDisplay.textContent = email;
    this.githubUsernameDisplay.textContent = githubUsername as string;
    this.twitterUsernameDisplay.textContent = twitterUsername as string;
  }
}

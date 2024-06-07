export type Tabs = "form" | "badge";

export class TabSwitcher {
  private readonly formTabButton = document.getElementById("form-tab-btn") as HTMLButtonElement;
  private readonly badgeTabButton = document.getElementById("badge-tab-btn") as HTMLButtonElement;
  private readonly formTab = document.getElementById("form-tab") as HTMLFormElement;
  private readonly badgeTab = document.getElementById("badge-tab") as HTMLDivElement;

  constructor(private currentTab: Tabs) {}

  switch(e: MouseEvent) {
    if (e.target == this.formTabButton) return this.switchToFormTab();
    if (e.target == this.badgeTabButton) return this.switchToBadgeTab();
  }

  private switchToFormTab() {
    if (this.currentTab == "form") return;
    this.currentTab = "form";
    this.setupActiveButtonClasses();
    this.setupInactiveButtonClasses();
    this.badgeTab.classList.add("sr-only");
    this.formTab.classList.remove("sr-only");
  }

  private switchToBadgeTab() {
    if (this.currentTab == "badge") return;
    this.currentTab = "badge";
    this.setupActiveButtonClasses();
    this.setupInactiveButtonClasses();
    this.formTab.classList.add("sr-only");
    this.badgeTab.classList.remove("sr-only");
  }

  private setupActiveButtonClasses() {
    const activeButton = this.currentTab == "form" ? this.formTabButton : this.badgeTabButton;
    activeButton.classList.add("text-emerald-400");
    activeButton.classList.remove("opacity-50");
  }

  private setupInactiveButtonClasses() {
    const inactiveButton = this.currentTab == "form" ? this.badgeTabButton : this.formTabButton;
    inactiveButton.classList.remove("text-emerald-400");
    inactiveButton.classList.add("opacity-50");
  }
}

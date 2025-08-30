import { ThemeSwitcher } from "./theme-switcher";

export default function Footer() {
  return (
    <footer className="w-full border-t py-6">
      <div className="container mx-auto flex items-center justify-center gap-3 text-xs text-muted-foreground text-center">
        <p className="flex items-center gap-2">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-foreground">Trackle</span> by Mike Arthur Miñoza
          <ThemeSwitcher />
        </p>
      </div>
    </footer>
  );
}

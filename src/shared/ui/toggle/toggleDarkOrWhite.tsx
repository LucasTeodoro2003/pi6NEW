import { Switch } from "@headlessui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ToggleDarkorWhite() {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
    setIsDark(document.body.classList.contains(`dark`));
  };

  return (
    <Switch
      checked={isDark}
      onChange={toggleDarkMode}
      className={classNames(
        isDark ? "bg-blue-300" : "bg-yellow-200",
        "dark:bg-blue-300 relative inline-flex mt-1 h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      )}
    >
      <span
        className={classNames(
          isDark ? "translate-x-5" : "translate-x-0",
          "dark:translate-x-5 pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-yellow-300 dark:bg-blue-400 shadow ring-0 transition duration-200 ease-in-out"
        )}
      >
        <span
          className={classNames(
            isDark
              ? "opacity-0 ease-out duration-100"
              : "opacity-100 ease-in duration-200",
            "dark:opacity-0 absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
          )}
          aria-hidden="true"
        > 
          <SunIcon className="h-4 w-4 text-white" />
        </span>
        <span
          className={classNames(
            isDark
              ? "opacity-100 ease-in duration-200"
              : "opacity-0 ease-out duration-100",
            "dark:opacity-100 absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
          )}
          aria-hidden="true"
        >
          <MoonIcon className="h-4 w-4" />
        </span>
      </span>
    </Switch>
  );
}

export { ToggleDarkorWhite };

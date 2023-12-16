import { NavLink } from "react-router-dom";
import { DarkThemeToggle, Dropdown } from "flowbite-react";
import { useTranslation } from "react-i18next";

interface NavBarProps {
  currentUser?: {
    id: number;
    name: string;
  };
}

function NavBar(props: NavBarProps) {
  const { t, i18n } = useTranslation();

  function changeLanguage(lang: string) {
    i18n.changeLanguage(lang);
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div>
          <NavLink to="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              UUShoppingList
            </span>
            <div className="dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <Dropdown
                inline
                label={
                  <button
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  >
                    <span className="sr-only">{t("Open main menu")}</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 17 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h15M1 7h15M1 13h15"
                      />
                    </svg>
                  </button>
                }
              >
                <Dropdown.Item>
                  <NavLink to="/">
                    {({ isActive }) => (
                      <p aria-current="page">{t("Shopping Lists")}</p>
                    )}
                  </NavLink>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => {
                    changeLanguage("cs");
                  }}
                >
                  Čeština
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    changeLanguage("en");
                  }}
                >
                  English
                </Dropdown.Item>
              </Dropdown>
            </div>
          </NavLink>
        </div>

        <h1 className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
          {t("Current user")} {props.currentUser?.name ?? ""}
        </h1>
        <div className="flex flex-row space-x-2">
          <DarkThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

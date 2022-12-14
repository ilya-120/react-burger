import { NavLink, Link, useLocation } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./AppHeader.module.css";
import { FC } from "react";

const AppHeader: FC = () => {
  const { pathname } = useLocation();
  return (
    <header className={`${Styles.header__container}`}>
      <nav className={`${Styles.header__nav}  `}>
        <div className={`${Styles.div} pl-5`}>
          <div className={`${Styles.div} pr-6`}>
            <NavLink
              to="/"
              end
              className={(navData) =>
                navData.isActive
                  ? `${Styles.header__link_active}`
                  : `${Styles.header__link}`
              }
            >
              <label className={`${Styles.label}`}>
                <BurgerIcon
                  type={`${pathname === "/" ? "primary" : "secondary"}`}
                />
                <p className="text text_type_main-default pl-2">Конструктор</p>
              </label>
            </NavLink>
          </div>
          <div className={`${Styles.div} pl-6`}>
            <NavLink
              to="/feed"
              className={(navData) =>
                navData.isActive
                  ? `${Styles.header__link_active}`
                  : `${Styles.header__link}`
              }
            >
              <label className={`${Styles.label}`}>
                <ListIcon
                  type={`${
                    pathname.slice(0, 7) === "/feed" ? "primary" : "secondary"
                  }`}
                />
                <p className="text text_type_main-default pl-2">
                  Лента заказов
                </p>
              </label>
            </NavLink>
          </div>
        </div>
        <Link to="/" className={`${Styles.logo} `}>
          <Logo />
        </Link>
        <div className={`${Styles.div} `}>
          <NavLink
            to="/profile"
            className={(navData) =>
              navData.isActive
                ? `${Styles.header__link_active}`
                : `${Styles.header__link}`
            }
          >
            <label className={`${Styles.label}`}>
              <ProfileIcon
                type={`${
                  pathname.slice(0, 8) === "/profile" ? "primary" : "secondary"
                }`}
              />
              <p className="text text_type_main-default pl-2 pr-5">
                Личный кабинет
              </p>
            </label>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;

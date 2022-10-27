import { NavLink, Link, useLocation } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./AppHeader.module.css";

function AppHeader() {
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
                <BurgerIcon type={`${pathname === "/" ? "" : "secondary"}`} />
                <p className="text text_type_main-default pl-2">Конструктор</p>
              </label>
            </NavLink>
          </div>
          <div className={`${Styles.div} pl-6`}>
            <NavLink
              to="/orders"
              className={(navData) =>
                navData.isActive
                  ? `${Styles.header__link_active}`
                  : `${Styles.header__link}`
              }
            >
              <label className={`${Styles.label}`}>
                <ListIcon
                  type={`${pathname === "/orders" ? "" : "secondary"}`}
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
            to="/login"
            className={(navData) =>
              navData.isActive
                ? `${Styles.header__link_active}`
                : `${Styles.header__link}`
            }
          >
            <label className={`${Styles.label}`}>
              <ProfileIcon
                type={`${pathname === "/login" ? "" : "secondary"}`}
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
}

export default AppHeader;

import Styles from "./Profile.module.css";
import { NavLink, Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <section className={Styles.container}>
      <div className={Styles.div}>
        <ul className={Styles.list}>
          <li className={Styles.item}>
            <NavLink
              to="/profile"
              end
              className={(navData) =>
                navData.isActive ? `${Styles.link_active}` : `${Styles.link}`
              }
            >
              <p className="text text_type_main-medium mt-4">Профиль</p>
            </NavLink>
          </li>
          <li className={Styles.item}>
            <NavLink
              to="/profile/orders"
              className={(navData) =>
                navData.isActive ? `${Styles.link_active}` : `${Styles.link}`
              }
            >
              <p className="text text_type_main-medium mt-8 mb-9">
                История заказов
              </p>
            </NavLink>
          </li>
          <li className={Styles.item}>
            <span className="text text_type_main-medium text_color_inactive">
              Выход
            </span>
          </li>
        </ul>
        <p className="text text_type_main-default text_color_inactive pt-20">
          В этом разделе вы можете
          <br />
          изменить свои персональные данные
        </p>
      </div>
      <Outlet />
    </section>
  );
};

export default Profile;

import { NavLink, Outlet, ScrollRestoration } from "react-router-dom";

import { links, owner } from "../content";
import styles from "./Layout.module.css";

const navigation = [
  { to: "/photos", label: "Photos" },
  { to: "/videos", label: "Vidéos" },
];

export default function Layout() {
  return (
    <div className={styles.shell}>
      <a className={styles.skip} href="#content">
        Aller au contenu
      </a>
      <header className={styles.header}>
        <NavLink to="/" className={styles.name}>
          {owner.name}
        </NavLink>
        <nav aria-label="Navigation principale">
          <ul className={styles.nav}>
            {navigation.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={({ isActive }) => (isActive ? styles.active : undefined)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="content" className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <span>
          © {new Date().getFullYear()} {owner.name}
        </span>
        <ul className={styles.nav}>
          <li>
            <a href={links.github}>GitHub</a>
          </li>
          <li>
            <a href={links.linkedin}>LinkedIn</a>
          </li>
        </ul>
      </footer>
      <ScrollRestoration />
    </div>
  );
}

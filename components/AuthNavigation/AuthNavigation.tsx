"use client";

import { useRouter } from "next/navigation";
import css from "./AuthNavigation.module.css";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";

export default function AuthNavigation() {
  const router = useRouter();
  // Отримуємо поточну сесію та юзера
  const { isAuthenticated, user } = useAuthStore();
  // Отримуємо метод очищення глобального стану
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const handleLogout = async () => {
    // Викликаємо logout
    await logout();
    // Чистимо глобальний стан
    clearIsAuthenticated();
    // Виконуємо навігацію на сторінку авторизації
    router.push("/sign-in");
  };

  // Якщо є сесія - відображаємо кнопку Logout та інформацію про користувача
  // інакше - лінки для авторизації
  return isAuthenticated ? (
    <ul>
      <li className={css.navigationItem}>
        <Link href="/profile" className={css.userEmail}>
          {user?.username}
        </Link>
        <button className={css.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </li>
    </ul>
  ) : (
    <ul>
      <li className={css.navigationItem}>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </ul>
  );
}

import styles from "../components/app/app.module.css";
import AppHeader from "../components/app-header/app-header";
import React from "react";

const LoginPage = () => {
  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.main}>
        login page
      </main>
    </div>
  )
}

export default LoginPage;
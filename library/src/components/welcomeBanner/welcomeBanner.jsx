import styles from "./welcomeBanner.module.scss";
export const WelcomeBanner = () => {
  return (
    <section className={styles.welcomeBanner}>
      <div className={styles.welcomeBannerWrapper}>
        <div className={styles.welcomeBannerWrapper__blockTitle}>
          <p>
            Welcome
            <br/> to the Brooklyn Library
          </p>
        </div>
      </div>
    </section>
  );
};

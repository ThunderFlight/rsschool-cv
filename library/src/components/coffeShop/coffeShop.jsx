import classNames from "classnames";
import { Title } from "../common/title/title";
import styles from "./coffeShop.module.scss";
export const CoffeShop = () => {
  return (
    <section className={styles.coffeShop} id="coffeeShop">
      <Title>Coffee Shop</Title>
      <p className={styles.coffeShop__descriptionUp}>
        In our library, we have of cozy coffee shop, welcoming in customers with
        frothy cappuccinos and friendly conversation. you can get a favorite
        book and read in coffee shop. Our barista to cook you best coffee, and
        also you can try desserts from bakery.
      </p>
      <div className={styles.coffeShop__priceFood}>
        <div className={styles.leftPrice}>
          <h3 className={styles.leftPrice__foodTitle}>Coffee &amp; Tea</h3>
          <ul className={styles.listFood}>
            <li
              className={classNames(
                styles.listFood__oneFood,
                styles.listFood__oneLeft
              )}>
              <p>Cold Brew Coffee</p>
              <div></div>
              <p>$3</p>
            </li>
            <li
              className={classNames(
                styles.listFood__oneFood,
                styles.listFood__oneLeft
              )}>
              <p>French Press Pot</p>
              <div></div>
              <p>$5</p>
            </li>
            <li
              className={classNames(
                styles.listFood__oneFood,
                styles.listFood__oneLeft
              )}>
              <p>Espresso</p>
              <div></div>
              <p>$2</p>
            </li>
            <li
              className={classNames(
                styles.listFood__oneFood,
                styles.listFood__oneLeft
              )}>
              <p>Cappuccino</p>
              <div></div>
              <p>$4</p>
            </li>
            <li
              className={classNames(
                styles.listFood__oneFood,
                styles.listFood__oneLeft
              )}>
              <p>Hot Tea</p>
              <div></div>
              <p>$2</p>
            </li>
            <li
              className={classNames(
                styles.listFood__oneFood,
                styles.listFood__oneLeft
              )}>
              <p>Cold Tea</p>
              <div></div>
              <p>$2</p>
            </li>
          </ul>
        </div>
        <div className={styles.rightPrice}>
          <h3 className={styles.rightPrice__foodTitle}>Desserts &amp; Cakes</h3>
          <ul className={styles.listFood}>
            <li
              className={classNames(
                styles.listFood__oneRight,
                styles.listFood__oneFood
              )}>
              <p>Forest Gateau</p>
              <div></div>
              <p>$16</p>
            </li>
            <li
              className={classNames(
                styles.listFood__oneRight,
                styles.listFood__oneFood
              )}>
              <p>Blue Moon</p>
              <div></div>
              <p>$16</p>
            </li>
            <li
              className={classNames(
                styles.listFood__oneRight,
                styles.listFood__oneFood
              )}>
              <p>Truffle Cake</p>
              <div></div>
              <p>$15</p>
            </li>
            <li
              className={classNames(
                styles.listFood__oneRight,
                styles.listFood__oneFood
              )}>
              <p>Chocolate Cake</p>
              <div></div>
              <p>$18</p>
            </li>
            <li
              className={classNames(
                styles.listFood__oneRight,
                styles.listFood__oneFood
              )}>
              <p>Poet’s Dream Cake</p>
              <div></div>
              <p>$16</p>
            </li>
            <li
              className={classNames(
                styles.listFood__oneRight,
                styles.listFood__oneFood
              )}>
              <p>Pineapple Cake</p>
              <div></div>
              <p>$14</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

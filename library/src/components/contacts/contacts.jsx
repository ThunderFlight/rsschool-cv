import { Title } from "../common/title/title";
import styles from "./contacts.module.scss";

export const Contacts = () => {
  return (
    <section className={styles.ourContacts} id="ourContacts">
      <Title>Our Contacts</Title>
      <div className={styles.ourContacts__wrapTextMap}>
        <div className={styles.textContact}>
          <h3>For All Library Inquirles:</h3>
          <p>Please Call <a href="tel:(617)730-2370">(617) 730-2370</a></p>
          <p>For TTY Service, Please Call <a href="tel:(617)730-2370">(617) 730-2370</a></p>
          <p>Putterham Library: <a href="tel:(617)730-2385">(617) 730-2385</a></p>
          <h3>Senior Staff</h3>
          <p>
            Library Director:<b><a href="mailto:AmandaHirst@gmail.com">Amanda Hirst</a></b>
          </p>
        </div>
        <div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.0157923696606!2d-73.99387252346514!3d40.69564983861563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a49b649b8c3%3A0x6342a2291cea2e!2zMjg2IENhZG1hbiBQbGF6YSBXLCBCcm9va2x5biwgTlkgMTEyMDEsINCh0L_QvtC70YPRh9C10L3RliDQqNGC0LDRgtC4INCQ0LzQtdGA0LjQutC4!5e0!3m2!1suk!2sua!4v1690984038305!5m2!1suk!2sua" 
            width="690"
            height="414"
            tabIndex="0"
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </section>
  );
};

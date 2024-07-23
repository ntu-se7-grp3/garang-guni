import { FaThumbsUp } from "react-icons/fa";
import styles from "./Welcome.module.css";
import karungGuni from "../assets/karungGuni.jpg";
import karungGuni2 from "../assets/karungGuni2.jpg";
import karungGuni3 from "../assets/karungGuni3.jpg";
import karungGuni4 from "../assets/karungGuni4.jpg";
import { NavLink } from "react-router-dom";

function Welcome() {
  return (
    <div className={styles.container}>
      <div className={styles.introduction}>
        <img src={karungGuni} alt="karung guni uncle photo" className={styles.introPhoto} />
        <div>
          <h2>"GA-RANG-GU-NI ! BA-BU-BA-BU!"</h2>
          <p>
            Ga-Rang-Gu-Ni also known as <em>Karung Guni</em>. The name is Malay, which translates to{" "}
            <em>'gunny sack'</em> in English.{" "}
          </p>

          <h2>"POH-ZHUA! GU-SA-KOR! PAI_LEH-LIO! DIAN-SI-KI!..."</h2>
          <p>
            They usually collect unwanted household items, and would range from old electronics, newspapers, to clothing
            and furniture. It started in 1970s, and has since become a significant part of Singapore's recycling
            backbone (<em>rag-and-bone</em>).
          </p>
        </div>
      </div>
      <hr />
      <div className={styles.whoAreWe}>
        <h2>Who Are We</h2>
        <p>
          We are <strong>GarangKuni company</strong>, that pay the best rate for your trash. "We are happy to take the
          junk you have and pay you for it! No need to carry everything to the dump yourself". <br /> We use this
          website application to simplifty the collection process between the collector and households. With this apps,
          we would increase the efficiency and streamline the usual processes a karung guni usually has to go through.
        </p>
        <div>
          <img src={karungGuni2} alt="team photo" className={styles.photo} />
          <img src={karungGuni3} alt="team photo" className={styles.photo} />
          <img src={karungGuni4} alt="team photo" className={styles.photo} />
        </div>
        <hr />
        <h2>Why We Are Special</h2>
        <div className={styles.whySpecial}>
          <p>
            <FaThumbsUp className={styles.icon} />
            We provide <strong>free collection service</strong> right on your doorstep
          </p>
          <p>
            <FaThumbsUp className={styles.icon} />
            we got <strong>wide coverage</strong> and routine around the island everyweek
          </p>
          <p>
            <FaThumbsUp className={styles.icon} />
            We pay you <strong>best rate</strong> in the town for your trash
          </p>
          <p>
            <FaThumbsUp className={styles.icon} />
            We do <strong>online payment</strong> if your are not around. Just simply put outside your door.
          </p>
          <p>
            <FaThumbsUp className={styles.icon} />
            We also help you do donation, collect and the earning will be donate to those needed.
          </p>
          <p>
            <FaThumbsUp className={styles.icon} />
            we are expanding! We will make our website an online second hand market place!
          </p>
        </div>
        <hr />
        <div className={styles.tryUs}>
          <h2>Try Us Now</h2>
          <p>Our platform is easy!</p>
          <p>
            Create your{" "}
            <NavLink to="/register" className={styles.link}>
              Account
            </NavLink>
            , view the station{" "}
            <NavLink to="/schedule" className={styles.link}>
              schedule{" "}
            </NavLink>
            , and{" "}
            <NavLink to="/book" className={styles.link}>
              book
            </NavLink>{" "}
            the slot.
          </p>
          <p>We will come and serve you!</p>
        </div>
      </div>
    </div>
  );
}

export default Welcome;

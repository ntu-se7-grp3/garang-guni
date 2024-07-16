import Button from "./Button";
import styles from "./Footer.module.css";
import { useNavigate } from "react-router-dom";


const content = [
  {name:"Help Center", link: "/faq"},
  {name:"Contact Us", link: "/contact"},
  {name:"Follow Us", link: "/follow"},
  {name:"Jobs", link: "/jobs"},
  {name:"Terms & Privacy", link: "/terms-and-privacy"}
]

function Footer() {
  const navigate = useNavigate();

  const handleClick = (link) => {
    navigate(link);
  };

  return (
    <div className={styles.footer}>
      {content && content.map((item) => (
          <div key={item.name}>
            <Button onClick={() => handleClick(item.link)}
                    label={item.name}
            />
          </div>
        ))}
    </div>
  )
}

export default Footer;
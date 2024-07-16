import styles from "./Button.module.css";

function Button({ label = "Click me", onClick}) {
  return (
    <button className={styles.button} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button;

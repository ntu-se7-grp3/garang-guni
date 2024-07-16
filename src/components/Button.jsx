import styles from "./Button.module.css";

function Button({ label = "Click me", onClick, additionalStyles}) {
  return (
    <button style={additionalStyles} className={styles.button} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button;

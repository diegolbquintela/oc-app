import classes from './Button.module.css';

const Button = (props) => {
  return (
    <div className={classes.btn_center}>
      <button onClick={props.onClick} className={classes.btn}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;

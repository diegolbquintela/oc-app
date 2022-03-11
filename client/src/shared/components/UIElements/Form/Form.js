import Button from '../../../shared/UIElements/Button/Button';
import classes from './Form.module.css';

const useForm = (props) => {
  return (
    <form onSubmit={props.submitHandler} ref={props.formRef}>
      <div className={classes.form}>
        <div className={classes.form_fields}>
          <label htmlFor="text">Company Ticker </label>
          <input ref={props.tickerRef} type="text" placeholder="Ticker" />
        </div>

        <div className={classes.form_fields}>
          <label htmlFor="price">Price</label>
          <input ref={props.priceRef} type="number" placeholder="Price" />
        </div>

        <div className={classes.form_fields}>
          <label htmlFor="quantity">Quantity</label>
          <input ref={props.quantityRef} type="number" placeholder="Shares" />
        </div>
      </div>

      <div className={classes.btn_center}>
        <Button>{props.button}</Button>
      </div>
    </form>
  );
};

export default useForm;

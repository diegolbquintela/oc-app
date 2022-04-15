import classes from './AlphaGeneration.module.css';

const AlphaGeneration = () => {
  return (
    <div className={classes.container_alpha}>
      <div className={classes.title_container}>
        <h2 className={classes.title}>Build Your Wealth</h2>
        <h3 className={classes.title}>Create Alpha Amidst Disruption</h3>
      </div>

      <div className={classes.description}>
        <div className={classes.description_container}>
          <h4 className={classes.description_container__text}>
            We are entering an era of uncertainty and continuous disruption.
          </h4>

          {/* TODO: IMPROVE TEXT */}

          <p className={classes.description_container__text}>
            Asymmetric bets are those where your downside is limited and known,
            and your upside potential is uncapped or so high tat it seems
            limitless.
          </p>

          <p className={classes.description_container__text}>
            Holding a portfolio with asymmetric bets means holding non-linear
            growth. The most common sources of non-linearity and moats nowadays
            are network effects and scalability.
          </p>

          <div className={classes.description_btn}>
            <a
              className={classes.description_btn__btn}
              href="https://diegolucasq.medium.com/"
            >
              Learn More About Alpha Generation →
            </a>
            {/* TODO: CHANGE LINK AFTER TRANSFERING ESSAYS TO PUBLISHER */}
            {/* <a
              className={classes.description_btn__btn}
              href="https://medium.com/orpheuswisdom"
            >
              Learn More About Alpha Generation →
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlphaGeneration;

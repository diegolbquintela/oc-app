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

          <p className={classes.description_container__text}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Repellendus incidunt eaque soluta necessitatibus atque blanditiis
            dignissimos non possimus veritatis alias quia deserunt, itaque
            excepturi cupiditate id voluptatum. Quis, aut harum!
          </p>

          <p className={classes.description_container__text}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Repellendus incidunt eaque soluta necessitatibus atque blanditiis
            dignissimos non possimus veritatis alias quia deserunt, itaque
            excepturi cupiditate id voluptatum. Quis, aut harum!
          </p>

          <div className={classes.description_btn}>
            <a
              className={classes.description_btn__btn}
              href="https://medium.com/orpheuswisdom"
            >
              Learn More About Alpha Generation →
            </a>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default AlphaGeneration;

import classes from './Platforms.module.css';

const Platforms = () => {
  return (
    <div className={classes.platform_container}>
      <h2 className={classes.title}>Platforms</h2>

      <ul className={classes.platform_list}>
        <li className={classes.platform_list_item}>
          <h5>↳ Holdings Tracker</h5>
          <div>
            <p>Track Your Assets in a Single Platform</p>
            <a href="">Explore the Holdings Tracker →</a>
          </div>
        </li>
        <hr />

        <li className={classes.platform_list_item}>
          <h5>↳ Articles</h5>
          <div>
            <p>Build a Solid Foundation With Timeless Knowledge</p>
            <a href="">Explore Articles →</a>
          </div>
        </li>
        <hr />
      </ul>
    </div>
  );
};

export default Platforms;

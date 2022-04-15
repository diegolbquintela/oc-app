import { Link } from 'react-router-dom';
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
            {/* TODO: BUILD PRESENTATION PAGE FOR THE HOLDINGS TRACKER */}
            <Link to="/auth">Explore the Holdings Tracker →</Link>
          </div>
        </li>
        <hr />

        <li className={classes.platform_list_item}>
          <h5>↳ Articles</h5>
          <div>
            <p>Build a Solid Foundation With Timeless Knowledge</p>
            {/* TODO: LINK TO PUBLISHER AND ADD ARTICLES TO UI */}
            <a href="https://diegolucasq.medium.com/">Explore the Articles →</a>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Platforms;

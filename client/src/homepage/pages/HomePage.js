import IntroContainer from '../components/IntroContainer';
import MainQuote from '../components/MainQuote';
import AlphaGeneration from '../components/AlphaGeneration';
import Platforms from '../components/Platforms';

import classes from './HomePage.module.css';

const HomePage = () => {
  return (
    <article className={classes.article_container}>
      <div className={classes.nav_buttons}>
        {/* FIRST, AUTH SCREEN, LATER BUILD ANOTHER PAGE */}
        <button type="button">Get Started</button>
        {/* change to icon */}
        <button>Search</button>
      </div>

      <IntroContainer />

      <MainQuote />
      <div>
        <hr />
        {/* count components dynamically */}
        <a className={classes.nav_mainpage_href} href="">
          01/
        </a>
        <AlphaGeneration />
      </div>

      <div>
        <hr />
        <a className={classes.nav_mainpage_href} href="">
          02/
        </a>
        <Platforms />
      </div>

      {/* <div>
        <span>ANOTHER IMAGE</span>
      </div> */}

      {/* ADD WHAT MAKES ORPHEUS PLATFORMS POWERFUL SECTION */}
    </article>
  );
};

export default HomePage;

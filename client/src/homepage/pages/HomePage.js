import IntroContainer from '../components/IntroContainer';
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

      <div className={classes.quote}>
        <p>Associate with people who are likely to improve you.</p>
        <p>Welcome those who you are capable of improving.</p>
        <p>The process is a mutual one: men learn as they teach.</p>
        <p>Seneca the Younger</p>
      </div>

      <hr />

      {/* count components dynamically */}
      <a className={classes.nav_mainpage_href} href="">
        01/
      </a>

      <AlphaGeneration />

      <a className={classes.nav_mainpage_href} href="">
        02/
      </a>
      <Platforms />

      {/* <div>
        <span>ANOTHER IMAGE</span>
      </div> */}

      {/* ADD WHAT MAKES ORPHEUS PLATFORMS POWERFUL SECTION */}
    </article>
  );
};

export default HomePage;

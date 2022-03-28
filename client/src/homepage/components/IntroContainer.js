import romeImg from '../assets/rome.jpg';
import classes from './IntroContainer.module.css';

const IntroContainer = () => {
  return (
    <div className={classes.intro_container}>
      <h1 className={classes.title}>Investing Driven By Research.</h1>

      <div className={classes.img_container}>
        <img className={classes.img} src={romeImg} alt="Ancient Rome" />
        <p className={classes.img_description}>
          Photo by{' '}
          <a
            className={classes.img_tag}
            href="https://unsplash.com/@gabiontheroad?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          >
            Gabriella Clare Marino
          </a>{' '}
          on{' '}
          <a
            className={classes.img_tag}
            href="https://unsplash.com/collections/77458385/ancient-rome?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          >
            Unsplash
          </a>
        </p>
      </div>
    </div>
  );
};

export default IntroContainer;

import AddTransactions from '../components/AddTransactions';
import Header from '../components/Header';
import TransactionsList from '../components/TransactionsList';

import classes from './Holdings.module.css';

const Holdings = () => {
  return (
    <article className={classes.container}>
      <Header />
      <AddTransactions />
      <TransactionsList />
    </article>
  );
};

export default Holdings;

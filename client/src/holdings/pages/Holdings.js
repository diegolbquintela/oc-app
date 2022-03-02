import AddTransactions from '../components/AddTransactions';

import TransactionsList from '../components/TransactionsList';

import classes from './Holdings.module.css';

const Holdings = () => {
  return (
    <article className={classes.container}>
      <AddTransactions />
      <TransactionsList />
    </article>
  );
};

export default Holdings;

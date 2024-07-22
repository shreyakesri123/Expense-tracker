import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import { GET_AUTHENTICATED_USER, GET_USER_AND_TRANSACTIONS } from "../graphql/queries/user.query";

const Cards = () => {
  // Fetch transactions
  const { data: transactionsData, loading: transactionsLoading, error: transactionsError } = useQuery(GET_TRANSACTIONS);
  
  // Fetch authenticated user
  const { data: authUserData, loading: authUserLoading, error: authUserError } = useQuery(GET_AUTHENTICATED_USER);

  // Fetch user and transactions based on authenticated user
  const { data: userAndTransactionsData, loading: userAndTransactionsLoading, error: userAndTransactionsError } = useQuery(GET_USER_AND_TRANSACTIONS, {
    variables: {
      userId: authUserData?.authUser?._id,
    },
    skip: !authUserData?.authUser?._id, // Skip query if userId is not available
  });

  // Handle loading and error states
  if (transactionsLoading || authUserLoading || userAndTransactionsLoading) {
    return <p>Loading...</p>;
  }

  if (transactionsError) {
    console.error("Error fetching transactions:", transactionsError);
    return <p>Error fetching transactions. Please try again later.</p>;
  }

  if (authUserError) {
    console.error("Error fetching authenticated user:", authUserError);
    return <p>Error fetching user data. Please try again later.</p>;
  }

  if (userAndTransactionsError) {
    console.error("Error fetching user and transactions:", userAndTransactionsError);
    return <p>Error fetching user and transactions. Please try again later.</p>;
  }

  const transactions = transactionsData?.transactions || [];
  const authUser = authUserData?.authUser || {};

  return (
    <div className='w-full px-10 min-h-[40vh]'>
      <p className='text-5xl font-bold text-center my-10'>History</p>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <Card key={transaction._id} transaction={transaction} authUser={authUser} />
          ))
        ) : (
          <p className='text-2xl font-bold text-center w-full'>No transaction history found.</p>
        )}
      </div>
    </div>
  );
};

export default Cards;

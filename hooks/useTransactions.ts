import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function useTransactions() {
  // fetch the data
  const { data, error } = useSWR("/api/transactions", fetcher);

  if (data?.length) {
    // calculate the points for each transaction
    for (let i = 0; i < data.length; i++) {
      const currentTransaction = data[i]; // grab the current transaction in the list
      const amountSpent = Math.floor(currentTransaction.amount);
      let pointsEarned = 0;

      if (amountSpent > 100.0) {
        pointsEarned += 2 * (amountSpent - 100);
        pointsEarned += 50;
      } else if (amountSpent > 50.0) {
        pointsEarned += amountSpent - 50;
      }

      // round down to the nearest whole point
      pointsEarned = pointsEarned;
      currentTransaction.pointsEarned = pointsEarned;
    }
  }

  return {
    transactions: data,
    isLoading: !error && !data,
    isError: error,
  };
}

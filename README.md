This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Hosted Site
Visit the live site at https://charter-rewards-2oxeffx0x-chancehalo.vercel.app/

## Prompt
A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.

A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent over $50 in each transaction

(e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).

Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total.


## Notes

This application was built with NextJS, my current favorite flavor of React. I utilized Next's serveress architecture of using a `pages/api/` directory to store functions. In these functions, I perform a mock request to get data, and simply grab some local JSON after a short timeout to simulate data fetching. 

I used Material UI's component library to create the UI. 
## Running Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

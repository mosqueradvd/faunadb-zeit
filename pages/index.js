import { useEffect, useState } from "react";
import Head from "next/head";
import TableRow from "../components/TableRow";
import "../styles/Index.css";

export default () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await fetch("/api");
      const data = await response.json();
      setData(data);
    }
    getData();
  }, []);

  return (
    <main>
      <Head>
        <title>Next.js, FaunaDB & Node.js</title>
      </Head>
      <h1>Next.js, FaunaDB & Node.js</h1>
      <hr />
      <div className="container-scroll">
        <div className="container">
          <h2>Customer Data</h2>
          <div className="table">
            <h4>name</h4>
            <h4 className="telephone">telephone</h4>
            <h4 className="credit-card">credit card</h4>
          </div>
          {data.length > 0 ? (
            data.map((item) => (
              <TableRow
                key={item.data.telephone}
                creditCard={item.data.creditCard.numer}
                firstName={item.data.firstName}
                lastName={item.data.lastName}
                telephone={item.data.telephone}
              />
            ))
          ) : (
            <>
              <TableRow loading />
              <TableRow loading />
              <TableRow loading />
            </>
          )}
        </div>
      </div>
    </main>
  );
};

import HeaderBox from "@/components/HeaderBox";
import PaymentTransferForm from "@/components/PaymentTransferForm";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const Transfer = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });
  if (!accounts || !accounts.data) return null;
  console.log(accounts);
  console.log(loggedIn);
  // account.data is bank data
  const accountsData = accounts.data;
  // console.log("accountsData");
  // console.log({ accountsData });
  return (
    <section className="payment-transfer">
      <HeaderBox
        title="Payment Transfer"
        subtext="Please provide any specific details or notes related to the payment tranfer."
      ></HeaderBox>
      <section className="size-full pt-5">
        <PaymentTransferForm accounts={accountsData}></PaymentTransferForm>
      </section>
    </section>
  );
};

export default Transfer;

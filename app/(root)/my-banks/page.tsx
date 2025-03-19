import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });

  // Convert to plain object
  const plainUser = JSON.parse(JSON.stringify(loggedIn));

  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activities."
        />
        <div className="space-y-4">
          <h2 className="header-2">Your Cards</h2>
          <div className="flex-flex-wrap gap-6">
            {accounts &&
              accounts.data.map((a: Account) => (
                <BankCard
                  key={a.id} // Fix incorrect key from previous issue
                  account={a}
                  userName={plainUser?.firstName} // Use plain object
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBanks;

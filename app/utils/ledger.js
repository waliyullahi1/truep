export const ledgerCategoryMap = {
  ESCROW_DEPOSIT: {
    title: "Escrow Deposit",
    description: "Funds deposited into escrow.",
    color: "green",
    icon: "lucide:shield-check",
  },

  ESCROW_RELEASE: {
    title: "Escrow Released",
    description: "Escrow funds released to the seller.",
    color: "blue",
    icon: "lucide:wallet",
  },

  ESCROW_REFUND: {
    title: "Escrow Refund",
    description: "Escrow funds refunded to the buyer.",
    color: "amber",
    icon: "lucide:rotate-ccw",
  },

  PROPERTY_PAYMENT: {
    title: "Property Payment",
    description: "Payment made for a property.",
    color: "purple",
    icon: "lucide:home",
  },

  WALLET_FUNDING: {
    title: "Wallet Funding",
    description: "Money added to your wallet.",
    color: "emerald",
    icon: "lucide:wallet-cards",
  },

  WITHDRAWAL: {
    title: "Withdrawal",
    description: "Money withdrawn from your wallet.",
    color: "red",
    icon: "lucide:arrow-up-right",
  },

  COMMISSION: {
    title: "Commission",
    description: "Commission charged by the platform.",
    color: "orange",
    icon: "lucide:percent",
  },

  REVERSAL: {
    title: "Transaction Reversal",
    description: "A previous transaction was reversed.",
    color: "yellow",
    icon: "lucide:undo-2",
  },

  ADJUSTMENT: {
    title: "Balance Adjustment",
    description: "Wallet balance adjusted.",
    color: "gray",
    icon: "lucide:sliders-horizontal",
  },
};


export const getLedgerCategory = (category) => {
  return (
    ledgerCategoryMap[category] || {
      title: "Unknown",
      description: "",
      color: "gray",
      icon: "lucide:circle-help",
    }
  );
};
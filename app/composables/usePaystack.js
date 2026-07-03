// composables/usePaystack.js

export const usePaystack = () => {

  const pay = async ({
    email,
    amount,
    reference,
    metadata = {},
    onSuccess,
    onCancel
  }) => {

    // Browser only
    if (!import.meta.client) return;

    const { default: PaystackPop } = await import("@paystack/inline-js");

    const popup = new PaystackPop();
   function calculatePaystackFee(amount) {
        amount = Number(amount);

        let fee = amount * 0.015;

        if (amount >= 2500) {
            fee += 100;
        }

        if (fee > 2000) {
            fee = 2000;
        }

        return Math.round(fee);
    }
    popup.newTransaction({
      key: useRuntimeConfig().public.paystackPublicKey,

      email,
      amount: ( amount+ calculatePaystackFee(amount)),
      reference,
      metadata,

      onSuccess(transaction) {
        onSuccess?.(transaction);
      },

      onCancel() {
        onCancel?.();
      }
    });

  };

  return { pay };

};
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function Checkout2Payment() {
  const [status, setStatus] = useState("Pending");
  const [message, setMessage] = useState("Checking payment status...");
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!orderId) return;

    // const interval = setInterval(async () => {
    //   try {
    //     const res = await fetch(`/api/orders/${orderId}/status`);
    //     const data = await res.json();

    //     if (data.status === "Paid") {
    //       setStatus("Paid");
    //       setMessage("Payment successful 🎉");
    //       clearInterval(interval);
    //     } else if (data.status === "Failed") {
    //       setStatus("Failed");
    //       setMessage("Payment failed ❌");
    //       clearInterval(interval);
    //     }
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }, 3000); // poll every 3 seconds

    //return () => clearInterval(interval); // cleanup
    setStatus("Handled");
    setMessage("Response received 🎉");
  }, [orderId]);

  return (
    <div>
      <h2>Payment Status: {status}</h2>
      <p>{message}</p>
    </div>
  );
}

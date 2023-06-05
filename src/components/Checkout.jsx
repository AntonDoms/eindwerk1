import { useState } from "react";
import Header from "./Header";
import emailjs from "@emailjs/browser";

function Checkout() {
  const [alert, setAlert] = useState(false);
  const [name, setName] = useState("");

  const submit = (e) => {
    e.preventDefault();
    // emailjs.send(
    //   "service_dtpzbdj",
    //   "template_tc2qjrj",
    //   "test",
    //   "pVC5a0Q2RURUnXxoO"
    // );
    emailjs.send(
      "service_dtpzbdj",
      "template_tc2qjrj",
      {
        from_name: "Jack&June",
        to_name: name,
      },
      "pVC5a0Q2RURUnXxoO"
    );
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  };

  return (
    <div>
      <Header />
      <div className="grid mt-10 mx-auto place-content-center w-[350px]">
        <form className="flex flex-col gap-2 w-[350px]" onSubmit={submit}>
          {alert && (
            <div className="w-full text-center bg-green-500 font-bold px-4 py-2 rounded-md text-white">
              Successfully checked out
            </div>
          )}
          <div>
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="border-gray-300 px-2 py-1 block border rounded-md w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="cardNumber" className="text-sm">
              Card number
            </label>
            <input
              type="text"
              name="cardNumber"
              id="cardNumber"
              className="border-gray-300 px-2 py-1 block border rounded-md w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="expireDate" className="text-sm">
              Expire date
            </label>
            <input
              type="date"
              name="expireDate"
              id="expireDate"
              className="border-gray-300 px-2 py-1 block border rounded-md w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="cvc" className="text-sm">
              CVC
            </label>
            <input
              type="text"
              name="cvc"
              id="cvc"
              max={3}
              min={3}
              className="border-gray-300 px-2 py-1 block border rounded-md w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="name" className="text-sm">
              Name
            </label>
            <input
              onChange={(event) => {
                setName(event.target.value);
              }}
              type="text"
              name="name"
              id="name"
              className="border-gray-300 px-2 py-1 block border rounded-md w-full"
              required
            />
          </div>

          <button className="bg-gray-800 text-sm text-white px-3 py-1.5 font-medium rounded-md">
            Checkout
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;

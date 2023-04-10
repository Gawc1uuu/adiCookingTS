import { useState, FormEvent } from "react";
// import { useAuthContext } from "../hooks/useAuthContext";
import foodPic from "../assets/bowl.jpg";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { login, isLoading, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    login(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="mx-2">
      <div className="container max-w-5xl mx-auto flex min-h-screen items-center justify-center">
        <div className="flex justify-center max-w-4xl">
          {/* form */}
          <div className="flex flex-col mx-4 text-left p-12 bg-white rounded-xl  md:rounded-r-none md:mx-0 dark:bg-gray-500">
            <div className="space-y-6">
              <h2 className="text-4xl font-mono font-bold text-gray-700 dark:text-white">
                Login
              </h2>
              <p className="max-w-sm font-light text-gray-700 dark:text-gray-200">
                Login to share your recipes with another users!
              </p>
            </div>
            <div>
              <form onSubmit={submitHandler}>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  className="border border-gray-400 rounded-lg p-6 py-4 focus:outline-none placeholder:font-thin block w-full mt-6"
                  placeholder="Please Enter Your Email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  className="border border-gray-400 rounded-lg p-6 py-4 focus:outline-none placeholder:font-thin block w-full mt-6"
                  placeholder="Please Enter Your Password"
                />
                <button
                  disabled={isLoading}
                  className="bg-blue-400 px-14 py-4 mt-3 text-white rounded hover:-translate-y-0.5 w-full hover:shadow-sm transition duration-150"
                >
                  Login
                </button>
                {error && <p className="error">{error.error}</p>}
              </form>
            </div>
          </div>
          {/* photo */}

          <img
            src={foodPic.toString()}
            className="hidden md:block w-1/2 rounded-r-xl"
            alt="food"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {  Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "@/components/common/form";
import { toast } from "sonner"; // ✅ new toast import
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { loginFormControls } from "@/config";

function AuthLogin() {
  const initialState = { email: "", password: "" };
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    dispatch(loginUser(formData))
      .then((data) => {
        setIsLoading(false);
        if (data?.payload?.success) {
          toast.success(data?.payload?.message || "Login successful!");
          setFormData(initialState);
        } else {
          toast.error(data?.payload?.message || "Login failed. Please try again.");
        }
      })
      .catch(() => {
        setIsLoading(false);
        setError("An error occurred. Please try again.");
      });
  }

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === "admin" ? "/admin/dashboard" : "/shop/home");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-400 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden mx-auto"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-black to-black text-transparent bg-clip-text">
          Welcome Back
        </h2>

        <CommonForm
          formControls={loginFormControls}
          buttonText={isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Login"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />

        {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}

        <div className="flex items-center justify-between mt-6">
          <Link to="/auth/forgot-password" className="text-sm text-black hover:underline">
            Forgot password?
          </Link>
          <p className="text-sm text-black">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-black hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default AuthLogin;

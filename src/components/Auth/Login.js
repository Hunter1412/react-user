import { useEffect, useState } from "react";
import { loginApi } from "../../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loadingAPI, setLoadingAPI] = useState(false);


    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            navigate("/"); //redirect Home
        }
    }, [navigate])

    const handleLogin = async () => {
        if (!email || !password) {
            return toast.error("Email/Password is required!");
        }
        setLoadingAPI(true);
        let res = await loginApi(email, password);
        if (res?.token) {
            localStorage.setItem("token", res.token);
            toast.success("Login successfully!");
            navigate("/"); //redirect Home
        } else if (+res?.status === 400) {
            toast.error(res.data.error);
        }
        setLoadingAPI(false);
    }
    return (
        <div className="login-container col-12 col-sm-4">
            <h1 className="login-title">Login</h1>
            <div className="label">Email or Username ( eve.holt@reqres.in )</div>
            <input
                type='text'
                placeholder="Email or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            <div className="input-password">
                <input
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <i
                    className={isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                    onKeyDown={() => setIsShowPassword(!isShowPassword)}
                ></i>
            </div>

            <button
                className={email && password ? "active" : ""}
                disabled={email && password ? "" : "disabled"}
                onClick={() => handleLogin()}
            >
                {loadingAPI && <i className="fas fa-sync fa-spin"></i>}
                &nbsp;Login
            </button>
            <div className="back">
                <i className="fa-solid fa-angles-left"></i>
                <span>Go back</span>
            </div>
        </div>
    );
}

export default Login;




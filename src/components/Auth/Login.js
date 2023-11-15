import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleLoginRedux } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const Login = (props) => {
    const navigate = useNavigate();

    const dispatch = useDispatch()


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

    const isLoading = useSelector(state => state.user.isLoading);
    const account = useSelector(state => state.user.account);

    useEffect(() => {
        if (account && account.auth === true) {
            navigate("/"); //redirect Home
        }
    }, [account, navigate])

    const handleLogin = async () => {
        if (!email || !password) {
            return toast.error("Email/Password is required!");
        }
        dispatch(handleLoginRedux(email.trim(), password));
    }
    //submit login
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleLogin();
        }
    }

    const handleGoBack = () => {
        navigate("/");
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
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
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
                {isLoading && <i className="fas fa-sync fa-spin"></i>}
                &nbsp;Login
            </button>
            <div className="back">
                <span
                    onClick={() => handleGoBack()}
                    onKeyDown={() => handleGoBack()}
                >
                    <i className="fa-solid fa-angles-left"></i>
                    <span> Go back</span>
                </span>
            </div>
        </div>
    );
}

export default Login;




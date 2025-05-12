import React from "react";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function VerifyCodePage() {

    const { signUp, isLoaded } = useSignUp();
    const [code, setCode] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [isSubmitting, setSubmitting] = React.useState(false);
    const navigate = useNavigate();

    // 🔁 Check for session validity (avoid null session on refresh)
    React.useEffect(() => {
        if (isLoaded && !signUp?.emailAddress) {
            navigate("/"); // or "/signup" if that's better UX
        }
    }, [isLoaded, signUp, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLoaded) return;
        try {
            setSubmitting(true);
            const result = await signUp.attemptEmailAddressVerification({ code });
            console.log("Email verified:", result);
            window.location.href = '/';
        } catch (err) {
            console.error("Verification error:", err);
            const msg = err?.errors?.[0]?.message || "Verification failed. Try again.";
            setError(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="verify-code-page min-h-screen flex items-center">
            <div className="container">
                {/* verify Form */}
                <form
                    onSubmit={handleSubmit}
                    className="verify-form bg-[#181818] shadow-md rounded-md p-5 mx-auto md:max-w-[500px]"
                >
                    <h3 className="text-center mb-2 text-xl font-bold">Verify Your Account</h3>
                    <p className="text-center mb-3 opacity-70">We sent a verification code to your email</p>
                    {/* Input  */}
                    <input
                        required
                        autoFocus
                        type="number"
                        placeholder="Verify Code"
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full rounded-md p-2 mb-4 bg-black placeholder:transition-opacity focus:placeholder:opacity-0"
                    />
                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 text-center font-medium mb-3">{error}</p>
                    )}
                    {/* Submit Btn */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-yellow-500 text-[#101010] font-bold py-2 px-4 rounded-md"
                    >
                        {
                            isSubmitting && <i className='fa-solid fa-spinner fa-fw me-2 animate-spin'></i>
                        }
                        Verify
                    </button>
                </form>
            </div>
        </div>
    )
}

export default VerifyCodePage;
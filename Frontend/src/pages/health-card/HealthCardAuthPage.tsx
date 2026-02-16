import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";

export default function HealthCardAuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [loginMobile, setLoginMobile] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const { login, signup, verifyEmail, resendVerificationCode } = useAuth();
  const navigate = useNavigate();

  // Auto-convert '0' to '+92' when user starts typing
  const handleMobileChange = (value: string, setter: (value: string) => void) => {
    // If user types '0' at the start, replace with '+92'
    if (value === '0') {
      setter('+92');
    } else if (value.startsWith('0') && value.length > 1) {
      // If user types '0' followed by other digits, replace '0' with '+92'
      setter('+92' + value.slice(1));
    } else {
      setter(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isLogin) {
        await login(loginMobile, password);
        navigate("/health-card");
      } else {
        const result = await signup(name, email, mobile, password);
        setShowVerification(true);
        if (result.emailSent) {
          setSuccess("Account created! Please check your email for verification code.");
        } else {
          setSuccess("Account created! Email sending failed. Please use 'Resend verification code' below.");
          setError(""); // Clear any previous errors
        }
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      if (err.message?.includes("verify")) {
        setShowVerification(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await verifyEmail(email, verificationCode);
      navigate("/health-card");
    } catch (err: any) {
      setError(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const result = await resendVerificationCode(email);
      if (result.emailSent) {
        setSuccess("Verification code sent to your email");
      } else {
        setError("Failed to send email. Please try again or contact support.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to resend code");
    } finally {
      setLoading(false);
    }
  };

  if (showVerification) {
    return (
      <div className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
            <p className="text-muted-foreground mb-6">
              We've sent a verification code to your email address. Please enter it below.
            </p>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
                {success}
              </div>
            )}
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Verifying..." : "Verify Email"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleResendCode}
                disabled={loading}
              >
                Resend Code
              </Button>
            </form>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md p-6">
          <h2 className="text-2xl font-bold mb-4">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {isLogin
              ? "Login to access your health card"
              : "Create an account to get started"}
          </p>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isLogin ? (
              <div>
                <Label htmlFor="loginMobile">Mobile Number</Label>
                <Input
                  id="loginMobile"
                  type="tel"
                  value={loginMobile}
                  onChange={(e) => handleMobileChange(e.target.value, setLoginMobile)}
                  placeholder="03001234567 or +923001234567"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Start with 0 or +92 (e.g., 03001234567 or +923001234567)
                </p>
              </div>
            ) : (
              <>
                <div>
                  <Label htmlFor="signupName">Full Name</Label>
                  <Input
                    id="signupName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    value={mobile}
                    onChange={(e) => handleMobileChange(e.target.value, setMobile)}
                    placeholder="03001234567 or +923001234567"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Start with 0 or +92 (e.g., 03001234567 or +923001234567)
                  </p>
                </div>
              </>
            )}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? isLogin
                  ? "Logging in..."
                  : "Creating account..."
                : isLogin
                  ? "Login"
                  : "Sign Up"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setSuccess("");
                setLoginMobile("");
                setEmail("");
                setMobile("");
                setPassword("");
              }}
              className="text-sm text-primary hover:underline"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"}
            </button>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}



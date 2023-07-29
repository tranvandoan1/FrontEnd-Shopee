import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { auth } from "../firebase/index";
import { Button, Spin } from "antd";
import Countdown from "react-countdown";
const OtpPhone = ({ back, next, checkOtp, uploadCheckOtp, countDown }) => {
  const [otp, setOtp] = useState("");
  const [valuePhone, setValuePhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [comfimError, setComfimError] = useState(false);

  function onCaptchVerify() {
    console.log(window.recaptchaVerifier, "window.recaptchaVerifier");
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log(response, "response");
            onSignup();
          },
          "expired-callback": () => { },
        },
        auth
      );
    }
  }
  function onSignup() {
    if (valuePhone == undefined || (valuePhone == "" && checkOtp == false)) {
      setComfimError(true);
    } else {
      setLoading(true);
      setShowOTP(false);
      uploadCheckOtp(false);
      onCaptchVerify();

      const appVerifier = window.recaptchaVerifier;

      const formatPh = "+" + valuePhone;
      signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
          console.log(confirmationResult, "confirmationResult");
          window.confirmationResult = confirmationResult;
          setLoading(false);
          setShowOTP(true);
          toast.success("Gửi thành công!");
          next(3);
          countDown()

        })
        .catch((error) => {
          console.log(error, "đã xảy ra lỗi");
          setLoading(false);
        });
    }
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        next(4);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  console.log(showOTP, "showOTP");

  console.log(loading, "loading", showOTP, "showOTP");
  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen otp-phone">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2
            className="text-center text-white font-medium  "
            style={{ color: "blue", textAlign: "center", fontSize: 16 }}
          >
            Tự đóng sau
            <Countdown
              date={Date.now() + 25000}
              renderer={({ hours, minutes, seconds, completed }) => {
                if (completed) {
                  location.reload();
                  // Render a completed state
                  return <span>Mã OTP đã hết hạn</span>;
                } else {
                  // Render a countdown
                  return (
                    <span>
                      <p style={{ color: "red" }}>
                        {`0${minutes}`}:
                        {String(seconds).length <= 1 ? `0${seconds}` : seconds}
                      </p>
                    </span>
                  );
                }
              }}
            />
            <div>
              <Button type="primary" onClick={() => location.reload()}>
                Thoát
              </Button>
            </div>
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            {showOTP ? (
              <div className="otpInput">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={checkOtp}
                  autoFocus
                  className="opt-container"
                ></OtpInput>

                <div className="button-comfim">
                  <Button
                    type="dashed"
                    onClick={() => {
                      back();
                    }}
                  >
                    Hủy
                  </Button>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      checkOtp == true ? onSignup() : onOTPVerify();
                    }}
                  >
                    {checkOtp == true ? "Gửi lại" : "Xác nhận"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="phoneInput">
                <PhoneInput
                  country={"vn"}
                  value={valuePhone}
                  onChange={(e) => {
                    setValuePhone(e);
                    comfimError == true && setComfimError(false);
                  }}
                  placeholder="Số điện thoại"
                />
                {comfimError == true ? (
                  <p className="error">Chưa nhập số điện thoại</p>
                ) : (
                  ""
                )}

                <div className="button-comfim">
                  <Button
                    type="dashed"
                    onClick={() => {
                      showOTP == false && loading == false && back();
                    }}
                  >
                    {loading == true ? <Spin /> : "Hủy"}
                  </Button>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      onSignup();
                    }}
                  >
                    {loading == true ? <Spin /> : "Đồng ý"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default OtpPhone;

import OtpInput from "otp-input-react";
import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import { Toaster } from "react-hot-toast";
import { Button, Input, Spin, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { uploadEmailUser } from "../reducers/UserSlice";
import { startTransition } from "react";
const OtpEmail = React.memo(
  ({
    back,
    next,
    countDownStart,
    countDown,
    valueEmailUpload,
    checkCountDown1,
    setCheckSuccessful,
    checkSuccessful,
    user,
  }) => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [checkOnOTPVerify, setCheckOnOTPVerify] = useState(false);
    const [comfimError, setComfimError] = useState({
      content: undefined,
      status: false,
    });

    const [valueEmail, setValueEmail] = useState(); //email của user
    const [countDownClose, setCountDownClose] = useState(5);
    const dispatch = useDispatch();
    async function onSignup() {
      // if (loading == false) {
      //   if (user?.email?.toLowerCase() !== valueEmail?.toLowerCase()) {
      //     setComfimError({ content: "Email không khớp !", status: true });
      //   } else {
      //     setCheckOnOTPVerify(false);
      //     setOtp()
      //     setLoading(true);
      //     await dispatch(pushEmail({ email: valueEmail }));
      //     setShowOTP(true);
      //     setLoading(false);
      //     next(3);
      //     countDownStart();
      //   }
      // }

    }
    async function onOTPVerify() {
      if (otp == undefined || otp == "" || String(otp).length < 6) {
        setCheckOnOTPVerify(true);
      } else {
        setCheckOnOTPVerify(false);
        setLoading(true);
        if (Number(otp) == Number(otpEmail)) {
          await dispatch(uploadEmailUser({ ...user, email: valueEmailUpload }));
          setTimeout(async () => {
            setLoading(false);
            setCheckSuccessful(true);
            next(4);
          }, 1000);
        }
      }
    }

    useEffect(() => {
      if (checkSuccessful == true) {
        if (countDownClose <= 0) {
          back()
          return
        }
        const interval = setInterval(() => {
          setCountDownClose(countDownClose - 1);
        }, 1000);

        return () => clearInterval(interval);
      }
    }, [countDownClose, checkSuccessful]);
    return (
      <section className="bg-emerald-500 flex items-center justify-center h-screen otp-phone">
        <div>
          <Toaster toastOptions={{ duration: 4000 }} />
          <div id="recaptcha-container"></div>
          {checkSuccessful == true ? (
            <h2
              className="text-center text-white font-medium  "
              style={{ color: "blue", textAlign: "center", fontSize: 16 }}
            >
              Tự đóng sau 00:
              {String(countDownClose).length <= 1
                ? `0${countDownClose}`
                : countDownClose}
              <div style={{ marginTop: 10 }}>
                <Button type="primary" onClick={() => back()}>
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
                    onChange={(e) => (
                      setOtp(e),
                      checkCountDown1(true),
                      checkOnOTPVerify == true && setCheckOnOTPVerify(false)
                    )}
                    OTPLength={6}
                    otpType="number"
                    disabled={
                      countDown.seconds == 0 && countDown.minutes == 0
                        ? true
                        : false
                    }
                    autoFocus
                    className="opt-container"
                  ></OtpInput>
                  {
                    checkOnOTPVerify == true &&
                    <p className="error">Chưa nhập OTP</p>

                  }

                  <div className="button-comfim">
                    <Button
                      type="dashed"
                      onClick={() => {
                        loading == false && back();
                      }}
                    >
                      {loading == true ? (
                        <Spin />
                      ) :
                        'Hủy'
                      }
                    </Button>
                    <Button
                      type="primary"
                      danger
                      onClick={() => {
                        ((countDown.seconds == 0 && countDown.minutes == 0) ||
                          (countDown.seconds > 0 && countDown.minutes > 0)) &&
                          (otp == undefined || otp == "" || String(otp).length < 6)
                          ? onSignup()
                          : onOTPVerify();
                      }}
                    >
                      {loading == true ? (
                        <Spin />
                      ) : countDown.seconds == 0 &&
                        countDown.minutes == 0 &&
                        (otp == undefined || otp == "" || String(otp).length < 6) ? (
                        "Gửi lại"
                      ) : (
                        "Xác nhận"
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="phoneInput">
                  <Input
                    defaultValue={valueEmail}
                    onChange={(e) => {
                      startTransition(() => {
                        setValueEmail(e.target.value);
                      });
                      comfimError.status == true &&
                        setComfimError({ content: undefined, status: false });
                    }}
                    placeholder="Nhập Email"
                    style={{ marginBottom: 10 }}
                  />
                  {comfimError.status == true ? (
                    <p className="error">{comfimError.content}</p>
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
                        loading == false && onSignup();
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
  }
);

export default OtpEmail;

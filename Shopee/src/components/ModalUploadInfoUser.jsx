import { Button, message, Spin } from "antd";
import React, { useState, startTransition, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import OtpPhone from "./OtpPhone";
import PhoneInput from "react-phone-input-2";
import Countdown from "react-countdown";

const ModalUploadInfoUser = ({
  title,
  content,
  status,
  callBack,
  phone,
  otpPhone,
}) => {
  const shopeePopupFormHeader = document.querySelector(
    ".shopee-popup-form__header-comfim"
  );
  window.addEventListener("click", function (e) {
    if (e.target == shopeePopupFormHeader) {
      callBack("close");
    }
  });
  const [valuePhone, setValuePhone] = useState();
  const [comfimError, setComfimError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkOtp, setSheckOtp] = useState(false);
  const [seconds, setSeconds] = useState(25);

  const comfim = () => {
    if (valuePhone == undefined || valuePhone == "") {
      console.log('vào 1')
      setComfimError(true);
    } else {
      console.log('vào 2')
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        callBack("2");
      }, 1000);
    }
  };

  console.log(otpPhone, "otpPhone");
  const countDown = () => {
    if (seconds == 0) {
      console.log('first')
    }
    if (seconds > 0) {
      setInterval(() => {
        setSeconds(seconds => seconds - 1)
      }, 1000);
    }

  }
  // Renderer callback with condition
  return (
    <div
      className={`shopee-popup-form__header-comfim ${status == true ? "active-shopee-popup-form__header-comfim" : ""
        }`}
    >
      <div className="form__header">
        <div className="title">
          <h3>{title}</h3>
          <p>
            {content}{" "}
            {otpPhone == 3 && seconds}
          </p>
        </div>
        {otpPhone == 1 ? (
          <div className="input-phone">
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
          </div>
        ) : (
          <OtpPhone
            back={() => (
              // callBack("close"),
              setValuePhone(),
              setSheckOtp(false),
              setComfimError(false)
            )}
            next={(e) => (setSeconds(25000), callBack(e))}
            checkOtp={checkOtp}
            uploadCheckOtp={(e) => {
              setSheckOtp(e)
            }}
            countDown={() => countDown()}
          />
        )}

        {otpPhone == 1 && (
          <div className="button-comfim">
            <Button
              type="dashed"
              onClick={() => {
                loading == false &&
                  (callBack("close"),
                    otpPhone == 3 && setValuePhone(""),
                    setValuePhone());
              }}
            >
              {loading == true ? <Spin /> : "Hủy"}
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                comfim();
              }}
            >
              {loading == true ? <Spin /> : "Đồng ý"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalUploadInfoUser;

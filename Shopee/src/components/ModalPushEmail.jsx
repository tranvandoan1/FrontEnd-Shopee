import { Button, Input, message, Spin, Statistic } from "antd";
import React, { useState, startTransition, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import OtpEmail from "./OtpEmail";
import { useDispatch, useSelector } from "react-redux";
import { checkEmailUpload } from "../API/Users";

const { Countdown } = Statistic;

const ModalPushEmail = React.memo(
    ({ title, checkEmail, status, callBack, email, otpEmail, user }) => {
        const shopeePopupFormHeader = document.querySelector(
            ".shopee-popup-form__header-email-comfim"
        );
        window.addEventListener("click", function (e) {
            if (e.target == shopeePopupFormHeader) {
                callBack("close");
            }
        });
        const dispatch = useDispatch();

        const [valueEmail, setValueEmail] = useState();//email muốn thay đổi
        const [comfimError, setComfimError] = useState(0);//trạng thái dữ liệu
        const [timeOut, settimeOut] = useState(false);//check trạng thái countdown hết hạn
        const [loading, setLoading] = useState(false);
        const [checkSuccessful, setCheckSuccessful] = useState(false);//check trạng thái thay đổi thành công
        const [countDown, setCountDown] = useState(false);

        const comfim = async () => {
            // setLoading(true);
            console.log(valueEmail, 'valueEmail')
            if (valueEmail == undefined || valueEmail == "") {
                setComfimError(1);
            } else {
                const validateEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (validateEmail.test(valueEmail) == false) {
                    setComfimError(2);
                } else {
                    const { data } = await checkEmailUpload({ _id: user._id, email: valueEmail })
                    if (data.status == true) {
                        message.open({
                            type: "warning",
                            content: data?.notification,
                            duration: 2,
                        });
                    } else {
                        setLoading(true);
                        setTimeout(() => {
                            setLoading(false);
                            callBack("2");
                            message.open({
                                type: "success",
                                content: data?.notification,
                                duration: 2,
                            });
                        }, 1000);

                    }


                }

            }

        };
        const [chec, setch] = useState(false);

        const deadline = Date.now() + 1000 * 1 * 6 * 15;
        const onChange = (val) => {
            if (val <= 3) {
                settimeOut(false)
                setCountDown(true)
            }
        };
        return (
            <div
                className={`shopee-popup-form__header-email-comfim ${status == true ? "active-shopee-popup-form__header-email-comfim" : ""
                    }`}
            >
                <div className="form__header">
                    <div className="title">
                        <h3>{title}</h3>
                        {checkSuccessful == false &&
                            (countDown.seconds == 0 &&
                                countDown.minutes == 0 &&
                                timeOut == false ? (
                                <p>Mã hết hạn hãy gửi lại</p>
                            ) : (
                                <p>
                                    {checkEmail}{" "}
                                    {otpEmail == 3 && (
                                        <div className="otp-title">
                                            <p className="otp-time">Mã sẽ hết trong </p>
                                            <p className="otp-number">
                                                <Countdown value={countDown == false && deadline} format="mm:ss" onChange={onChange} />

                                            </p>
                                        </div>
                                    )}
                                </p>
                            ))}
                    </div>
                    {otpEmail == 1 ? (
                        <div className="input-phone">
                            <Input
                                defaultValue={valueEmail}
                                onChange={(e) => {
                                    setValueEmail(e.target.value);
                                    (comfimError == 1 || comfimError == 2 || comfimError == 3) &&
                                        setComfimError(false);
                                }}
                                placeholder="Nhập Email"
                            />
                            {comfimError == 1 ? (
                                <p className="error">Chưa nhập Email</p>
                            ) : comfimError == 2 ? (
                                <p className="error">Email sai định dạng</p>
                            ) : comfimError == 3 ? (
                                <p className="error">Email đã được sử dụng</p>
                            ) : (
                                ""
                            )}
                        </div>
                    ) : (
                        <OtpEmail
                            back={() => (
                                callBack("close"), setValueEmail(), setComfimError(false)
                            )}
                            next={(e) => (
                                setCountDown(false), callBack(e)
                            )}
                            countDownStart={() => setch(true)}
                            timeOut={(e) => settimeOut(e)}
                            setCheckSuccessful={(e) => setCheckSuccessful(e)}
                            countDown={countDown}
                            valueEmailUpload={valueEmail}
                            user={user}
                            checkSuccessful={checkSuccessful}
                        />
                    )}

                    {otpEmail == 1 && (
                        <div className="button-comfim">
                            <Button
                                type="dashed"
                                onClick={() => {
                                    loading == false &&
                                        (callBack("close"),
                                            otpEmail == 3 && setValueEmail(""),
                                            setValueEmail());
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
    }
);

export default ModalPushEmail;

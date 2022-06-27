import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addComments } from "../../../../reducers/CommentSlice";
import { Avatar, Col, Input, Pagination, Row, Spin, Upload } from "antd";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../firebase/index";
import {
  CameraOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  RadiusBottomleftOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import styles from "../../Css/CssModule/Comment.module.css";
import "../../Css/Css/Comment.css";
import ListComment from "./ListComment";

const Comments = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { id } = useParams();
  const dispatch = useDispatch();

  const [valueComment, setValueComment] = useState();
  const [checkComment, setCheckComment] = useState(false);
  const [photoArr, setPhotoArr] = useState([]);
  const [loading, setLoading] = useState(false);

  // chọn ảnh để comment
  const upPhotoComment = (file) => {
    setLoading(true);
    const imageRef = ref(storage, `images/${file.name}`);
    uploadBytes(imageRef, file).then(() => {
      getDownloadURL(imageRef).then(async (url) => {
        if (photoArr.length == 0) {
          setPhotoArr([url]);
        } else if (photoArr.length == 1) {
          setPhotoArr([photoArr, url]);
        } else if (photoArr.length >= 2) {
          setPhotoArr([...photoArr, url]);
        }

        setLoading(false);
      });
    });
  };
  const onSubmit = async () => {
    if (valueComment == "" || valueComment == undefined) {
      setCheckComment(true);
    } else {
      const comment = {
        comment: valueComment,
        pro_id: id,
        user_id: user._id,
        photo: photoArr !== undefined || photoArr !== "" ? photoArr : "",
      };
      console.log(comment)
      dispatch(addComments(comment));
      setValueComment();
      setPhotoArr([]);
    }
  };
  return (
    <div className="comments-products">
      {user ? (
        <div className="comments-p">
          <div className="nameUaser-comments">
            <h5>
              Xin chào <span>@{user.name}</span> , mời bạn đánh giá sản phẩm tại
              đây !
            </h5>
          </div>
          <div className="comment">
            <div className="avatar-user">
              <Avatar size={70} src={user.avatar} />
            </div>
            <div className="write_comment">
              <div className="write-c">
                <Input.TextArea
                  rows={4}
                  onChange={(e) => (
                    setValueComment(e.target.value), setCheckComment(false)
                  )}
                  placeholder="Nhập bình luận"
                  value={valueComment}
                />

                {photoArr !== undefined && (
                  <Row style={{ position: "relative" }}>
                    {photoArr.map((item, index) => (
                      <>
                        <Col lg={4} style={{ padding: 5 }}>
                          <CloseCircleOutlined
                            style={{
                              position: "absolute",
                              right: 0,
                              top: 10,
                              zIndex: 10,
                              color: "red",
                            }}
                            onClick={() =>
                              setPhotoArr(
                                photoArr.filter((photo) => item !== photo)
                              )
                            }
                          />
                          <div className={styles.list_image_upload}>
                            <img key={index} src={item} />
                          </div>
                        </Col>
                      </>
                    ))}
                    {loading == true && <Spin style={{ marginTop: 20 }} />}
                  </Row>
                )}

                {checkComment == true && (
                  <div className={styles.errorr}>
                    Hãy nhập gì đó để bình luận !{" "}
                  </div>
                )}

                <button id="submit-comment" onClick={() => onSubmit()}>
                  <i className="fas fa-paper-plane"></i>bìnhluận
                </button>
              </div>
            </div>
            <div className="comment-img">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                disabled={loading == true}
                beforeUpload={upPhotoComment}
              >
                <div>
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    {loading ? (
                      <LoadingOutlined />
                    ) : (
                      <CameraOutlined style={{ fontSize: 30 }} />
                    )}
                  </div>
                </div>
              </Upload>
            </div>
          </div>
        </div>
      ) : (
        <h4 className={styles.mess}>Bạn cần đăng nhập để được bình luận ! </h4>
      )}

      <ListComment />

      <div style={{ textAlign: "right" }}>
        <Pagination defaultCurrent={1} total={50} style={{ marginTop: 10 }} />
      </div>
    </div>
  );
};

export default Comments;

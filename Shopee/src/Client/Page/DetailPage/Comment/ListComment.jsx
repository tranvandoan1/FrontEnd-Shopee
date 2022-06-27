import React, { createElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { remove } from "../../../../API/CommentAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  addComments,
  getAllComment,
  removeComment,
  uploadtComments,
} from "../../../../reducers/CommentSlice";
import {
  Avatar,
  Button,
  Col,
  Comment,
  Input,
  Row,
  Spin,
  Tooltip,
  Upload,
} from "antd";
import moment from "moment";
import { getAllData } from "../../../../reducers/AllData";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../firebase/index";
import {
  CameraOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  DislikeFilled,
  DislikeOutlined,
  EditOutlined,
  LikeFilled,
  LikeOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import styles from "../../Css/CssModule/Comment.module.css";
import "../../Css/Css/Comment.css";

const ListComment = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { id } = useParams();
  const dispatch = useDispatch();
  const comment = useSelector((data) => data.comment.value);
  const dataAll = useSelector((data) => data.dataAll.value);
  const [loading, setLoading] = useState(false);

  const [listPhoto, setListPhoto] = useState();
  const [edit, setEdit] = useState();
  const [valueEdit, setValueEidit] = useState();
  const [photoEdit, setPhotoEdit] = useState([]);

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  const comments = comment?.slice().reverse();
  useEffect(() => {
    setListPhoto();
    dispatch(getAllComment());
    dispatch(getAllData());
  }, []);

  const like = (item) => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  const onClickDelete = async (data) => {
    if (confirm("Bạn có muốn xóa không")) {
      await remove(data._id, data);
      dispatch(removeComment(comment?.filter((item) => item._id !== data._id)));
    }
  };

  const upPhotoComment = (file) => {
    setLoading(true);
    const imageRef = ref(storage, `images/${file.name}`);
    uploadBytes(imageRef, file).then(() => {
      getDownloadURL(imageRef).then(async (url) => {
        if (photoEdit.length == 0) {
          setPhotoEdit([url]);
        } else if (photoEdit.length == 1) {
          setPhotoEdit([photoEdit, url]);
        } else if (photoEdit.length >= 2) {
          setPhotoEdit([...photoEdit, url]);
        }
        setLoading(false);
      });
    });
  };
  const onclickUploadComment = (item) => {
    const newDataCommentUpload = {
      comment: valueEdit == undefined ? item.comment : valueEdit,
      photo: photoEdit,
      user_id: item.user_id,
      pro_id: item.pro_id,
    };
    dispatch(
      uploadtComments({ id: item._id, dataUploat: newDataCommentUpload })
    );
    setEdit();
    setValueEidit();
  };
  const listComment = (item, index) => {
    const time = new Date(item.createdAt);
    return (
      <>
        {edit?._id == item._id ? (
          <div style={{ margin: "10px 0", width: "100%", display: "flex" }}>
            {dataAll.user?.map(
              (user) =>
                item.user_id == user._id && (
                  <Avatar
                    src={user.avatar}
                    style={{ marginRight: 10, width: "6%" }}
                    size={30}
                  />
                )
            )}
            <div className={styles.flex}>
              <div className={styles.edit_comment}>
                <Input.TextArea
                  defaultValue={item.comment}
                  onChange={(e) => setValueEidit(e.target.value)}
                  style={{ width: "100%" }}
                />
                <Upload
                  name="photo"
                  showUploadList={false}
                  disabled={loading == true}
                  beforeUpload={upPhotoComment}
                >
                  <Button icon={<CameraOutlined />} style={{ marginLeft: 5 }} />
                </Upload>
              </div>
              <Row style={{ position: "relative" }}>
                {photoEdit?.map((item, index) => (
                  <>
                    <Col xs={6} sm={4} md={3} lg={4} style={{ padding: 5 }}>
                      {item !== "" && (
                        <React.Fragment>
                          <CloseCircleOutlined
                            style={{
                              position: "absolute",
                              right: 0,
                              top: 10,
                              zIndex: 10,
                              color: "red",
                            }}
                            onClick={() =>
                              setPhotoEdit(
                                photoEdit.filter((photo) => item !== photo)
                              )
                            }
                          />
                          <div className={styles.list_image_upload}>
                            <img key={index} src={item} />
                          </div>
                        </React.Fragment>
                      )}
                    </Col>
                  </>
                ))}
                {loading == true && <Spin style={{ marginTop: 20 }} />}
              </Row>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Button
                  style={{ background: "blue", color: "#fff" }}
                  onClick={() => onclickUploadComment(item)}
                >
                  Sửa
                </Button>
                <Button
                  onClick={() => setEdit()}
                  style={{ marginLeft: 5, background: "red", color: "#fff" }}
                >
                  Hủy
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Comment
            key={item._id}
            actions={[
              <>
                {" "}
                <Tooltip key={index} title="Like">
                  <span onClick={() => like(item)}>
                    {createElement(
                      action === "liked" ? LikeFilled : LikeOutlined
                    )}
                    <span className="comment-action">{likes}</span>
                  </span>
                </Tooltip>
                <Tooltip key={item._id} title="Dislike">
                  <span onClick={dislike}>
                    {React.createElement(
                      action === "disliked" ? DislikeFilled : DislikeOutlined
                    )}
                    <span className="comment-action">{dislikes}</span>
                    <span style={{marginLeft:10}}>{item.createdAt}</span>
                  </span>
                </Tooltip>
              </>,
            ]}
            author={
              <a>
                {dataAll.user?.map(
                  (user) => item.user_id == user._id && user.name
                )}
              </a>
            }
            avatar={dataAll.user?.map(
              (user) =>
                item.user_id == user._id && (
                  <Avatar src={user.avatar} alt="Han Solo1" />
                )
            )}
            content={<p>{item.comment}</p>}
            datetime={
              <Tooltip
                title={moment()
                  .subtract("2022-05-21")
                  .format("YYYY-MM-DD HH:mm:ss")}
              >
                <span>
                  {" "}
                  {moment(
                    `${time.getFullYear()}-${
                      String(time.getMonth() + 1).length == 1
                        ? `0${time.getMonth() + 1}`
                        : `${time.getMonth() + 1}`
                    }-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`
                  ).fromNow()}
                </span>
              </Tooltip>
            }
            children={
              <>
                <div className={styles.image_comment}>
                  {item.photo.map(
                    (photo) =>
                      photo !== "" && (
                        <div
                          className={styles.image}
                          onClick={() =>
                            listPhoto == undefined || listPhoto == ""
                              ? setListPhoto(photo)
                              : listPhoto == photo
                              ? setListPhoto()
                              : setListPhoto(photo)
                          }
                        >
                          <img src={photo} />
                        </div>
                      )
                  )}
                </div>

                {item.photo.map((itemPhoto) => {
                  if (itemPhoto == listPhoto) {
                    return (
                      <div style={{ width: "100%" }}>
                        <div className={styles.image_list}>
                          <img src={listPhoto} alt="" />
                        </div>
                      </div>
                    );
                  }
                })}
              </>
            }
          />
        )}
      </>
    );
  };
  return (
    <div>
      {comments?.map((item, index) => {
        if (item.pro_id == id) {
          return (
            <div className="list-comment" key={item._id}>
              {listComment(item, index)}
              {/* <!--check nếu sp có bình luận của user đnag đăng nhập thì hiện icon sửa và xóa--> */}
              {user && user._id == item.user_id && item._id !== edit?._id && (
                <div style={{ display: "flex", marginTop: 20, color: "blue" }}>
                  <EditOutlined
                    style={{ marginRight: 10 }}
                    onClick={() => (
                      setEdit(item),
                      setPhotoEdit(item.photo[0] != [""] && item.photo)
                    )}
                  />
                  <DeleteOutlined onClick={() => onClickDelete(item)} />
                </div>
              )}
            </div>
          );
        }
      })}
    </div>
  );
};

export default ListComment;

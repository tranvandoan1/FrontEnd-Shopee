import {
  CloseCircleOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Select,
  Upload,
  Checkbox,
  Descriptions,
  Alert,
  message,
  Spin,
  Switch,
  Table,
  Badge,
  Image,
} from "antd";
import styles from "../../../../Page/Css/CssModule/SalesInfor.module.css";
import React, { useEffect, startTransition, useState } from "react";
import "../../../../Page/Css/Css/SalesInfor.css";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../../firebase";
import { addProduct, uploadProduct } from "./../../../../../reducers/Products";
import { useNavigate, useParams } from "react-router-dom";
import { add, upload } from "../../../../../API/ProAPI";
import InfoProEdit from "./InfoProEdit";
import { getShopOwner } from "../../../../../reducers/ShopOwner";

const { Option } = Select;
const SalesInfor = ({ state, callBack, dataAll, product }) => {
  const userLoce = JSON.parse(localStorage.getItem("user")); //lấy user đang đăng nhập ở localStorage
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [form] = Form.useForm();
  const duplicateMame = (duplicateMameArr = []) => {
    const newData = [];
    while (duplicateMameArr.length > 0) {
      newData.push(duplicateMameArr[0]);
      duplicateMameArr = duplicateMameArr?.filter(
        (item) => item.name !== duplicateMameArr[0].name
      );
    }
    return newData;
  };
  //lấy ra giá trị phân loại 1 từ product được sửa
  const dataClassifyPro = [];
  dataAll?.classifys?.filter((item, index) => {
    if (item.linked == product?.linked) {
      dataClassifyPro.push({
        ...item,
        indexNumber: index + 1,
        status: false,
      });
    }
  });

  // sắp xếp
  const newDataClassifyPro = dataClassifyPro?.sort(
    (a, b) => a.indexNumber - b.indexNumber
  );
  console.log(newDataClassifyPro, "newDataClassifyPro");

  const dataValues = [];
  dataClassifyPro?.map((item) => {
    item.values.map((itemValue, index) => {
      dataValues.push({
        ...itemValue,
        status: false,
      });
    });
  });

  //   // giá trị phân loại 2
  const newDataCommValue = duplicateMame(dataValues)?.sort(
    (a, b) => a.indexNumber - b.indexNumber
  );


  // giá trị phân loại 2 để thay đổi
  const dataValueClass = [];
  duplicateMame(newDataClassifyPro).forEach((item1, index) => {
    newDataCommValue.forEach((item2, indexItem) => {
      dataValueClass.push({
        _idClass: item1._id,
        price: 0,
        quantity: 0,
        name: item2.name,
        indexNumber: item2.indexNumber,
        status: false,
      });
    });
  });

  // setup lại dữ liệu
  const dataAction = [];
  newDataClassifyPro.map((item1) => {
    const data = dataValueClass.filter((item2) => item1._id == item2._idClass);
    const newDataCommValue = data?.sort(
      (a, b) => a.indexNumber - b.indexNumber
    );

    dataAction.push({
      ...item1,
      values: newDataCommValue,
    });
  });
  const [classificationValue1, setClassificationValue1] = useState(false); //check giá trị phân loại 1
  const [valueClassify1, setValueClassify1] = useState(dataClassifyPro); //check giá trị phân loại 1ư
  const [valueClassify2, setValueClassify2] = useState(dataAction); //check giá trị phân loại 1
  const [valueNameClassify2, setValueNameClassify2] =
    useState(newDataCommValue); //check giá trị phân loại 1
  const [disabledValueClassify, setDisabledValueClassify] = useState([]); //chọn những giá trị phân loại ko đucợ thêm
  const [checkValueInput, setCheckValueInput] = useState([]); //kiểm tra xem input có nhập ko
  console.log(valueNameClassify2, "valueNameClassify2");

  const ko = [];
  dataValueClass;

  const [checkPl1, setCheckPl1] = useState(false); //thêm phân loại 1
  const [checkPl2, setCheckPl2] = useState(false); //thêm phân loại 2
  const [classify1, setClassify1] = useState();
  const [classify2, setClassify2] = useState();
  const [classifyValue, setClassifyValue] = useState();
  const [dataClassify, setDataClassify] = useState(newDataClassifyPro);
  const [loading1, setLoading1] = useState(false);
  const [selectImage, setSelectImage] = useState();
  const [dataClassification, setDataClassification] = useState();
  const [dataBasicInfo, setDataBasicInfo] = useState(state?.dataBasicInfo);
  const [dataDetailedInfo, setDataDetailedInfo] = useState(
    state?.dataDetailedInfo
  );

  const shopowner = useSelector((data) => data.shopowners.value);
  useEffect(() => {
    dispatch(getShopOwner(userLoce._id));
  }, []);
  const onFinish = (values) => {
    if (values.classify1 == undefined) {
      message.warning("Bạn chưa có giá trị phân loại!");
    } else {
      if (checkPl2 == false) {
        setDataClassification(values);
        setClassifyValue([]);
        setClassify1([]);
        setClassify2([]);
      } else {
        setDataClassification([]);
        setClassifyValue({
          name_classify1: values.name_classify1,
          name_classify2: values.name_classify2,
        });
        const dataClassify1 = [];
        values.classify1.map((item) => {
          dataClassify1.push({ ...item, id: Math.random() });
        });

        setClassify1(dataClassify1);
        setClassify2(values.classify2);
      }
    }
    setDataClassify([]);
  };

  const confirm = async (values) => {
    // callBack({
    //   loading: true,
    //   state: {},
    // });

    const linkedPro = Math.random();
    if (checkPl2 !== false) {
      // lưu dữ liệu vào mảng mới trong đó có ảnh đại diện sản phẩm
      const newPro = [
        { name: "test", file: state?.imageUrlAvatar?.file },
        ...dataClassify,
      ];
      // linked dùng để liên kết với bảng thể loại với giá trị thể loại
      const dataProduct = [];
      const classifies = [];
      newPro?.map((item) => {
        if (item.name !== "test") {
          classifies.push({
            linked: linkedPro,
            name: item?.name,
            photo: item.photo,
            values: undefined,
            indexNumber: item.indexNumber,
            price: item.price,
            quantity: item.quantity,
            status: item.status,
          });
        } else {
          dataProduct.push({
            warehouse:
              dataDetailedInfo.warehouse !== undefined
                ? dataDetailedInfo.warehouse
                : product?.warehouse,

            trademark:
              dataDetailedInfo.trademark !== undefined
                ? dataDetailedInfo.trademark
                : product?.trademark,

            sent_from:
              dataDetailedInfo.sent_from !== undefined
                ? dataDetailedInfo.sent_from
                : product?.sent_from,

            origin:
              dataBasicInfo.origin !== undefined
                ? dataBasicInfo.trademark
                : product?.origin,

            name:
              state?.dataBasicInfo.name !== undefined
                ? dataBasicInfo.name
                : product?.name,

            description:
              state?.dataBasicInfo.description !== undefined
                ? dataBasicInfo.description
                : product?.description,

            cate_id:
              dataBasicInfo.cate_id !== undefined
                ? dataBasicInfo.cate_id
                : product?.cate_id,

            name_commodityvalue:
              classifyValue?.name_classify2 !== undefined
                ? classifyValue?.name_classify2
                : product?.name_commodityvalue,

            name_classification:
              dataClassification?.name_classify1 !== undefined
                ? classifyValue?.name_classify2
                : product?.name_classification,

            photo:
              dataBasicInfo.photo !== undefined
                ? dataBasicInfo.photo.file
                : product?.photo,
            status: dataBasicInfo.photo !== undefined ? true : false,
            sale:
              dataBasicInfo.sale !== undefined
                ? dataBasicInfo.sale
                : product?.sale,
            image_id: product?.image_id,
          });
        }
      });

      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({ product: dataProduct, classifies: classifies })
      );
      for (let i = 0; i < newPro.length; i++) {
        formData.append("files", newPro[i].file);
      }

      console.log(classifies, "classifies");
      console.log(dataProduct, "dữ liệu");
      // await dispatch(uploadp(formData));
      // callBack({
      //   loading: false,
      //   state: {
      //     dataBasicInfo: undefined,
      //     dataDetailedInfo: undefined,
      //     check: 1,
      //     imageUrlAvatar: undefined,
      //   },
      // });
      // navigate(`/seller-channel&&${btoa(id)}/admin/products`);
      // message.success("Thêm thành công  ");
    } else {
      const newArray = [];
      // chuyển dạng object có key là tên giá trị phân loại thành mảng thành value
      Object.keys(values).map((key) =>
        newArray.push({ name: key, classify: values[key] })
      );
      const newData = [];
      // lấy các giá trị gồm tiền và số lượng của giá trị phân loại 2 nhưng sẽ có cái trùng
      for (let i = 0; i < newArray.length; i++) {
        for (let j = 0; j < newArray[i].classify.length; j++) {
          for (let z = 0; z < classify2.length; z++) {
            if (newArray[i].classify[j] == classify2[z].name) {
              newArray[i].classify[j] = classify2[z];
            }
          }
          newData.push({
            name: newArray[i].name,
            items: newArray[i].classify,
            id: Math.random(),
          });
        }
      }
      // lọc cái phần tử trùng
      function getUniqueListBy(arr, key) {
        return [...new Map(arr.map((item) => [item[key], item])).values()];
      }
      const dataNew = getUniqueListBy(newData, "name");
      const dataSuccessful = [];
      for (let i = 0; i < dataNew.length; i++) {
        for (let j = 0; j < dataCheck.length; j++) {
          if (dataNew[i].name == dataCheck[j].name) {
            dataSuccessful.push({
              name: dataNew[i].name,
              value: dataNew[i].items,
              photo: dataCheck[j].file,
            });
          }
        }
      }

      // lưu dữ liệu vào mảng mới trong đó có ảnh đại diện sản phẩm
      // const newPro = [
      //   { name: "test", photo: state?.imageUrlAvatar?.file },
      //   ...dataSuccessful,
      // ];
      const newPro = [
        { name: "test", file: state?.imageUrlAvatar?.file },
        ...dataClassify,
      ];
      console.log(dataDetailedInfo, "dataDetailedInfo");
      // linked dùng để liên kết với bảng thể loại với giá trị thể loại
      const dataProduct = [];
      const classifies = [];
      newPro?.map((item) => {
        if (item.name !== "test") {
          classifies.push({
            linked: linkedPro,
            name: item?.name,
            photo: item.photo,
            values: item.values,
            indexNumber: item.indexNumber,
            price: item.price,
            quantity: item.quantity,
            status: item.status,
            image_id: item.image_id,
            _id: item?._id,
          });
        } else {
          dataProduct.push({
            warehouse: dataDetailedInfo.warehouse,

            trademark: dataDetailedInfo.trademark,
            sent_from: dataDetailedInfo.sent_from,
            origin: dataBasicInfo.origin,

            name:
              state?.dataBasicInfo.name !== undefined
                ? dataBasicInfo.name
                : product?.name,

            description:
              state?.dataBasicInfo.description !== undefined
                ? dataBasicInfo.description
                : product?.description,

            cate_id:
              dataBasicInfo.cate_id !== undefined
                ? dataBasicInfo.cate_id
                : product?.cate_id,

            name_commodityvalue:
              classifyValue?.name_classify2 !== undefined
                ? classifyValue?.name_classify2
                : product?.name_commodityvalue,

            name_classification:
              dataClassification?.name_classify1 !== undefined
                ? classifyValue?.name_classify2
                : product?.name_classification,

            photo:
              dataBasicInfo.photo !== undefined
                ? dataBasicInfo.photo.file
                : product?.photo,
            status: dataBasicInfo.photo !== undefined ? true : false,
            sale:
              dataBasicInfo.sale !== undefined
                ? dataBasicInfo.sale
                : product?.sale,
            user_id: product?.user_id,
            shop_id: product?.shop_id,
            image_id: product?.image_id,
            _id: product?._id,
          });
        }
      });

      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({ product: dataProduct, classifies: classifies })
      );
      for (let i = 0; i < newPro.length; i++) {
        formData.append("files", newPro[i].file);
      }
      console.log(classifies, "classifies");
      console.log(dataProduct, "dataProduct");
      // const {data}=await upload(formData)
      // console.log(data,'21321dad')
      // callBack({
      //   loading: false,
      //   state: {
      //     dataBasicInfo: undefined,
      //     dataDetailedInfo: undefined,
      //     check: 1,
      //     imageUrlAvatar: undefined,
      //   },
      // });
      // navigate(`/seller-channel&&${btoa(id)}/admin/products`);
      // message.success("Thêm thành công  ");
    }
  };
  const dataCheck =
    dataClassify?.length <= 0
      ? dataClassification?.classify1 == undefined
        ? classify1
        : dataClassification?.classify1
      : dataClassify;

  const Upload1 = (value) => {
    setLoading1(true);
    const src = URL.createObjectURL(value.file);
    const dataOther = dataClassify?.filter((item) => item._id !== value._id);

    const data = dataClassify?.find((item) => item._id == value._id);
    const newData = [
      ...dataOther,
      {
        _id: value._id,
        file: value.file,
        url: src,
        status: true,
        name: data.name,
        indexNumber: data.indexNumber,
        photo: data.photo,
        linked: data.linked,
        values: data.values,
        price: data.price,
        quantity: data.quantity,
        image_id: data.image_id,
      },
    ];
    const newDataSort = newData?.sort((a, b) => a.indexNumber - b.indexNumber);
    setDataClassify(newDataSort);
    setLoading1(false);
  };
  const removeImgae = (value) => {
    setLoading1(true);
    const src = URL.createObjectURL(value.file);
    const dataOther = dataClassify?.filter((item) => item._id !== value._id);

    const data = dataClassify?.find((item) => item._id == value._id);
    const newData = [
      ...dataOther,
      {
        _id: value._id,
        file: value.file,
        url: src,
        status: false,
        name: data.name,
        indexNumber: data.indexNumber,
        photo: data.photo,
        linked: data.linkedPro,
        values: data.values,
        price: data.price,
        quantity: data.quantity,
        image_id: data.image_id,
      },
    ];
    const newDataSort = newData?.sort((a, b) => a.indexNumber - b.indexNumber);
    setDataClassify(newDataSort);
    setLoading1(false);
  };

  const columnClassify1 = [
    {
      title: "Tên loại hàng",
      dataIndex: "name",
      key: "name",
      render: (_id, data) => {
        const handleChange = (e) => {
          // valueClassify1.map
          for (let i = 0; i < valueClassify1.length; i++) {
            if (valueClassify1[i]._id == _id) {
              valueClassify1[i].price = e.target.value;
            }
          }
          // handleChangeValue({ data: e.target.value, id: _id })
        };
        return (
          <div>
            <Input
              defaultValue={data.name == "" ? "" : data.name}
              style={{ width: 150 }}
              onBlur={handleChange}
            />
          </div>
        );
      },
    },
    {
      title: "Giá tiền",
      dataIndex: "_id",
      key: "_id",
      render: (_id, data) => {
        const handleChange = (e) => {
          // valueClassify1.map
          for (let i = 0; i < valueClassify1.length; i++) {
            if (valueClassify1[i]._id == _id) {
              valueClassify1[i].price = e.target.value;
            }
          }
          // handleChangeValue({ data: e.target.value, id: _id })
        };
        return (
          <div>
            <Input
              defaultValue={data.prive == undefined ? "" : data.price}
              style={{ width: 150 }}
              onBlur={handleChange}
            />
          </div>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => (
        <div>
          <Input defaultValue={quantity} style={{ width: 150 }} />
        </div>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => {
        const removeElement = (id) => {
          setValueClassify1(valueClassify1.filter((item) => item._id !== id));
        };
        return (
          <div>
            <DeleteOutlined
              style={{ width: "5%" }}
              onClick={() => removeElement(_id)}
            />
          </div>
        );
      },
    },
  ];

  const renderValue = (item) => {
    const value = item?.values?.map((com, i) => com.name);
    return value;
  };
  const handleChangeValue = (e) => {
    const dataFilter = valueClassify2.filter(
      (item) => String(item._id) !== String(e._id)
    );
    const dataValues = valueClassify2.find(
      (item) => String(item._id) == String(e._id)
    );
    if (e.type == "removeColums") {

      const newData = [
        ...dataFilter,
        {
          ...dataValues,
          status: e.status,
        },
      ];
      const newDataCommValue = newData?.sort(
        (a, b) => a.indexNumber - b.indexNumber
      );

      setValueClassify2(newDataCommValue);
    } else {
      if (String(e.value).length > 0) {
        for (let i = 0; i < dataValues.values.length; i++) {
          if (dataValues.values[i].name == e.item.name) {
            dataValues.values[i].price =
              e.type == "price" ? e.value : dataValues.values[i].price;
            dataValues.values[i].quantity =
              e.type == "quantity" ? e.value : dataValues.values[i].quantity;
            dataValues.values[i].status =
              e.type == "remove"
                ? dataValues.values[i].status == true
                  ? false
                  : true
                : dataValues.values[i].status;
          }
        }
        if (String(checkValueInput).length !== String(e.value).length) {
          //giá trị phải khác mới giá trị cũ mới lưu
          const newData = [
            ...dataFilter,
            {
              ...dataValues,
              values: dataValues.values,
            },
          ];
          const newDataCommValue = newData?.sort(
            (a, b) => a.indexNumber - b.indexNumber
          );

          setValueClassify2(newDataCommValue);
        }
      }
    }
  };

  const columnClassify2 = [
    {
      title: "Tên phân loại",
      dataIndex: "name",
      key: "name",
      // width: '35%',
      render: (name, data) => {
        return (
          <div className="in-name">
            <span
              className="show-name"
              style={{
                textDecoration: data.status == true ? "line-through" : "none",
                fontWeight: data.status == true ? "600" : "500",
                color: data.status == true ? "red" : "black",
                opacity: data.status == true ? 0.5 : 1,
                textDecorationColor: "black",
              }}
            >
              {name}
            </span>
            <div className="show-value">
              {data.values?.map((item, index) => {
                return (
                  <div
                    style={{
                      marginTop: index == 0 ? 0 : 25,
                    }}
                  >
                    <span
                      style={{
                        textDecoration:
                          item.status == true || data.status == true
                            ? "line-through"
                            : "none",
                        fontWeight:
                          item.status == true || data.status == true
                            ? "600"
                            : "500",
                        color:
                          item.status == true || data.status == true
                            ? "red"
                            : "black",
                        opacity:
                          item.status == true || data.status == true ? 0.5 : 1,
                        textDecorationColor: "black",
                      }}
                    >
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      },
    },
    {
      title: "Giá tiền",
      dataIndex: "_id",
      key: "_id",
      render: (_id, data) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.values?.map((item, index) => {
              return (
                <Input
                  placeholder="Giá tiền"
                  disabled={item.status || data.status}
                  defaultValue={data.price == undefined ? "" : data.price}
                  style={{ width: 150, marginTop: index == 0 ? 0 : 10 }}
                  onFocus={(e) => setCheckValueInput(e.target.value)}
                  onBlur={(e) =>
                    handleChangeValue({
                      value: e.target.value,
                      item: item,
                      _id: _id,
                      type: "price",
                    })
                  }
                />
              );
            })}
          </div>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "_id",
      key: "_id",
      render: (_id, data) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.values?.map((item, index) => {
              return (
                <Input
                  placeholder="Giá tiền"
                  disabled={item.status || data.status}
                  defaultValue={data.quantity == undefined ? "" : data.quantity}
                  style={{ width: 150, marginTop: index == 0 ? 0 : 10 }}
                  onBlur={(e) =>
                    handleChangeValue({
                      value: e.target.value,
                      item: item,
                      _id: _id,
                      type: "quantity",
                    })
                  }
                />
              );
            })}
          </div>
        );
      },
    },

    {
      title: "Loại bỏ",
      dataIndex: "_id",
      key: "_id",
      render: (_id, data) => {
        return (
          <div className="removal">
            {data.values?.map((item, index) => {
              return item.status == false ? (
                <MinusCircleOutlined
                  style={{
                    color: "red",
                    marginTop: index == 0 ? 0 : 30,
                  }}
                  onClick={() => {
                    data.status == false &&
                      handleChangeValue({
                        item: item,
                        _id: _id,
                        type: "remove",
                      });
                  }}
                />
              ) : (
                <PlusCircleOutlined
                  style={{
                    color: "#09ff00",
                    marginTop: index == 0 ? 0 : 30,
                  }}
                  onClick={() => {
                    data.status == false &&
                      handleChangeValue({
                        item: item,
                        _id: _id,
                        type: "remove",
                      });
                  }}
                />
              );
            })}
          </div>
        );
      },
    },
    {
      title: "Thao tác",
      dataIndex: "_id",
      key: "_id",
      render: (_id, data) => {
        return (
          <div>
            {data.status == false ? (
              <DeleteOutlined
                style={{ width: "5%" }}
                onClick={() =>
                  handleChangeValue({
                    _id: _id,
                    type: "removeColums",
                    status: !data.status,
                  })
                }
              />
            ) : (
              <PlusCircleOutlined
                style={{ width: "5%" }}
                onClick={() =>
                  handleChangeValue({
                    _id: _id,
                    type: "removeColums",
                    status: !data.status,
                  })
                }
              />
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div style={{ padding: "0 20px", background: "#fff" }}>
        {/* <Descriptions
          title="Thông tin phân loại"
          column={{
            xxl: 4,
            xl: 3,
            lg: 3,
            md: 3,
            sm: 2,
            xs: 1,
          }}
        >
          <Descriptions.Item label="Tên phân loại 1" span={1}>
            {product?.name_classification}
          </Descriptions.Item>
          <Descriptions.Item label="Giá trị phân loại 1" span={2}>
            <Row>
              {dataClassifyPro?.map((item, index) => (
                <p className="value-pro">
                  {index == 0 ? item.name : `  ,${item.name}`}
                </p>
              ))}
            </Row>
          </Descriptions.Item>

          <Descriptions.Item label="Tên phân loại 2" span={1}>
            {product?.name_commodityvalue}
          </Descriptions.Item>

          <Descriptions.Item label="Giá trị phân loại 2" span={2}>
            <Row>
              {newDataCommValue?.map((item, index) => {
                const price = item?.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                return (
                  <Col xs={12} sm={8} md={6} lg={12} xl={6}>
                    <p className="value-pro">
                      {index == 0
                        ? `${item.name} (${price}đ)`
                        : `,${item.name} (${price}đ)`}
                      -x{item.quantity}
                    </p>
                  </Col>
                );
              })}
            </Row>
          </Descriptions.Item>
        </Descriptions> */}
        <div style={{ marginBottom: 20 }}>
          <div className="classP2">
            <span>Phân loại 1</span>
            <Form
              name="dynamic_form_nest_item"
              onFinish={onFinish}
              style={{
                width: "70%",
              }}
              autoComplete="off"
            >
              <Form.List name="users">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          marginBottom: 8,
                          width: "100%",
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "first"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing first name",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Tên phân loại (vd: xl, đỏ,xxl ...)"
                            style={{ width: "100%" }}
                            onBlur={(e) => {
                              // console.log(e.target.value,'e2wd')
                              const data = valueNameClassify2.find(
                                (item) =>
                                  item.name.toLowerCase() ==
                                  e.target.value.toLowerCase()
                              );
                              if (
                                String(e.target.value).length > 0 &&
                                data == undefined
                              ) {
                                setValueNameClassify2([
                                  ...valueNameClassify2,
                                  {
                                    status: false,
                                    quantity: '',
                                    price: '',
                                    name: e.target.value,
                                    indexNumber: newDataCommValue.length + 5
                                  }
                                ])
                                const newData = []

                                valueClassify2.map(item => {
                                  newData.push({
                                    ...item, values: [
                                      ...valueNameClassify2,
                                      {
                                        status: false,
                                        quantity: '',
                                        price: '',
                                        name: e.target.value,
                                        indexNumber: newDataCommValue.length + 5
                                      }
                                    ]
                                  })
                                })
                                setValueClassify2(newData)
                              }
                            }}
                          />
                        </Form.Item>

                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Thêm
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

            </Form>
          </div>
        </div>
        <div>
          <div className="classP2">
            <span>Phân loại 2</span>
            <Form
              form={form}
              name="dynamic_form_nest_item"
              onFinish={onFinish}
              style={{
                width: "70%",
              }}
              autoComplete="off"
            >
              <Form.Item
                name=""
                label=""
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  placeholder="Tên phân loại (vd: xl, đỏ,xxl ...)"
                  style={{ width: "100%" }}
                  onBlur={(e) => {
                    // console.log(e.target.value,'e2wd')
                    const data = valueNameClassify2.find(
                      (item) =>
                        item.name.toLowerCase() ==
                        e.target.value.toLowerCase()
                    );
                    if (
                      String(e.target.value).length > 0 &&
                      data == undefined
                    ) {
                      // setValueNameClassify2([
                      //   ...valueNameClassify2,
                      //   {
                      //     status: false,
                      //     quantity: '',
                      //     price: '',
                      //     name: e.target.value,
                      //     indexNumber: newDataCommValue.length + 5
                      //   }
                      // // ])
                      // const newData = []

                      // valueClassify2.map(item => {
                      //   newData.push({
                      //     ...item, values: [
                      //       ...newDataCommValue,
                      //       {
                      //         status: false,
                      //         quantity: '',
                      //         price: '',
                      //         name: e.target.value,
                      //       }
                      //     ]
                      //   })
                      // })
                      // setValueClassify2(newData)
                      // console.log(form, 'form')
                      // form.resetFields()
                      console.log([
                        ...newDataCommValue,
                        {
                          status: false,
                          quantity: '',
                          price: '',
                          name: e.target.value,
                          indexNumber: newDataCommValue?.length + 1
                        }
                      ], '21ew32ewd')
                    }
                  }}
                />
              </Form.Item>


            </Form>
          </div>
        </div>


        <br />
        <br />
        <br />
        {newDataClassifyPro[0]?.values == undefined ? (
          <React.Fragment>
            <Table
              pagination={false}
              dataSource={valueClassify1}
              columns={columnClassify1}
            />
            <Button
              type="primary"
              style={{ width: "100%", marginTop: 10, marginBottom: 20 }}
              onClick={() =>
                setValueClassify1([
                  ...valueClassify1,
                  {
                    status: false,
                    remove: false,
                    price: "",
                    photo: "",
                    name: "",
                    linked: "",
                    indexNumber: "",
                    image_id: "",
                    _id: Math.random(),
                  },
                ])
              }
            >
              Thêm
            </Button>
          </React.Fragment>
        ) : (
          <Table
            pagination={false}
            dataSource={valueClassify2}
            columns={columnClassify2}
          />
        )}

        <React.Fragment>
          <hr style={{ margin: "30px 0" }} />
          <div style={{ display: "flex", width: "100%" }} className="add-image">
            <span
              style={{
                color: "#ee4d2d",
                fontWeight: "400",
                width: "30%",
                fontSize: 18,
              }}
            >
              Chọn ảnh cho từng mẫu hàng
            </span>

            <Row
              style={{
                display: "flex",
                alignItems: "center",
                width: "70%",
              }}
            >
              {(dataCheck == undefined ? dataClassifyPro : dataCheck)?.map(
                (item) => {
                  return (
                    <Col xs={4} sm={6} md={8} lg={6} xl={6}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          marginLeft: 10,
                          position: "relative",
                        }}
                        key={item}
                      >
                        <Upload
                          listType="picture-card"
                          showUploadList={false}
                          beforeUpload={(e) =>
                            Upload1({ file: e, _id: item._id })
                          }
                          onClick={() => setSelectImage(item)}
                        >
                          {item.photo !== undefined ? (
                            <div className="box-image">
                              <img
                                src={
                                  item?.status == false ? item.photo : item.url
                                }
                                className="image"
                              />
                            </div>
                          ) : (
                            <div>
                              <div
                                style={{
                                  marginTop: 8,
                                }}
                              >
                                {loading1 == true ? (
                                  <Spin />
                                ) : (
                                  <PlusCircleOutlined
                                    style={{
                                      fontSize: 30,
                                      opacity: 0.8,
                                      color: "#ee4d2d",
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          )}
                        </Upload>
                        <span
                          style={{
                            color: "#ee4d2d",
                            textTransform: "capitalize",
                          }}
                        >
                          {item.name}
                        </span>

                        {item.status == true && (
                          <div
                            style={{
                              cursor: "pointer",
                              position: "absolute",
                              top: -10,
                              right: -0,
                              color: "#ee4d2d",
                            }}
                            onClick={() => removeImgae(item)}
                          >
                            <CloseCircleOutlined style={{ fontSize: 17 }} />
                          </div>
                        )}
                      </div>
                    </Col>
                  );
                }
              )}
            </Row>
          </div>
        </React.Fragment>
      </div>
      <div
        style={{
          background: "rgba(255, 255, 255, 0.7)",
          margin: "10px 0",
          padding: "10px 20px",
        }}
      >
        <div style={{ cursor: "not-allowed" }}>
          <h4 style={{ fontWeight: "600", fontSize: 18 }}>Vận chuyển</h4>
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <div
              style={{ display: "flex", alignItems: "center", width: "25%" }}
            >
              <span style={{ color: "#ee4d2d", fontWeight: "700" }}>*</span>
              <span style={{ fontWeight: "500" }}>
                Cân nặng (sau khi gói hàng)
              </span>
            </div>
            <Input
              placeholder="Nhập vào"
              addonAfter={"gr"}
              style={{ width: "50%" }}
              disabled={true}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              margin: "10px 0",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", width: "25%" }}
            >
              <span style={{ color: "#ee4d2d", fontWeight: "700" }}>*</span>

              <span style={{ fontWeight: "500" }}>Phí vận chuyển</span>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "75%" }}
            >
              <div
                style={{
                  background: "#f5f5f5",
                  border: "1px solid #fffffff8",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "5px 0",
                    borderRadius: 3,
                  }}
                >
                  <RightOutlined
                    style={{
                      fontSize: 13,
                      marginRight: 10,
                      cursor: "not-allowed",
                    }}
                  />
                  <div style={{ fontSize: 13, position: "relative" }}>
                    <span>Nhanh</span>{" "}
                    <span className="shope_transport">SHOPEE VẬN CHUYỂN</span>
                  </div>
                </div>
                <div>
                  <span style={{ color: "#999", fontSize: 12 }}>
                    Đơn vị vận chuyển không được hỗ trợ.
                  </span>
                  <Switch defaultChecked disabled />
                </div>
              </div>
              <span style={{ color: "gray" }}>
                Cài đặt đơn vị vận chuyển ở đây chỉ áp dụng cho sản phẩm này.
              </span>
            </div>
          </div>
          <span style={{ color: "red", textAlign: "center" }}>
            Vận chuyển tạm thời chưa phát hành!
          </span>
        </div>
      </div>
      <div
        // className="button_save"
        style={{
          background: "#fff",
          height: 50,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <Button
          style={{
            background: "#ee4d2d",
            color: "#fff",
            marginRight: 120,
            border: 0,
          }}
          type="primary"
          onClick={() => close()}
        >
          Hủy
        </Button>
        {/* <Button
            style={{ background: "#fff", color: "#1890ff" }}
            type="primary"
            onClick={() => complete()}
          >
            Hoàn tất
          </Button> */}
      </div>
    </div>
  );
};

export default SalesInfor;

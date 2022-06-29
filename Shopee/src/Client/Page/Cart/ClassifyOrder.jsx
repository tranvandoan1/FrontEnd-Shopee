import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import React from "react";

const ClassifyOrder = () => {
  return (
    <div className="pr-classNameify">
      <div
        style={{ cursor: "pointer", zIndex: 1 }}
        onClick={() =>
          setCheckListClassify(
            checkListClassify !== saveorder._id ? saveorder._id : undefined
          )
        }
      >
        <span>
          phân loại{" "}
          {checkListClassify == undefined ||
          checkListClassify !== saveorder._id ? (
            <CaretUpOutlined />
          ) : (
            <CaretDownOutlined />
          )}
        </span>
        <br />
        <div className="pr-size">
          {saveorder.classification},{saveorder.commodity_value}
        </div>
      </div>

      {checkListClassify == saveorder._id &&
        data.product?.map((pro) => {
          if (pro.linked == saveorder.linked) {
            return (
              <div className="pr-filter" key={pro._id}>
                <div className="pr-type">
                  <h4>{pro.name_classification}</h4>
                  <div className="type">
                    <ul>
                      {data.classify?.map((classs) => {
                        if (classs.linked == saveorder.linked) {
                          return (
                            <li key={classs._id} style={{ marginRight: 5 }}>
                              <a>{classs.name}</a>
                              <div className="pr-check-type">
                                <div className="pr-check">
                                  <i className="fas fa-check"></i>
                                </div>
                              </div>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                </div>
                <div className="pr-size">
                  <h4>{pro.name_commodityvalue}</h4>
                  <div className="size">
                    <ul>
                      <li>
                        <a>0.9mx1m</a>
                        <div className="pr-check-size">
                          <div className="pr-check_z">
                            <i className="fas fa-check"></i>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="pr-button">
                  <button className="back">Trở lại</button>
                  <button className="confirm">Mua ngay</button>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};

export default ClassifyOrder;

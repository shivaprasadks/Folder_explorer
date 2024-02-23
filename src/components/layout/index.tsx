import React, { useEffect, useState } from "react";
import { onScrollBottom, onScrollSide } from "../../hooks/onScrollBottom";
import "./styles.scss";

const Layout = () => {
  const [page, setPage] = useState(1);
  const [dataSet, setDataSet] = useState([]);

  const getImageData = async () => {
    try {
      const rawRes = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=10`
      );
      const res = await rawRes.json();
      setDataSet([...dataSet, ...res]);
    } catch (e) {
      console.log("Error fetching data:", e);
    }
  };

  const renderData = () => {
    return dataSet.map((item, index) => (
      <span key={index} className="imageCard">
        <img
          className="imageContent"
          src={item.download_url}
          height={item.height / 10}
        />
        <div className="title">{item.author}</div>
      </span>
    ));
  };

  onScrollBottom(() => {
    setPage(page + 1);
  });

//   onScrollSide(() => {
//     setPage(page + 1);
//   });

  useEffect(() => {
    getImageData();
  }, [page]);

  return (
    <div className="mainContainer">
      <div className="imageLayout"> {renderData()}</div>
    </div>
  );
};

export default Layout;

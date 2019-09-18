const getFromData = (data, key) => {
  data.forEach((ele, index) => {
    if (ele.key === key) return ele.val;
  });

  return null;
};

export default getFromData;

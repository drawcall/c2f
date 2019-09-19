const getFromData = (data, key) => {
  let val = null;
  data.forEach((ele, index) => {
    if (ele.key === key) val = ele.val;
  });

  return val;
};

export default getFromData;

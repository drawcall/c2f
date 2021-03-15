import { message } from "antd";

message.config({
  duration: 1,
  maxCount: 3
});

let first = true;
const showMessage = (type, msg) => {
  if (first) {
    first = false;
    return;
  }

  if (type === "success") message.success(msg);
  else message.error(msg);
};

const Message = {
  success(msg) {
    showMessage("success", msg);
  },
  error(msg) {
    showMessage("error", msg);
  }
};

export default Message;

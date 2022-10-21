import { extend } from "vee-validate";
import { required, alpha, email, confirmed } from "vee-validate/dist/rules";
import PhoneNumber from "awesome-phonenumber";

extend("required", {
  ...required,
  message: "Vui lòng nhập thông tin",
});

extend("min", {
  validate(value, { length }) {
    return value.length >= length;
  },
  params: ["length"],
  message: "{_field_} cần ít nhất {length} ký tự",
});
extend("max", {
  validate(value, { length }) {
    return value.length <= length;
  },
  params: ["length"],
  message: "{_field_} cần bé hơn {length} ký tự",
});
extend("between", {
  validate(value, { min, max }) {
    return Number(min) <= value && Number(max) >= value;
  },
  params: ["min", "max"],
  message: "{_field_} phải lớn hơn {min} và nhỏ hơn {max}",
});

extend("full_name", {
  validate(value) {
    const firstName = value
      .split(" ")
      .slice(0, -1)
      .join(" ");
    const lastName = value
      .split(" ")
      .slice(-1)
      .join(" ");
    if (firstName && lastName) {
      return true;
    } else {
      return false;
    }
  },
  message:
    "{_field_} không hợp lệ, không được có ký tự đặt biệt, không khoảng trắng thừa",
});

extend("email", {
  ...email,
  message: "Vui lòng nhập email",
});

extend("confirmed", {
  ...confirmed,
  message: "Mật khẩu xác nhận không khớp",
});

extend("phone", {
  message() {
    return `Đây không phải số điện thoại hợp lệ`;
  },
  validate(value) {
    return new Promise((resolve) => {
      let phone = new PhoneNumber("+84" + value);
      // console.log("phone:", phone,  phone.isValid() );
      resolve({ valid: phone.isValid() });
    });
  },
});
extend("birthday", {
  message() {
    return `Ngày sinh phải là thời gian trước hiện tại`;
  },
  validate(value) {
    return new Promise((resolve) => {
      let birthday = Date.parse(value);
      let now = Date.now();
      let birthdayIsTrue = birthday < now;
      // resolve({ valid: birthdayIsTrue.isValid() });
    });
  },
});
extend("alpha", {
  ...alpha,
  message: "This field must only contain alphabetic characters",
});

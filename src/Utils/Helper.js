import jwtDecode from "jwt-decode";
import axios from "axios";
import BlackMedallion from "./../theme/images/medals/BLACK.png";
import BlueMedallion from "./../theme/images/medals/BLUE.png";
import GoldMedallion from "./../theme/images/medals/GOLD.png";
import PinkMedallion from "./../theme/images/medals/PINK.png";
import { useState } from "react";
// import YellowMedallion from "./../theme/images/medals/YELLOW.png";

export const GetDecodedToken = () => {
  const token = sessionStorage.getItem("princess_store");
  if (token) {
    const user_object = JSON.parse(token);
    const DecodedToken = jwtDecode(user_object.token);
    return DecodedToken;
  } else {
    console.log("Token Not Found");
    return false;
  }
};

export const ValidateToken = () => {
  const DecodedToken = GetDecodedToken();
  if (DecodedToken) {
    let currentDate = new Date();
    if (DecodedToken.exp * 1000 < currentDate.getTime()) {
      console.log("Token Expired");
      return false; //Token Expired
    } else {
      return true; //Token Not Expired
    }
  } else {
    console.log("Token NotFound");
    return false;
  }
};

export const FormatUsername = (user) => {
  if (user) {
    return user.first_name + " " + user.last_name;
  }
};

export const CreateCanvasImage = (
  medallion_name,
  medallion_elite_status,
  canvas_width,
  canvas_height
) => {
  var canvas = document.createElement("canvas");
  let c_width = canvas_width;
  let c_height = canvas_height;
  canvas.width = c_width;
  canvas.height = c_height;
  var context = canvas.getContext("2d");
  var imageObj = new Image();
  let name = medallion_name.toUpperCase();
  let elite_status = medallion_elite_status;

  if (elite_status === "ELITE") {
    imageObj.src = BlackMedallion;
  } else if (elite_status === "BLUE") {
    imageObj.src = BlueMedallion;
  } else if (elite_status === "RUBY") {
    imageObj.src = PinkMedallion;
  } else if (elite_status === "GOLD") {
    imageObj.src = GoldMedallion;
  }

  imageObj.onload = function () {
    context.drawImage(imageObj, -0, 0, 300, 300);
    context.font = "700 20px 'Red Hat Display', sans-serif";
    context.fillStyle = "black";
    context.textAlign = "center";
    let n = 0;
    let i;
    if (name.length === 1 || name.length === 2) {
      n = 0.01;
      i = -1.25;
    } else if (name.length === 3) {
      n = 0.15;
      i = -1.25;
    } else if (name.length >= 4 && name.length <= 6) {
      n = 0.3;
      i = -1.25;
    } else if (name.length >= 7 && name.length < 8) {
      n = 0.4;
      i = -1.3;
    } else if (name.length >= 8 && name.length < 10) {
      n = 0.5;

      i = -1.1;
    } else if (name.length >= 10 && name.length < 14) {
      n = 0.5;
      i = -1.1;
    } else if (name.length >= 14 && name.length <= 16) {
      n = 0.65;

      i = -1.1;
    } else if (name.length >= 17 && name.length <= 19) {
      n = 0.85;

      i = -1.1;
    } else if (name.length >= 19) {
      n = 0.9;

      i = -1.1;
    }
    let angle = Math.PI * n; // in radians
    let radius = 120;

    context.translate(152, 150);
    context.rotate((i * angle) / 2);
    for (let i = 0; i < name.length; i++) {
      /* It is worth noting that we are not
    rotating the text,here the whole
    context is being rotated and
    translated, and the letters are just
    filled in it. */
      context.rotate(angle / name.length);
      context.save();
      context.translate(0, -1 * radius);
      context.fillText(name[i], 0, 0);
      context.restore();
    }
  };

  return canvas;
};

export const CreateCanvasImage500 = (
  medallion_name,
  medallion_elite_status,
  canvas_width,
  canvas_height
) => {
  var canvas = document.createElement("canvas");
  let c_width = canvas_width;
  let c_height = canvas_height;
  canvas.width = c_width;
  canvas.height = c_height;
  var context = canvas.getContext("2d");
  var imageObj = new Image();
  let name = medallion_name.toUpperCase();
  let elite_status = medallion_elite_status;

  if (elite_status === "ELITE") {
    imageObj.src = BlackMedallion;
  } else if (elite_status === "BLUE") {
    imageObj.src = BlueMedallion;
  } else if (elite_status === "RUBY") {
    imageObj.src = PinkMedallion;
  } else if (elite_status === "GOLD") {
    imageObj.src = GoldMedallion;
  }

  imageObj.onload = function () {
    context.drawImage(imageObj, -0, 0, 500, 500);
    context.font = "700 25px 'Red Hat Display', sans-serif";
    context.fillStyle = "black";
    context.textAlign = "center";
    let n = 0;
    let i;
    if (name.length === 1 || name.length === 2) {
      n = 0.01;
      i = -1.3;
    } else if (name.length === 3) {
      n = 0.15;
      i = -1.3;
    } else if (name.length >= 4 && name.length <= 6) {
      n = 0.3;
      i = -1.3;
    } else if (name.length >= 7 && name.length < 8) {
      n = 0.4;
      i = -1.3;
    } else if (name.length >= 8 && name.length < 10) {
      n = 0.5;
      i = -1.1;
    } else if (name.length >= 10 && name.length < 14) {
      n = 0.5;
      i = -1.1;
    } else if (name.length >= 14) {
      n = 0.65;
      i = -1.1;
    }

    let angle = Math.PI * n; // in radians
    let radius = 202;

    context.translate(250, 250);
    context.rotate((i * angle) / 2);
    for (let i = 0; i < name.length; i++) {
      /* It is worth noting that we are not
    rotating the text,here the whole
    context is being rotated and
    translated, and the letters are just
    filled in it. */
      context.rotate(angle / name.length);
      context.save();
      context.translate(0, -1 * radius);
      context.fillText(name[i], 0, 0);
      context.restore();
    }
  };

  return canvas;
};

//Get Function
export const GetFunction = async (GetUrl, Token) => {
  return await axios({
    method: "get",
    url: GetUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

//Post Function
export const PostFunction = async (PostUrl, Data, Token) => {
  return await axios({
    method: "post",
    url: PostUrl,
    data: Data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  })
    .then((response) => {
      console.log("res", response);
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

//View More Content
export const ViewMoreContent = (string) => {
  const length = string.length;
  return string.substring(0, length);
};

//View Less Content
export const ViewLessContent = (string, length) => {
  return string.substring(0, length);
};

//Sale Display Text
export const ChangeSaleText = (sale_status) => {
  switch (sale_status) {
    case "on_sale":
      return "SALE";

    case "off_sale":
      return "NOT FOR SALE";

    case "timed_auction":
      return "TIMED AUCTION";

    default:
      return "BLACK STATUS";
  }
};

//ETH Equavalent Price
export const DollarsToETH = async () => {
  const dollar_price = await axios({
    method: "get",
    url: "https://api.coinbase.com/v2/exchange-rates?currency=USD",

    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${Token}`,
    },
  })
    .then((response) => {
      console.log("res", response);

      if (response?.data?.data?.rates?.ETH) {
        return response?.data?.data?.rates?.ETH;
      } else {
        return 0.0006499668516906;
      }
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
  console.log(dollar_price);
  return dollar_price;
};

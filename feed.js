function checkCookie() {
  var username = "";
  if (getCookie("username") == false) {
    window.location = "login.html";
  }
}

checkCookie();
window.onload = pageLoad;

function getCookie(name) {
  var value = "";
  try {
    value = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name))
      .split("=")[1];
    return value;
  } catch (err) {
    return false;
  }
}

function pageLoad() {
  document.getElementById("postbutton").onclick = getData;

  //document.getElementById('displayPic').onclick = fileUpload;
  document.getElementById("fileField").onchange = fileSubmit;

  var username = getCookie("username");

  document.getElementById("username").innerHTML = username;
  console.log(getCookie("img"));
  showImg("img/" + getCookie("img"));
  readPost();
  setInterval(readPost, 500);
}

function getData() {
  var msg = document.getElementById("textmsg").value;
  document.getElementById("textmsg").value = "";
  writePost(msg);
}

function fileUpload() {
  document.getElementById("fileField").click();
}

function fileSubmit() {
  document.getElementById("formId").submit();
}

function showImg(filename) {
  if (filename !== "") {
    var showpic = document.getElementById("displayPic");
    showpic.innerHTML = "";
    var temp = document.createElement("img");
    temp.src = filename;
    showpic.appendChild(temp);
  }
}

async function readPost() {
  const response = await fetch("/readPost");
  const content = await response.json();
  showPost(content);
}

async function writePost(msg) {
  console.log("Send MSG to server");
  const response = await fetch("/writePost", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post: msg,
    }),
  });
  const content = await response.json();
  console.log(content);
  showPost(content);
  // const response = await fetch("/writePost");
  // const content = await response.json();
  // showPost(content);
}

function showPost(data) {
  var keys = Object.keys(data);
  var like = 0;
  var divTag = document.getElementById("feed-container");
  divTag.innerHTML = "";
  for (var i = keys.length - 1; i >= 0; i--) {
    console.log(data[keys[i]]);
    var temp = document.createElement("div");
    temp.className = "newsfeed";
    divTag.appendChild(temp);
    var temp1 = document.createElement("div");
    temp1.className = "postmsg";
    temp1.innerHTML = data[keys[i]]["post_description"];
    temp.appendChild(temp1);
    var temp1 = document.createElement("div");
    temp1.className = "postuser";
    var temp3 = document.createElement("div");
    temp3.className = "posttime";

    temp1.innerHTML = "Posted by: " + data[keys[i]]["username"];
    temp.appendChild(temp1);
    temp3.innerHTML =
      "Time posted: " +
      data[keys[i]]["post_time"].replace("T", " ").replace(".000Z", " ");
    temp.appendChild(temp3);
    console.log(data[keys[i]]["post_time"]);

    var temp2 = document.createElement("button");
    // temp2.className = "likebtn";
    temp2.id = "Likeshow";
    temp2.innerHTML = `<span class="likebtn" onclick="Likepost('${
      data[keys[i]]["post_id"]
    }','${data[keys[i]]["username"]}')">Like(${data[keys[i]]["COUNT"]})</span>`;
    // Likeshow(data[keys[i]]["post_id"]);
    //temp2.innerHTML += `<span onclick="Likeshow('${data[keys[i]]["post_id"]}')">Like</span>`
    // temp2.addEventListener("click", function () {
    // 	alert("Post Liked");
    //   });
    temp.appendChild(temp2);
  }
}
async function Likeshow(post_id) {
  const response = await fetch("/Likeshow", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post_id: post_id,
    }),
  });
  // console.log(response);
  // const content = await response.json();
  // // showPost(content);
  // var keys = Object.keys(content);
  // console.log(keys);
  document.getElementById(
    "Likeshow"
  ).innerHTML += `<span>${response[0]}</span>`;
}

async function Likepost(post_id, username) {
  alert("Post Liked ! " + post_id + username);
  const response = await fetch("/Likepost", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post_id: post_id,
      username: username,
    }),
  });
}

async function readComment() {
  const response = await fetch("/readComment");
  const content = await response.json();
  showComment(content);
}

async function writeComment(msg) {
  console.log("Send MSG to server");
  const response = await fetch("/writeComment", {
    method: "COMMENT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Comment: msg,
    }),
  });
  const content = await response.json();
  console.log(content);
  showComment(content);
  // const response = await fetch("/writePost");
  // const content = await response.json();
  // showPost(content);
}

function showComment(data) {
  var keys = Object.keys(data);
  var divTag = document.getElementById("comment-container");
  divTag.innerHTML = "";
  for (var i = keys.length - 1; i >= 0; i--) {
    var temp = document.createElement("div");
    temp.className = "newscomment";
    divTag.appendChild(temp);
    var temp1 = document.createElement("div");
    temp1.className = "postcomment";
    temp1.innerHTML = data[keys[i]]["comment_description"];
    temp.appendChild(temp1);
    var temp1 = document.createElement("div");
    temp1.className = "comment_by";

    temp1.innerHTML = "Commented by: " + data[keys[i]]["username"];
    temp.appendChild(temp1);
  }
}

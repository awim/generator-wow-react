/* eslint-disable no-undef */
const translate = async ({
  libretranslateUrl = "http://innovatech.lab1:5000/translate",
  apiKey = "6067ca3d-87b6-4f1a-98a0-a4cdfa2492d5",
  q,
  source = "en",
  target
}) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    q,
    source,
    target,
    apiKey,
    format: "text"
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  const request = await fetch(libretranslateUrl, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.error(error));

  return request;
};

module.exports = { translate };

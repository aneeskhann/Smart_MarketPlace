let weatherInfo;

export const postWeather = (req, res) => {
   weatherInfo=req.body
  
  console.log("Recieved from ESP8266: ", weatherInfo);
  res.sendStatus(200);
};

export const getWeather = (req, res) => {
  console.log("Sent to React: ", weatherInfo);
  res.json(weatherInfo);
};

var { doRequest } = require('./httpsRequest');


const refinancingOnData = async (date) => {

  response = await doRequest(process.env.RBNB_BANK + 'RefinancingRate?onDate=' + date.toUTCString(),
            'GET'
        );
 
  return JSON.parse(response);
}

module.exports = {
    refinancingOnData
}
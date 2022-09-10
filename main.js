// TODO: Modify this function
function generateShortCode(storeId, transactionId) {
  //--convert id to string
  var strStoreId = storeId.toString();
  var strTransactionId = transactionId.toString();
  // possible character of random chars
  var possibleChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var couponText = strStoreId + "-" + strTransactionId + "-";
  const couponLength = 9 - (strStoreId.length + strTransactionId.length + 2);
  // less than 0 or -ve return
  if (couponLength <= 0) {
    return couponText;
  }
  for (var i = 0; i < couponLength; i++) {
    couponText += possibleChars.charAt(
      Math.floor(Math.random() * possibleChars.length)
    );
  }
  // return coupon
  return couponText;
}

// TODO: Modify this function
function decodeShortCode(shortCode) {
  // Logic goes here
  // seperate data and store in an array
  var data = shortCode.split("-");

  return {
    storeId: parseInt(data[0]), // store id goes here,
    shopDate: new Date(), // the date the customer shopped,
    transactionId: parseInt(data[1]), // transaction id goes here
  };
}

// ------------------------------------------------------------------------------//
// --------------- Don't touch this area, all tests have to pass --------------- //
// ------------------------------------------------------------------------------//
function RunTests() {
  var storeIds = [175, 42, 0, 9];
  var transactionIds = [9675, 23, 123, 7];

  storeIds.forEach(function (storeId) {
    transactionIds.forEach(function (transactionId) {
      var shortCode = generateShortCode(storeId, transactionId);
      var decodeResult = decodeShortCode(shortCode);
      $("#test-results").append(
        "<div>" + storeId + " - " + transactionId + ": " + shortCode + "</div>"
      );
      AddTestResult("Length <= 9", shortCode.length <= 9);
      AddTestResult("Is String", typeof shortCode === "string");
      AddTestResult("Is Today", IsToday(decodeResult.shopDate));
      AddTestResult("StoreId", storeId === decodeResult.storeId);
      AddTestResult("TransId", transactionId === decodeResult.transactionId);
    });
  });
}

function IsToday(inputDate) {
  // Get today's date
  var todaysDate = new Date();
  // call setHours to take the time out of the comparison
  return inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0);
}

function AddTestResult(testName, testResult) {
  var div = $("#test-results").append(
    "<div class='" +
      (testResult ? "pass" : "fail") +
      "'><span class='tname'>- " +
      testName +
      "</span><span class='tresult'>" +
      testResult +
      "</span></div>"
  );
}

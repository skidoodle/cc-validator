function restrictInput(a) {
  a.value = a.value.replace(/[^0-9]/g, "").slice(0, 16);
}
function validateCreditCard(a) {
  a = a.replace(/\D/g, "");
  var b = getCardNetwork(a);
  return b && a.length == b.length && luhnCheck(a) ? !0 : !1;
}

function getCardNetwork(a) {
  const cardNetworks = [
    { pattern: /^\b4\d{15}\b/, name: "Visa", length: 16 },
    { pattern: /^\b5[1-5]\d{14}\b/, name: "MasterCard", length: 16 },
    { pattern: /^\b3[47]\d{13}\b/, name: "American Express", length: 15 },
    { pattern: /^\b30[0-5]\d{11}\b/, name: "Diners Club", length: 14 },
    { pattern: /^\b35[3-8]\d{13}\b/, name: "JCB", length: 16 },
    { pattern: /^\b5[0678]\d{14,17}\b/, name: "Maestro", length: 16 },
    { pattern: /^\b6011\d{12}\b/, name: "Discover", length: 16 }
  ];

  for (const network of cardNetworks) {
    if (network.pattern.test(a)) {
      return { name: network.name, length: network.length };
    }
  }

  return null;
}

function luhnCheck(a) {
  for (var b = 0, c = !1, e = a.length - 1; 0 <= e; e--) {
    var d = parseInt(a.charAt(e));
    c && (d *= 2, 9 < d && (d -= 9));
    b += d;
    c = !c;
  }
  return 0 === b % 10;
}

function checkCC() {
  event.preventDefault();
  var a = document.querySelector("#cc"), b = document.querySelector("#result"), c = getCardNetwork(a.value);
  a = validateCreditCard(a.value);
  b.textContent = a ? "Credit card is valid. (" + c.name + ")" : "Credit card is invalid.";
  b.style.color = a ? "#4CAF50" : "#FF5733";
  return a;
};
const ClearForm = (setData, setCardType) => {
  const reset = {
    Number: "",
    Date: "",
    Name: "",
    CVV: "",
  };
  setData(reset);
  setCardType("Unknown");
};

const detectCardType = (cardNumber, setCardType) => {
  const regexMastercard = /^5[1-5]/;
  const regexVisa = /^4/;
  const regexAmericanExpress = /^3[47]/;

  if (regexMastercard.test(cardNumber)) {
    setCardType("Mastercard");
  } else if (regexVisa.test(cardNumber)) {
    setCardType("Visa");
  } else if (regexAmericanExpress.test(cardNumber)) {
    setCardType("American Express");
  } else {
    setCardType("Unknown");
  }
};

export const handleChange = (e, setIsFlipped, setData, detectCardType) => {
  const { name, value } = e.target;

  const formattedValue = value.replace(/\d{4}(?=\d)/g, "$& ");
  if (name == "CVV") {
    setIsFlipped(true);
  } else {
    setIsFlipped(false);
  }
  setData((prevData) => ({
    ...prevData,
    [name]: name == "Number" ? formattedValue : value,
  }));

  if (name == "Number") {
    detectCardType(value.substring(0, 4));
  }
};

export const handleSubmit = (
  event,
  data,
  setErrors,
  cardType,
  UploadCreditCard,
  ClearForm,
  setIsFlipped
) => {
  event.preventDefault();

  const errors = {};
  if (/\d/.test(data.Name)) {
    errors.name = "Este campo solo acepta letras.";
  }
  if (/[a-zA-Z]/.test(data.Number)) {
    errors.number = "Este campo solo acepta numeros.";
  }
  if (cardType == "Unknown") {
    errors.tarjeta = "Tarjeta no identificada";
  }
  if (data.Number.length < 19) {
    errors.tarjeta2 = "Tarjeta incompleta";
  }
  setErrors(errors);

  if (Object.keys(errors).length === 0) {
    UploadCreditCard({
      Number: data.Number,
      Name: data.Name,
      CVV: data.CVV,
      Date: data.Date,
      Type: cardType,
    });
    ClearForm();
    setIsFlipped(false);
  }
};

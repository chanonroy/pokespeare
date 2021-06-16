import fetch from "node-fetch";

export const shakespeareTranslate = async (text: string) => {
  const response = await fetch(
    `https://api.funtranslations.com/translate/shakespeare.json?text=${text}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status !== 200) {
    throw Error("An error occurred");
  }

  const translation = JSON.parse(await response.text()).contents.text;
  return translation;
};

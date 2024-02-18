import toast from "react-hot-toast";
const { GoogleGenerativeAI } = require("@google/generative-ai");

export const rewriteWithAI = async ({ title, setTitle, setAILoading }) => {
  try {
    setAILoading(true)
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMNI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt =
      "rewrite the following text for a social media post title, make it more engaging (you can use few emoji of needed), well structured, grammerly correct, do not increase the length too much maximum length of the string should be same as original length: " +
      title;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setTitle(text);
  } catch (error) {
    toast.error("Failed to rewrite with AI");
  }
  setAILoading(false)
};

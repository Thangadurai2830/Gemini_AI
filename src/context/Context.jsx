import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, SetRecentprompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState("");
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextword) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextword);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false)
    setShowResult(false)
  }


  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
        response = await runChat(prompt);
        SetRecentprompt(prompt)
    }
    else
    {
        setPrevPrompts(prev=>[...prev,input])
        SetRecentprompt(input)
        response = await runChat(input)
    }
   
    let respnseArray = response.split("**");
    let newResponse="";
    for (let i = 0; i < respnseArray.length; i++) {
      if (i == 0 || i % 2 !== 1) {
        newResponse += respnseArray[i];
      } else {
        newResponse += "<b>" + respnseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextword = newResponseArray[i];
      delayPara(i, nextword + " ");
    }
    setLoading(false);
    setInput("");
  };

  const contextvalue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    SetRecentprompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextvalue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;

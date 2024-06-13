import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Link } from "react-router-dom";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { addUser } from "../utils/UserSlice";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_SECRET_KEY);

const AskGemini = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { details } = useSelector((store) => store.data);

  useEffect( () => {

    const id = localStorage.getItem("userId");
    dispatch(addUser({_id : id}));
    
  })

  async function fetchAnswer(prompt) {
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const chat = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 2048,
        },
      });

      const result = await chat.sendMessage(prompt);
      const res = result.response;
      let text = res.text();

      text = text.replaceAll("**", "\n");
      text = text.replaceAll(" * ", "->");
      text = text.replaceAll("*", " ");

      setResponse(
        "After analysing your transactions , we found the following ways to work upon : \n" +
          text
      );
    } catch (error) {
      toast.error("Some error occurred : " + error.message);
    }

    setLoading(false);
  }

  function handleClick(e) {

    if (e.target.id == "101") {
      toast.success("Analysing your transactions");

      const prompt = `Savings : ${details.saving} Investment : ${details.investment} Expense : ${details.expense}
        From the above given data suggest some of ways to increase the saving and investment and
        reduce unnecessary expense . Expense includes some necessary expenses such as food water and other
        and unnecessary expense such as expensive food , movies , parties and so on.`;

      fetchAnswer(prompt);
    } else {
      if (!question) {
        toast.error("Plese enter a question..");
        return;
      }

      fetchAnswer(question);
    }
  }

  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
        <div className="absolute top-[30px] right-0 rounded-xl flex justify-between w-[80px]">
          <Link
            to="/Home"
            className="font-bold text-white px-2 py-2 bg-blue-400 rounded-xl h-[40px]"
          >
            Home
          </Link>
        </div>

        <h1 className="text-2xl py-8 mb-10 bg-slate-800 text-white rounded max-[400px]:w-full mx-0 px-0">
          Ask AI
        </h1>

        <div className="w-[80%] mx-auto flex justify-center gap-1">
          <input
            className=".form-input rounded-md text-center w-[80%] mx-auto border border-black"
            type="text"
            value={question}
            placeholder="Any query ? Ask Here"
            onChange={(e) => setQuestion(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="relative top-[5px] right-[12px] cursor-pointer size-6"
            onClick={handleClick}
            id={202}
          />
        </div>

        <div className="w-[80%] mx-auto my-4 h-[400px] bg-slate-200 flex justify-center ">
          <div className="w-[100%] h-[100%] overflow-y-scroll overflow-x-scroll">
            {loading ? (
              <>
                <svg
                  className="animate-spin size-16 mx-auto mt-32"
                  fill="none"
                  height="20"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 3C6.13401 3 3 6.13401 3 10C3 10.2761 2.77614 10.5 2.5 10.5C2.22386 10.5 2 10.2761 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C9.72386 18 9.5 17.7761 9.5 17.5C9.5 17.2239 9.72386 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3Z"
                    fill="#212121"
                  />
                </svg>
              </>
            ) : (
              <>
                <pre>{response}</pre>
              </>
            )}
          </div>
        </div>
      </div>

      <button
        className="font-bold text-white px-2 py-2 bg-blue-400 rounded-xl h-[40px]"
        id={101}
        onClick={handleClick}
      >
        Analyse My Transactions
      </button>
      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
};

export default AskGemini;

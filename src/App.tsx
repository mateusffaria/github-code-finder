import React, { FormEvent } from "react";
import { useState } from "react";
import sendRequest, { SearchResponse } from "./service/codefinder";
import "./Global.css";

enum ButtonText {
  loading = "Loading",
  ready = "Send Request",
}

function App() {
  const [apiResponse, setApiResponse] = useState<
    Array<SearchResponse["data"]["items"]> | undefined
  >();
  const [totalCount, setTotalCount] = useState(0);
  const [codeSearch, setCodeSearch] = useState("");
  const [org, setOrg] = useState("");
  const [fileExtension, setFileExtension] = useState("");
  const [buttonText, setButtonText] = useState<ButtonText>(ButtonText.ready);
  const [requestErrors, setRequestErrors] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setButtonText(ButtonText.loading);

    const data = await sendRequest(codeSearch, fileExtension, org);

    if (data?.hasError) {
      setButtonText(ButtonText.ready);
      setRequestErrors(data.hasError);
      return;
    }

    setRequestErrors(false);

    setTotalCount(data.total_count!);

    setApiResponse(data.grouped);

    if (data) setButtonText(ButtonText.ready);
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="group">
            <label>Code text: </label>
            <input
              type="text"
              onChange={(val) => setCodeSearch(val.target.value)}
              required
            />
          </div>

          <div className="group">
            <label>Org: </label>
            <input type="text" onChange={(val) => setOrg(val.target.value)} />
          </div>

          <div className="group">
            <label>File extension (js, ts, java, rb...): </label>
            <input
              type="text"
              onChange={(val) => setFileExtension(val.target.value)}
            />
          </div>

          <button disabled={buttonText === ButtonText.loading} type="submit">
            {buttonText}
          </button>

          {requestErrors && (
            <span style={{ color: "red", marginTop: "35px" }}>
              Something wrong, please verify input values and your github dev
              key
            </span>
          )}
        </form>

        {apiResponse && (
          <div>
            <div className="flex-content">
              <span>Total de correspondências:</span>
              <p>{totalCount}</p>
            </div>
            {apiResponse.map((items, index) => {
              return (
                <ul className="rounded-list" key={index}>
                  <li>
                    <span>Repositório: {items[0]?.repository.full_name}</span>
                    <ul>
                      {items.map((item, index) => {
                        return (
                          <li key={index}>
                            <a href={item.html_url}>{item.path}</a>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                </ul>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default App;

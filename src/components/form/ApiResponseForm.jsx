import React, { useState } from "react";
import { FormControl } from 'baseui/form-control';
import { Input, } from 'baseui/input';
import { Button } from "baseui/button";
import { Label1 } from "baseui/typography";
import JSONPretty from "react-json-pretty";
import { getWithToken } from "services/Request";
import { RESCUE_API_URL } from "utils/AppConsts";

const ApiResponseForm = () => {
  const [endpoint, setEndpoint] = useState("public/animals");
  const [response, setResponse] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    getWithToken(`${RESCUE_API_URL}${endpoint}`)
      .then(response => {
        setResponse(response.data);
      })
      .catch(error => {
        setResponse(error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <form
        onSubmit={onSubmit}
        style={{
          width: "100%",
        }}
      >
        <FormControl
          label={() => "Endpoint"}
        >
          <div style={{ display: "flex", alignItems: "center", }}>
            {RESCUE_API_URL}
            <Input value={endpoint} onChange={(e) => setEndpoint(e.target.value)} />
          </div>
        </FormControl>
        <FormControl>
          <Button type={"submit"} disabled={loading}>
            Submit
          </Button>
        </FormControl>
      </form>
      {response && <div
        style={{ display: "block" }}
      >
        <Label1>Result:</Label1>
        <JSONPretty data={response} />
      </div>}
    </div>
  );
};

export default ApiResponseForm;
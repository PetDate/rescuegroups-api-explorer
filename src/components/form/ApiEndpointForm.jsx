import React, { useState } from "react";
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button, } from "baseui/button";
import { requestWithToken } from "services/Request";
import { RESCUE_API_URL } from "utils/AppConsts";
import KeyValueList, { dataToQueryStringList } from "components/form/KeyValueList";
import { Panel, Accordion, } from "baseui/accordion";
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import { StatefulTextarea } from "baseui/textarea";

const ApiResponseForm = ({ onResponse = () => { } }) => {
  const [endpoint, setEndpoint] = useState("public/animals");
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("GET");
  const [params, setParams] = useState([]);
  const [body, setBody] = useState("{\r\n  \"data\": {\r\n    \"filterRadius\": {\r\n      \"miles\": 100,\r\n      \"postalcode\": \"32118\"\r\n    }\r\n  }\r\n}");

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    // mapping [{ id: "etc", key: value }, { id: "etc2", key2: value2 }, ...] into
    // { key: value, key2: value2, ... }
    let qs_params = dataToQueryStringList(params);
    let payload = method === "POST" ? JSON.parse(body) : {};
    requestWithToken(method, `${RESCUE_API_URL}${endpoint}`, { params: qs_params, data: payload })
      .then(response => {
        onResponse(response);
      })
      .catch(error => {
        onResponse(error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
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
      <FormControl
      >
        <RadioGroup
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          align={ALIGN.vertical}
        >
          <Radio value="GET">GET</Radio>
          <Radio
            value="POST"
          >
            POST
            </Radio>
        </RadioGroup>
      </FormControl>
      <FormControl
      >
        <Accordion
          renderPanelContent
        >
          <Panel title="Query Parameters">
            <KeyValueList data={params} setData={setParams} />
          </Panel>
          {
            method === "POST" &&
            <Panel title="JSON Body">
              <StatefulTextarea
                initialState={{ value: body }}
                onChange={(e) => setBody(e.target.value)}
                onKeyDown={(event) => {
                  if (event.keyCode === 9) {
                    event.preventDefault();
                    var v = event.target.value, s = event.target.selectionStart, e = event.target.selectionEnd;
                    event.target.value = v.substring(0, s) + "  " + v.substring(e);
                    event.target.selectionStart = event.target.selectionEnd = s + 2;
                    return false;
                  }
                }}
                overrides={{
                  Input: {
                    style: {
                      minHeight: "400px",
                      resize: "vertical",
                    }
                  }
                }}
              />
            </Panel>
          }
        </Accordion>
      </FormControl>
      <FormControl>
        <Button type={"submit"} disabled={loading}>
          Submit
        </Button>
      </FormControl>
    </form>
  );
};

export default ApiResponseForm;
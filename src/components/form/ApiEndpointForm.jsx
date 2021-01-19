import React, { useState } from "react";
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button, } from "baseui/button";
import { getWithToken } from "services/Request";
import { RESCUE_API_URL } from "utils/AppConsts";
import QueryParameterList from "./QueryParameterList";
import { dataToQueryStringList } from "./QueryParameterList";
import { Panel, Accordion } from "baseui/accordion";

const ApiResponseForm = ({ onResponse = () => { } }) => {
  const [endpoint, setEndpoint] = useState("public/animals");
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState([]);

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    
    // mapping [{ id: "etc", key: value }, { id: "etc2", key2: value2 }, ...] into
    // { key: value, key2: value2, ... }
    let qs_params = dataToQueryStringList(params);

    getWithToken(`${RESCUE_API_URL}${endpoint}`, qs_params)
      .then(response => {
        onResponse(response);
      })
      .catch(error => {
        onResponse(error.data.response);
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
          label={() => "GET Endpoint"}
        >
          <div style={{ display: "flex", alignItems: "center", }}>
            {RESCUE_API_URL}
            <Input value={endpoint} onChange={(e) => setEndpoint(e.target.value)} />
          </div>
        </FormControl>
        <FormControl
        >
          <Accordion
            renderPanelContent
          >
            <Panel title="Query Parameters">
              <QueryParameterList data={params} setData={setParams} />
            </Panel>
          </Accordion>
        </FormControl>
        <FormControl>
          <Button type={"submit"} disabled={loading}>
            Submit
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

export default ApiResponseForm;
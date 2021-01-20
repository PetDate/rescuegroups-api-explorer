import { Accordion, Panel } from "baseui/accordion";
import { Button } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import React, { useEffect, useState } from "react";
import { RESCUE_API_URL } from "utils/AppConsts";
import KeyValueList, { dataToQueryStringList } from "components/form/KeyValueList";
import { Label1 } from "baseui/typography";
import { requestWithToken } from "services/Request";

const SearchFilters = ({ setData }) => {
  const [filterRadius, setFilterRadius] = useState({ postalcode: 95122, miles: 100 });

  const mutateKey = (mutateFunc, key, value) => {
    mutateFunc(old_data => {
      let new_data = { ...old_data };
      new_data[key] = value;

      return new_data;
    });
  }

  useEffect(() => {
    setData({ data: { filterRadius } });
  }, [setData, filterRadius]);

  return (
    <React.Fragment>
      <Label1>filterRadius</Label1>
      <FormControl
        label={"Postal Code"}
      >
        <Input
          value={filterRadius["postalcode"]}
          onChange={(e) => mutateKey(setFilterRadius, "postalcode", e.target.value)}
        />
      </FormControl>
      <FormControl
        label={"Miles Radius"}
      >
        <Input
          value={filterRadius["miles"]}
          onChange={(e) => mutateKey(setFilterRadius, "miles", e.target.value)}
        />
      </FormControl>
    </React.Fragment>
  );
}

const DogSearchForm = ({ onResponse = () => { } }) => {
  const [endpoint, setEndpoint] = useState("public/animals/search/available/dogs");
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState([{ id: "1", limit: "10" }]);
  const [body, setBody] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    let qs_params = dataToQueryStringList(params);
    setLoading(true);
    requestWithToken("POST", `${RESCUE_API_URL}${endpoint}`, { params: qs_params, data: body })
    .then(res => {
      onResponse(res.data);
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
    >
      <FormControl
        label={() => "Endpoint"}
      >
        <div style={{ display: "flex", alignItems: "center", }}>
          {RESCUE_API_URL}
          <Input disabled value={endpoint} onChange={(e) => setEndpoint(e.target.value)} />
        </div>
      </FormControl>
      <FormControl>
        <Accordion
          renderPanelContent
        >
          <Panel title="Query Strings">
            <KeyValueList data={params} setData={setParams} />
          </Panel>
          <Panel title="Search Filters">
            <SearchFilters setData={setBody} />
          </Panel>
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

export default DogSearchForm;

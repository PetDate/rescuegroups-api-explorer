import { Accordion, Panel } from "baseui/accordion";
import { Button } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import React, { useEffect, useState } from "react";
import { RESCUE_API_URL } from "utils/AppConsts";
import KeyValueList, { dataToQueryStringList } from "components/form/KeyValueList";
import { Label1 } from "baseui/typography";
import { requestWithToken } from "services/Request";
import { Pagination } from "baseui/pagination";

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

const AnimalSearchForm = ({ animal = "dogs", onResponse = () => { } }) => {
  const [endpoint, setEndpoint] = useState(`public/animals/search/available/${animal}`);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState([{ id: "1", limit: "10" }]);
  const [body, setBody] = useState();
  const [response, setResponse] = useState(undefined);
  
  const onSubmit = (e = { preventDefault: () => {} }, page) => {
    e.preventDefault();
    console.log(e);
    console.log(page);
    let qs_params = { page, ...dataToQueryStringList(params) };
    setLoading(true);
    requestWithToken("POST", `${RESCUE_API_URL}${endpoint}`, { params: qs_params, data: body })
      .then(res => {
        setResponse(res.data);
        onResponse(res.data);
      })
      .catch(error => {
        setResponse(undefined);
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
          renderAll
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
        <div
          style={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            justifyContent: "space-between"
          }}
        >
          <Button type={"submit"} disabled={loading}>
            Submit
          </Button>
          {
            response &&
            <Pagination
              currentPage={response.meta.pageReturned}
              numPages={response.meta.pages}
              onPageChange={({ nextPage }) => {
                onSubmit(undefined, nextPage);
              }}
              overrides={{
                NextButton: {
                  props: {
                    type: "button",
                    disabled: loading,
                  }
                },
                PrevButton: {
                  props: {
                    type: "button",
                    disabled: loading || response.meta.pageReturned === 1,
                  }
                },
                Select: {
                  props: {
                    disabled: loading,
                  }
                }
              }}
            />
          }
        </div>
      </FormControl>
    </form>
  );
};

export default AnimalSearchForm;

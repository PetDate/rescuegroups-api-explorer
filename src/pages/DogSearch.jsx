import { Cell, Grid, ALIGNMENT } from "baseui/layout-grid";
import { Radio, RadioGroup } from "baseui/radio";
import { Label1 } from "baseui/typography";
import DogSearchForm from "components/form/DogSearchForm";
import React, { useState } from "react";
import JSONPretty from "react-json-pretty";

const DogResultItem = ({ id, name, distance }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <img />
      <div>
        {id}
      </div>
      <div>
        {name}
      </div>
      <div>
        {distance}
      </div>
    </div>
  );
};

const DogSearch = () => {
  const [responseType, setResponseType] = useState("JSON");
  const [response, setResponse] = useState(undefined);

  return (
    <section
      style={{
        marginTop: "10vh",
      }}
    >
      <Grid align={ALIGNMENT.center} >
        <Cell span={[4, 8, 12]}>
          <DogSearchForm onResponse={(res) => setResponse(res)} />
          <Label1>Response Type</Label1>
          <RadioGroup
            value={responseType}
            onChange={(e) => setResponseType(e.target.value)}
          >
            <Radio value="JSON">
              JSON
            </Radio>
            <Radio value="PRETTY">
              PRETTY
            </Radio>
          </RadioGroup>
          {
            response && (
              <div>
                <Label1>Result</Label1>
                {
                  responseType === "JSON" &&
                  <JSONPretty data={response} style={{ overflowX: "scroll" }} />
                }
                {
                  responseType === "PRETTY" &&
                  <div>
                    {response["data"].map((item) => {
                      let animal_data = { id: item["id"], ...item["attributes"] };
                      return <DogResultItem {...animal_data} />
                    })}
                  </div>
                }
              </div>
            )
          }
        </Cell>
      </Grid>
    </section>
  );
};

export default DogSearch;
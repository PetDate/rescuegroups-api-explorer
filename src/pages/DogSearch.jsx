import { Cell, Grid, ALIGNMENT } from "baseui/layout-grid";
import { Radio, RadioGroup } from "baseui/radio";
import { Label1 } from "baseui/typography";
import DogSearchForm from "components/form/DogSearchForm";
import React, { useState } from "react";
import JSONPretty from "react-json-pretty";

const DogResultItem = ({ }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly"
      }}
    >
      <img />
      <div>
        Name
      </div>
      <div>
        ID
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
            value="JSON"
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
                  <JSONPretty data={response} style={{ overflowX: "scroll" }}/>
                }
                {
                  responseType === "PRETTY"
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
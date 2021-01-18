import React, { useState } from "react";
import { FormControl } from 'baseui/form-control';
import { Input, SIZE, ADJOINED } from 'baseui/input';
import { Button } from "baseui/button";
import { Grid, Cell, ALIGNMENT } from 'baseui/layout-grid';
import { Label1 } from "baseui/typography";
import JSONPretty from "react-json-pretty";
import { getWithToken } from "services/Request";
import { RESCUE_API_URL } from "utils/AppConsts";

const Home = () => {
  const [endpoint, setEndpoint] = useState("public/animals");
  const [response, setResponse] = useState(undefined);
  const onSubmit = (event) => {
    event.preventDefault();
    getWithToken(`${RESCUE_API_URL}${endpoint}`)
      .then(response => {
        setResponse(response.data);
      })
      .catch(error => {
        setResponse({ error: "An error occured" });
      });
  };

  return (
    <section
      style={{
        paddingTop: "60px",
      }}
    >
      <Grid align={ALIGNMENT.center} o>
        <Cell span={[4, 8, 12]}>
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
                <Input  value={endpoint} onChange={(e) => setEndpoint(e.target.value)} />
              </div>
            </FormControl>
            <FormControl>
              <Button type={"submit"}>
                Submit
            </Button>
            </FormControl>
          </form>
          {response && <div
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%" }}
          >
            <Label1>Result:</Label1>
            <JSONPretty data={response} />
          </div>}
        </Cell>
      </Grid>
    </section>
  );
};

export default Home;

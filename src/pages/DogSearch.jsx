import { Cell, Grid, ALIGNMENT } from "baseui/layout-grid";
import { Radio, RadioGroup } from "baseui/radio";
import { Label1 } from "baseui/typography";
import AnimalSearchForm from "components/form/AnimalSearchForm";
import React, { useState } from "react";
import JSONPretty from "react-json-pretty";
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import { Avatar } from "baseui/avatar";

const DogTable = ({ data }) => {
  return (
    <TableBuilder data={data} emptyMessage={"No results!"}>
      <TableBuilderColumn
        overrides={{
          TableHeadCell: { style: { width: '1%' } },
          TableBodyCell: { style: { width: '1%' } },
        }}
      >
        {
          row => (
            <Avatar 
              name="?" 
              src={row.attributes.pictureThumbnailUrl}
            />
          )
        }
      </TableBuilderColumn>
      <TableBuilderColumn header="Rescue ID">
        {
          row => (
            row.attributes.rescueId || "No ID"
          )
        }
      </TableBuilderColumn>
      <TableBuilderColumn header="Name">
        {
          row => (
            row.attributes.name
          )
        }
      </TableBuilderColumn>
      <TableBuilderColumn header="Distance (mi)">
        {
          row => (
            row.attributes.distance
          )
        }
      </TableBuilderColumn>
    </TableBuilder>
  );
}

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
          <AnimalSearchForm 
            animal={"dogs"}
            onResponse={(res) => setResponse(res)}
          />
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
                  <DogTable data={response["data"]} />
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
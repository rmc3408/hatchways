import React from "react";
import StudentCard from "./StudentCard";
import { getData } from "../API/getData";
import { useQuery } from "react-query";
import { Row, Card, Divider } from "antd";

const BoardBox = () => {
  const { isLoading, error, data } = useQuery<IStudent[], TError>(
    "students",
    () => getData()
  );

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>An error has occurred</h1>;

  return (
    <div className="Center-BoardBox">
      <Card style={{ overflow: 'auto' }}>
        <Row justify="center" align="middle" >
          {data?.map((stud: IStudent) => {
            return (
              <>
                <StudentCard {...stud} />
                <Divider />
              </>
            );
          })}
        </Row>
      </Card>
    </div>
  );
};

export default BoardBox;

import React, { ChangeEvent, Fragment, KeyboardEvent, useState } from "react";
import { Avatar, Typography, Col, Tag } from "antd";
import GradesPanel from "./GradesPanel";
import { v4 as uuidv4 } from 'uuid';

const { Title } = Typography;

type ISetTags = {
  getTags: (a: string[], b: string) => void;
}

const StudentCard = (props: IStudent & ISetTags ) => {
  const [isAllGrades, setIsAllGrades] = useState<boolean>(false);
  const [arrTags, setarrTags] = useState<Array<string>>([]);
  const [tagText, setTagText] = useState<string>('');

  const { pic, firstName, lastName, id, email, company, skill, grades, getTags } = props;

  const average =
    grades.reduce((acc, c) => acc + parseFloat(c), 0) / grades.length || 0;
  
  const tagCreating = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newTag = arrTags;
      newTag.push(tagText);
      getTags(newTag, id);
      setarrTags(newTag);
      setTagText('');
    }
  };
  const tagTyping = (e: ChangeEvent<HTMLInputElement>) => {
    setTagText(e.target.value);
  };

  return (
    <Fragment>
      <Col offset={1} span={7}>
        <Avatar src={pic} alt={id} size={160} className="avatarStyle" />
      </Col>
      <Col span={16}>
        <Title>
          {firstName.toUpperCase()} {lastName.toUpperCase()}
        </Title>
        <div className="CardText-StudentCard">
          <p>Email: {email}</p>
          <p>Company: {company}</p>
          <p>Skill: {skill}</p>
          <p>Average: {average}%</p>
          {isAllGrades && <GradesPanel grades={grades} />}
          {arrTags.map((tag) => <Tag key={uuidv4()} color="volcano">{tag}</Tag>)}
          <input
            placeholder="Add a tag"
            className="input-Tag-StudentCard"
            onChange={tagTyping}
            value={tagText}
            onKeyPress={tagCreating}
          />
        </div>
        <div>
          <button
            onClick={() => setIsAllGrades(!isAllGrades)}
            className="plusButton-StudentCard"
          >
            {isAllGrades ? "-" : "+"}
          </button>
        </div>
      </Col>
    </Fragment>
  );
};

export default StudentCard;

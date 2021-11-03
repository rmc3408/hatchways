import React, { ChangeEvent, Fragment, KeyboardEvent, useState } from "react";
import { Avatar, Typography, Col, Tag } from "antd";
import GradesPanel from "./GradesPanel";
import { v4 as uuidv4 } from 'uuid';
import { addTag } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

const { Title } = Typography;


const StudentCard = (props: IStudent) => {
  const tags = useSelector((state: RootState) => state.tags);
  const dispatch = useDispatch<AppDispatch>();
  const [isAllGrades, setIsAllGrades] = useState<boolean>(false);
  const [arrTags, setarrTags] = useState<Array<string>>([]);
  const [tagText, setTagText] = useState<string>('');

  const { pic, firstName, lastName, id, email, company, skill, grades } = props;

  const average =
    grades.reduce((acc, c) => acc + parseFloat(c), 0) / grades.length || 0;
  
  const tagCreating = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newTagCard = {
        id,
        info: [...arrTags, tagText]
      };
      setarrTags([...arrTags, tagText]);
      dispatch(addTag(newTagCard));
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
          {console.log(tags)}
          {tags.map((tag) => <Tag key={uuidv4()} color="volcano">{tag}</Tag>)}
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

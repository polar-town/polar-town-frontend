import React, { useState } from "react";
import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const StyledMailRowDiv = styled.div`
  position: relative;

  .mailListItem:hover {
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.12), 0 6px 6px rgba(0, 0, 0, 0.18);
  }

  .mailRowText > p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .mailCheckBox {
    position: relative;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .deleteTooltip {
    position: relative;
    top: 50%;
    transform: translateY(50%);
  }

  .date {
    position: absolute;
    right: 20px;
    font-size: 12px;
  }
`;

function MailRow({
  id,
  sender,
  title,
  content,
  date,
  onCheckedId,
  checkedIdList,
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <StyledMailRowDiv>
      <List sx={{ width: "100%", maxWidth: 550, bgcolor: "background.paper" }}>
        <ListItem
          alignItems="flex-start"
          className="mailListItem"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <FormControlLabel
            label=""
            control={
              <Checkbox
                className="mailCheckBox"
                onClick={(e) => {
                  if (e.target.checked) {
                    onCheckedId((prev) => [...prev, id]);
                  }
                  if (!e.target.checked) {
                    onCheckedId((prev) => [
                      ...prev.filter((item) => item !== id),
                    ]);
                  }
                }}
                checked={checkedIdList.includes(id)}
              />
            }
          />
          <ListItemText
            className="mailRowText"
            primary={
              <>
                {sender}
                <Typography
                  className="date"
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body1"
                  color="text.primary"
                >
                  {date}
                </Typography>
              </>
            }
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body1"
                  color="text.primary"
                >
                  {title}
                </Typography>
                {` - ${content}`}
              </>
            }
          />
          {isHover && (
            <Tooltip className="deleteTooltip" title="Delete">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </ListItem>
        <Divider component="li" />
      </List>
    </StyledMailRowDiv>
  );
}

export default MailRow;

MailRow.propTypes = {
  id: PropTypes.number.isRequired,
  sender: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onCheckedId: PropTypes.func.isRequired,
  checkedIdList: PropTypes.arrayOf(PropTypes.number).isRequired,
};

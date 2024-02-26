import { User } from "../context/AuthContext";
import Badge from "@mui/material/Badge";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";

type Prop = {
  user: User;
  handleFunction: (user: User) => void;
};
const StyledBadge = styled(Badge)({
  padding: "8px 16px",
  borderRadius: "12px",
  margin: "8px",
  marginBottom: "16px",
  backgroundColor: "purple",
  fontSize: "12px",
  cursor: "pointer",
});

function UserBadge({ user, handleFunction }: Prop) {
  return (
    <StyledBadge>
      {user.name}
      <CloseIcon
        style={{ paddingLeft: "8px" }}
        onClick={() => handleFunction(user)}
      />
    </StyledBadge>
  );
}

export default UserBadge;

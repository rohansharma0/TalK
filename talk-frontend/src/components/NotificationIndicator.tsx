import { styled } from "@mui/material/styles";
import Badge, { badgeClasses } from "@mui/material/Badge";

export const NotificationBadge = styled(Badge)`
    & .${badgeClasses.badge} {
        top: -12px;
        right: -6px;
    }
`;

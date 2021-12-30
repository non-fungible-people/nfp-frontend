import numeral from 'numeral';
import {Card, CardContent, Typography} from '@mui/material';
import StringHelper from "../../../utils/StringHelper";

export const AccountWalletAddress = (props) => (
    <Card {...props}>
      <CardContent>
        <Typography
            variant="h4"
            color="secondary"
        >
          { StringHelper.getElipsedHashAddress(props.address || "-") }
        </Typography>
        <Typography
            color="textSecondary"
            variant="overline"
        >
          Wallet Address
        </Typography>
      </CardContent>
    </Card>
);

import { Box, Button, Grid, ListItem, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { ItemBoxStyled } from "./socialItem.styles";
import getIcon from "../../../utils/getIcon";
import { ISocialItemProps } from "./socailItem.types";
import SOCIAL_MEDIA_TYPES from "../../../constants";
import { ISocialMediaList } from "../../pages/mainPageComponent.types";

export const SocialItem: FC<ISocialItemProps> = ({
  item,
  deleteButtonClick,
  editItem,
}: ISocialItemProps) => {
  return (
    <ItemBoxStyled key={item.id}>
      <ListItem>
        <Grid
          container
          alignItems="center"
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Stack flexDirection={"row"} alignItems={"center"} columnGap={2}>
            <Grid
              item
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
            >
              {getIcon(item.type)}{" "}
              <Typography sx={{ marginLeft: "2px" }}>
                {SOCIAL_MEDIA_TYPES[item.type]}{" "}
              </Typography>
            </Grid>
            <Grid
              item
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
            >
              <Typography> آیدی:</Typography>
              <Typography sx={{ marginLeft: "4px" }}>
                {" "}
                {item.social_id}{" "}
              </Typography>
            </Grid>

            <Grid
              item
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
            >
              <Typography> لینک:</Typography>
              <Typography sx={{ marginLeft: "4px" }}> {item.link} </Typography>
            </Grid>
          </Stack>
          <Stack flexDirection={"row"}>
            <Grid item>
              <Button
                onClick={() => editItem(item as ISocialMediaList)}
                variant="text"
                startIcon={getIcon("edit")}
              >
                ویرایش
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="error"
                onClick={() => deleteButtonClick(item.id as string)}
                variant="text"
                startIcon={getIcon("delete")}
              >
                حذف
              </Button>
            </Grid>
          </Stack>
        </Grid>
      </ListItem>
    </ItemBoxStyled>
  );
};

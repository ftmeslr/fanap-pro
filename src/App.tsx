import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { FC } from "react";
import { useState } from "react";
import AlertBox from "./components/AlertBox";
import MainInput from "./components/mainInput/mainInput";
import SOCIAL_MEDIA_TYPES from "./constants";
import { StyledMenuBox } from "./test.styles";
import getIcon from "./utils/getIcon";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../src/components/mainInput/mainInput.styles";
import { useQuery } from "react-query";
import { getSocialsList } from "./utils/apis/main/mainApi";
import { toast } from "react-toastify";

interface SocialMediaListType {
  id: string;
  link: string;
  type: string;
}

const App: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SocialMediaListType>();

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openAlertBox, setOpenAlertBox] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [socialMediaList, setSocialMediaList] = useState<SocialMediaListType[]>(
    [{ id: "test@test", link: "https://google.com", type: "instagram" }]
  );
  const [currentItemId, setCurrentItemId] = useState<string>("");

  const {
    data: socialsList,
    isLoading: socialsListLoading,
    isError: socialsListError,
  } = useQuery({
    queryKey: ["getSocialsList"],
    queryFn: () => getSocialsList(),
    onError() {
      toast.error("مشکلی در دریافت لیست بوجود آمده است");
    },
  });
  const handleOpenForm = (): void => {
    setOpenForm(true);
  };

  const handleCloseForm = (): void => {
    setOpenForm(false);
  };

  const toggleOpenForm = (): void => {
    setOpenForm(!openForm);
  };

  const closeAlertBox = (): void => {
    setOpenAlertBox(false);
  };

  const addListItem = (values: SocialMediaListType): void => {
    const found = socialMediaList.some(
      (item) =>
        item.id === values.id ||
        item.link === values.link ||
        item.type === values.type
    );
    const isOneValueEmpty =
      values.id === "" || values.link === "" || values.type === "";

    if (!found && !isOneValueEmpty) {
      setSocialMediaList([
        ...socialMediaList,
        { id: values.id, link: values.link, type: values.type },
      ]);
    }
  };

  const editListItem = (values: SocialMediaListType): void => {
    const newSocialMediaList = [...socialMediaList];
    const foundIndex = socialMediaList.findIndex(
      (item) => item.id === currentItemId
    );

    newSocialMediaList[foundIndex] = {
      id: values.id,
      link: values.link,
      type: values.type,
    };

    setSocialMediaList(newSocialMediaList);
    setIsEditing(false);
  };

  const deleteButtonClick = (id: string): void => {
    setCurrentItemId(id);
    setOpenAlertBox(true);
  };

  const deleteItem = (): void => {
    const updatedList = socialMediaList.filter(
      (item) => item.id !== currentItemId
    );
    setSocialMediaList(updatedList);
    closeAlertBox();
  };

  const editItem = (item: SocialMediaListType): void => {
    handleOpenForm();
    setIsEditing(true);
    setValue("id", item.id);
    setValue("link", item.link);
    setValue("type", item.type);
    setCurrentItemId(item.id);
  };

  const handleCancelForm = (): void => {
    handleCloseForm();
  };
  const { StyledMainInput } = styles;

  const onSubmit: SubmitHandler<SocialMediaListType> = (values) => {
    console.log("values", values);
    setTimeout(() => {
      if (isEditing) {
        editListItem(values);
      } else {
        addListItem(values);
      }
      // onreset();
      setIsEditing(false);
    }, 400);
  };
  return (
    <Stack
      sx={{
        display: "felx",
        alignItems: "center",
        justifyContent: "center",
        // paddingX: "100px",
        background: "#151b25",
        height: "100vh",
        padding: "20%",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#202a35",
          padding: "20px",
          borderRadius: "12px",
          width: "100%",
        }}
      >
        <AlertBox
          title="آیا از تصمیم خود مطمئن هستید؟"
          open={openAlertBox}
          itemId={currentItemId}
          handleClose={closeAlertBox}
          handleAction={deleteItem}
        />
        <Typography variant="caption" color="GrayText">
          مسیر های ارتباطی
        </Typography>
        <br />
        <Button
          onClick={toggleOpenForm}
          variant="text"
          startIcon={getIcon("add")}
        >
          {isEditing ? (
            <Typography variant="button">ویرایش مسیر ارتباطی</Typography>
          ) : (
            <Typography variant="button">افزودن مسیر ارتباطی</Typography>
          )}
        </Button>
        <Collapse in={openForm} sx={{ marginTop: "20px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card sx={{ backgroundColor: "#323d48", color: "white" }}>
              <CardHeader
                title={
                  isEditing ? (
                    <Stack flexDirection={"row"}>
                      <Typography>ویرایش مسیر ارتباطی</Typography>
                      <Typography variant="subtitle1" color="white">
                        {SOCIAL_MEDIA_TYPES[getValues("type")]}
                      </Typography>
                    </Stack>
                  ) : (
                    <Typography variant="subtitle1" color="white">
                      افزودن مسیر ارتباطی
                    </Typography>
                  )
                }
              />
              <CardContent>
                <Grid container justifyContent="space-evenly" spacing={2}>
                  <Grid item xs={4}>
                    <StyledMenuBox>
                      <FormControl fullWidth sx={{ minWidth: 120 }}>
                        <InputLabel id="type-value-select-label">
                          نوع*
                        </InputLabel>
                        <Select
                          {...register("type", { required: true })}
                          label="نوع*"
                          renderValue={(value: string | number) => (
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {SOCIAL_MEDIA_TYPES[value]}
                            </div>
                          )}
                        >
                          <MenuItem value="" disabled>
                            نوع را انتخاب کنید
                          </MenuItem>
                          {Object.keys(SOCIAL_MEDIA_TYPES).map((key) => (
                            <MenuItem key={key} value={key}>
                              <Typography>{SOCIAL_MEDIA_TYPES[key]}</Typography>
                            </MenuItem>
                          ))}
                        </Select>

                        {errors.type?.type === "required" && (
                          <Typography
                            variant="caption"
                            color="error"
                            role="alert"
                          >
                            لطفا نوع شبکه اجتماعی را انتخاب کنید
                          </Typography>
                        )}
                      </FormControl>
                    </StyledMenuBox>
                  </Grid>
                  <Grid item xs={4}>
                    <StyledMainInput>
                      <TextField
                        fullWidth
                        label={"لینک"}
                        {...register("link")}
                      />
                    </StyledMainInput>{" "}
                  </Grid>
                  <Grid item xs={4}>
                    <StyledMainInput>
                      <TextField fullWidth label={"آیدی"} {...register("id")} />
                    </StyledMainInput>{" "}
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button variant="outlined" onClick={handleCancelForm}>
                  انصراف
                </Button>
                <Button type="submit" variant="contained">
                  {isEditing ? (
                    <Typography>
                      {`ویرایش مسیر ارتباطی
                      `}
                    </Typography>
                  ) : (
                    <Typography>افزودن مسیر ارتباطی</Typography>
                  )}
                </Button>
              </CardActions>
            </Card>
          </form>
        </Collapse>
        <List>
          {socialMediaList.length
            ? socialMediaList.map((item) => (
                <Box
                  sx={{
                    backgroundColor: "#323d48",
                    padding: "10px",
                    marginTop: "20px",
                    borderRadius: "8px",
                    color: "white",
                  }}
                  key={item.id}
                >
                  <ListItem>
                    <Grid
                      container
                      alignItems="center"
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      <Stack
                        flexDirection={"row"}
                        alignItems={"center"}
                        columnGap={2}
                      >
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
                          <Typography> لینک:</Typography>
                          <Typography sx={{ marginLeft: "4px" }}>
                            {" "}
                            {item.id}{" "}
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          display={"flex"}
                          flexDirection={"row"}
                          alignItems={"center"}
                        >
                          <Typography> لینک:</Typography>
                          <Typography sx={{ marginLeft: "4px" }}>
                            {" "}
                            {item.link}{" "}
                          </Typography>
                        </Grid>
                      </Stack>
                      <Stack flexDirection={"row"}>
                        <Grid item>
                          <Button
                            onClick={() => editItem(item)}
                            variant="text"
                            startIcon={getIcon("edit")}
                          >
                            ویرایش
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            color="error"
                            onClick={() => deleteButtonClick(item.id)}
                            variant="text"
                            startIcon={getIcon("delete")}
                          >
                            حذف
                          </Button>
                        </Grid>
                      </Stack>
                    </Grid>
                  </ListItem>
                </Box>
              ))
            : ""}
        </List>
      </Box>
    </Stack>
  );
};

export default App;

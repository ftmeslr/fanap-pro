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

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import {
  addToList,
  deleteItemCallApi,
  getSocialsList,
  editListItemCallApi,
} from "../../utils/apis/main/mainApi";
import AlertBox from "../alertBox/alertBox";
import getIcon from "../../utils/getIcon";
import SOCIAL_MEDIA_TYPES from "../../constants";
import { StyledMenuBox } from "../../test.styles";
import { StyledMainInput } from "../mainInput/mainInput.styles";

interface SocialMediaListType {
  social_id: string;
  link: string;
  type: string;
  id: string;
}

const MainPageComponent: FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    control,
  } = useForm<SocialMediaListType>();

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openAlertBox, setOpenAlertBox] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [socialMediaList, setSocialMediaList] = useState<SocialMediaListType[]>(
    [
      {
        social_id: "test@test",
        link: "https://google.com",
        type: "instagram",
        id: "test",
      },
    ]
  );
  const [currentItemId, setCurrentItemId] = useState<string>("");

  const { data: socialsList, refetch: refetchSocialMediaList } = useQuery({
    queryKey: ["getSocialsList"],
    queryFn: () => getSocialsList(),
    onError() {
      toast.error("مشکلی در دریافت لیست بوجود آمده است");
    },
  });

  console.log(socialsList);

  const { mutate: addListMutation, isLoading: sendOtpCodeIsLoading } =
    useMutation(addToList, {
      onSuccess() {
        refetchSocialMediaList();
        toast.success("آیتم مورد نظر با موفقیت اضافه شد");
      },
      onError(res: AxiosError<{ result: { otp: string } }>) {
        toast.error(res?.response?.data.result.otp);
      },
    });

  const { mutate: editListItemMutation, isLoading: editListItemLoading } =
    useMutation(editListItemCallApi, {
      onSuccess() {
        refetchSocialMediaList();
        toast.success("آیتم مورد نظر با موفقیت ویرایش شد");
      },
      onError(res: AxiosError<{ result: { otp: string } }>) {
        toast.error(res?.response?.data.result.otp);
      },
    });
  const { mutate: deleteMutation, isLoading: deleteMutationIsLoading } =
    useMutation(deleteItemCallApi, {
      onSuccess() {
        refetchSocialMediaList();

        toast.success("آیتم مورد نظر با موفقیت حذف شد");
      },
      onError(res: AxiosError<{ result: { otp: string } }>) {
        toast.error(res?.response?.data.result.otp);
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
        item.social_id === values.social_id ||
        item.link === values.link ||
        item.type === values.type
    );
    const isOneValueEmpty =
      values.social_id === "" || values.link === "" || values.type === "";

    if (!found && !isOneValueEmpty) {
      setSocialMediaList([
        ...socialMediaList,
        {
          social_id: values.social_id,
          link: values.link,
          type: values.type,
          id: values.id,
        },
      ]);
    }
  };

  const editListItem = (values: SocialMediaListType): void => {
    editListItemMutation({
      id: currentItemId,
      data: {
        social_id: values.social_id,
        link: values.link,
        type: values.type,
      },
    });
    setIsEditing(false);
  };

  const deleteButtonClick = (id: string): void => {
    setCurrentItemId(id);
    setOpenAlertBox(true);
  };

  const deleteItem = (): void => {
    deleteMutation(currentItemId);
    closeAlertBox();
  };

  const editItem = (item: SocialMediaListType): void => {
    handleOpenForm();
    setIsEditing(true);
    setValue("social_id", item.social_id);
    setValue("link", item.link);
    console.log(item.type);
    setValue("type", item.type);
    setCurrentItemId(item.id);
  };

  const handleCancelForm = (): void => {
    handleCloseForm();
  };

  const onSubmit: SubmitHandler<SocialMediaListType> = (values) => {
    setTimeout(() => {
      if (isEditing) {
        editListItem(values);
      } else {
        addListItem(values);

        addListMutation(values);
      }
      // onreset();
      setIsEditing(false);
    }, 400);
  };
  return (
    <Stack
      sx={{
        background: "#151b25",
        height: "100vh",
        padding: "5% 10%",
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
                    <Stack flexDirection={"row"} columnGap={0.7}>
                      <Typography>ویرایش مسیر ارتباطی </Typography>
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
                        <Controller
                          name="type"
                          control={control}
                          defaultValue={""}
                          render={({ field }) => (
                            <Select {...field} label="نوع*">
                              <MenuItem value="" disabled>
                                نوع را انتخاب کنید
                              </MenuItem>
                              {Object.keys(SOCIAL_MEDIA_TYPES).map((key) => (
                                <MenuItem key={key} value={key}>
                                  <Typography>
                                    {SOCIAL_MEDIA_TYPES[key]}
                                  </Typography>
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />

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
                      <TextField
                        fullWidth
                        label={"آیدی"}
                        {...register("social_id")}
                      />
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
          {socialsList && socialsList.length
            ? socialsList.map((item) => (
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
                          <Typography> آیدی:</Typography>
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

export default MainPageComponent;

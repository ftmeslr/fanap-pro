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
import SOCIAL_MEDIA_TYPES from "../../constants";
import {
  addToList,
  deleteItemCallApi,
  editListItemCallApi,
  getSocialsList,
} from "../../utils/apis/main/mainApi";
import getIcon from "../../utils/getIcon";
import AlertBox from "../ui/alertBox/alertBox";
import {
  MainInputStyled,
  ManinPageBoxStyled,
  MenuBoxStyled,
} from "./mainPageComponent.styles";
import { SocialItem } from "../ui/socialItem/socialItem";
import { ISocialMediaList } from "./mainPageComponent.types";

const MainPageComponent: FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    control,
  } = useForm<ISocialMediaList>();

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openAlertBox, setOpenAlertBox] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [socialMediaList, setSocialMediaList] = useState<ISocialMediaList[]>([
    {
      social_id: "test@test",
      link: "https://google.com",
      type: "instagram",
      id: "test",
    },
  ]);
  const [currentItemId, setCurrentItemId] = useState<string>("");

  const { data: socialsList, refetch: refetchSocialMediaList } = useQuery({
    queryKey: ["getSocialsList"],
    queryFn: () => getSocialsList(),
    onError() {
      toast.error("مشکلی در دریافت لیست بوجود آمده است");
    },
  });

  const { mutate: addListMutation, isLoading: sendOtpCodeIsLoading } =
    useMutation(addToList, {
      onSuccess() {
        refetchSocialMediaList();
        toast.success("آیتم مورد نظر با موفقیت اضافه شد");
      },
      onError() {
        toast.error("مشکلی به وجود آمده است");
      },
    });

  const { mutate: editListItemMutation, isLoading: editListItemLoading } =
    useMutation(editListItemCallApi, {
      onSuccess() {
        refetchSocialMediaList();
        toast.success("آیتم مورد نظر با موفقیت ویرایش شد");
      },
      onError() {
        toast.error("مشکلی به وجود آمده است");
      },
    });
  const { mutate: deleteMutation, isLoading: deleteMutationIsLoading } =
    useMutation(deleteItemCallApi, {
      onSuccess() {
        refetchSocialMediaList();

        toast.success("آیتم مورد نظر با موفقیت حذف شد");
      },
      onError() {
        toast.error("مشکلی به وجود آمده است");
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

  const addListItem = (values: ISocialMediaList): void => {
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

  const editListItem = (values: ISocialMediaList): void => {
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

  const editItem = (item: ISocialMediaList): void => {
    handleOpenForm();
    setIsEditing(true);
    setValue("social_id", item.social_id);
    setValue("link", item.link);
    setValue("type", item.type);
    setCurrentItemId(item.id);
  };

  const handleCancelForm = (): void => {
    handleCloseForm();
  };

  const onSubmit: SubmitHandler<ISocialMediaList> = (values) => {
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
    <ManinPageBoxStyled>
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
                    <MenuBoxStyled>
                      <FormControl fullWidth sx={{ minWidth: 120 }}>
                        <InputLabel id="type-value-select-label">
                          نوع*
                        </InputLabel>
                        <Controller
                          name="type"
                          control={control}
                          defaultValue={""}
                          rules={{
                            required: "لطفا نوع شبکه اجتماعی خود را مشخص کنید",
                          }}
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
                    </MenuBoxStyled>
                  </Grid>
                  <Grid item xs={4}>
                    <MainInputStyled>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        label={"لینک"}
                        {...register("link")}
                      />
                    </MainInputStyled>{" "}
                  </Grid>
                  <Grid item xs={4}>
                    <MainInputStyled>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        label={"آیدی"}
                        {...register("social_id")}
                      />
                    </MainInputStyled>{" "}
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
          {socialsList && socialsList.length ? (
            socialsList.map((item, index) => (
              <SocialItem
                key={index}
                item={item}
                deleteButtonClick={deleteButtonClick}
                editItem={editItem}
              />
            ))
          ) : (
            <></>
          )}
        </List>
      </Box>
    </ManinPageBoxStyled>
  );
};

export default MainPageComponent;

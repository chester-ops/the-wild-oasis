import { useForm } from "react-hook-form";
import { useUpdateCabin } from "./useUpdateCabin";
import { useCreateCabin } from "./useCreateCabin";

import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Textarea from "../../ui/Textarea";
import SpinnerMini from "../../ui/SpinnerMini";

function CreateCabinForm({ cabinToEdit = {}, onCloseWindow }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditForm = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditForm ? editValues : {},
  });
  const { errors } = formState;
  const { updateCabin, isUpdating } = useUpdateCabin();
  const { createCabin, isCreating } = useCreateCabin();

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditForm) {
      updateCabin(
        { newCabin: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseWindow?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseWindow?.();
          },
        }
      );
    }
  }

  function onError() {
    return;
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseWindow ? "modal" : "regular"}
    >
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>
      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              "Discount should be less than the regular price",
          })}
        />
      </FormRow>
      <FormRow
        label="Description for Website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Cabin Photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditForm ? false : "This field is required",
          })}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          color="secondary"
          type="reset"
          disabled={isCreating || isUpdating}
          onClick={() => onCloseWindow?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating || isUpdating}>
          {isCreating || isUpdating ? (
            <SpinnerMini />
          ) : (
            `${isEditForm ? "Update Cabin" : "Add Cabin"}`
          )}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

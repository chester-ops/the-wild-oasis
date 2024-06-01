import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { error: deleteError } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id);
  if (deleteError) {
    console.error(deleteError);
    throw new Error("cabin could not be deleted");
  }
}

export async function upsertCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl) ?? false;

  const imageName = hasImagePath
    ? ""
    : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }

  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);
    if (storageError) {
      await deleteCabin(data.id);
      console.error(storageError);
      throw new Error("Image could not be uploaded to server");
    }
  }

  return data;
}

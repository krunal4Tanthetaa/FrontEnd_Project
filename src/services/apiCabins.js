import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loader");
    }
    return data;
}

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    //console.log(hasImagePath)

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );

    //https://wolupkvdthazyreosnrf.supabase.co/storage/v1/object/public/cabin-images/cabin-008.jpg
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. Create cabin
    let query = supabase.from("cabins");

    //   (A)  CREATE
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    //   (B) Edit
    if (id)
        query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

    const { data, error } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be created");
    }

    //  2. Upload image
     if(hasImagePath) return data;


    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    // 3. Delete the cabin If there was an error
    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.error(storageError);
        throw new Error(
            "Cabin images could not be uploaded and the cable was not created"
        );
    }

    return data;
}

export async function deleteCabin(id) {
    console.log(id);
    const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id);


    if (error) {
        console.error(error);
        throw new Error("Cabins could not be deleted");
    }
    return data;
}

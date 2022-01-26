import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { handleSingleUserState } from "../../../atoms/userAtom";

const EditIntroForm = ({ user, handleClose }) => {
  const { intro } = user.metadata || {};
  const { data: session } = useSession();
  const [handleSingleUser, setHandleSingleUser] = useRecoilState(
    handleSingleUserState
  );
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: intro?.firstName,
      lastName: intro?.lastName,
      headline: intro?.headline,
      country: intro?.country,
      city: intro?.city,
    },
  });

  const onSubmit = async (data) => {
    let body;
    body = JSON.stringify({ intro: data });
    const response = await fetch(`/api/users/${session?.user?.uid}`, {
      method: "PUT",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      handleClose();
      setHandleSingleUser(true);
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label className="editProfileLabel">First name</label>
          <input {...register("firstName")} className="editProfileInput" />
        </div>
        <div className="flex flex-col mt-7">
          <label className="editProfileLabel">Last name</label>
          <input {...register("lastName")} className="editProfileInput" />
        </div>
        <div className="flex flex-col mt-7">
          <label className="editProfileLabel">Headline</label>
          <input {...register("headline")} className="editProfileInput" />
        </div>
        <h3 className="mt-10 font-normal text-[22px] text-gray-800">
          Location
        </h3>
        <div className="flex flex-col mt-2">
          <label className="editProfileLabel">Country/Region</label>
          <input {...register("country")} className="editProfileInput" />
        </div>
        <div className="flex flex-col mt-7">
          <label className="editProfileLabel">City/District</label>
          <input {...register("city")} className="editProfileInput" />
        </div>
        <div className="flex items-center justify-end border-t mt-10 border-gray-300">
          <button type="submit" className="editModalSavebtn">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default EditIntroForm;
